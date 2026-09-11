/**
 * Renders every route in a real browser at four widths and runs axe-core,
 * plus checks tap-target size and horizontal overflow. Run: npm run audit:a11y
 * (Start the static server first: npm run serve)
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:4321";
const CHROME = process.env.PW_CHROMIUM ?? "/opt/pw-browsers/chromium";
const axeSource = fs.readFileSync(path.join(process.cwd(), "node_modules/axe-core/axe.min.js"), "utf8");

const ROUTES = [
  "/",
  "/services/",
  "/services/king-haircut-experience/",
  "/services/big-chop-transformation/",
  "/gallery/",
  "/about/",
  "/visit/",
  "/faq/",
  "/journal/",
  "/journal/how-to-get-360-waves/",
  "/policies/",
  "/book/",
  "/portal/",
  "/404.html",
];
const WIDTHS = [375, 768, 1024, 1440];

const browser = await chromium.launch({ executablePath: CHROME });
let problems = 0;
let checks = 0;

for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(350);
    await page.addScriptTag({ content: axeSource });
    const res = await page.evaluate(async () =>
      // @ts-expect-error injected
      await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] }),
    );
    checks++;
    for (const v of res.violations) {
      if (v.impact === "minor" && v.id === "region") continue;
      problems++;
      console.log(`[a11y ${width}px ${route}] ${v.id} (${v.impact}) — ${v.help}`);
      for (const n of v.nodes.slice(0, 2)) console.log(`    ${n.target.join(" ")}`);
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 1) {
      problems++;
      const culprits = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        return [...document.querySelectorAll("*")]
          .filter((el) => el.getBoundingClientRect().right > w + 2 && getComputedStyle(el).position !== "fixed")
          .slice(0, 4)
          .map((el) => el.tagName + "." + String(el.className).split(" ").slice(0, 3).join("."));
      });
      console.log(`[overflow ${width}px ${route}] ${overflow}px wider than the viewport — ${culprits.join(", ")}`);
    }

    if (width === 375) {
      const small = await page.evaluate(() => {
        const out = [];
        for (const el of document.querySelectorAll("a[href], button, input, summary, [role=slider]")) {
          if (el.classList.contains("sr-only")) continue;
          // A checkbox/radio wrapped in a big clickable <label> has the label's hit area.
          const hit = el.closest("label") ?? el;
          const r = hit.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (getComputedStyle(el).visibility === "hidden") continue;
          // WCAG 2.2 AA "Target Size (Minimum)" is 24x24 CSS px; we hold ourselves to 32 high / 24 wide.
          if (r.height < 32 || r.width < 24) out.push(`${el.tagName}«${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 28)}» ${Math.round(r.width)}×${Math.round(r.height)}`);
        }
        return out.slice(0, 8);
      });
      if (small.length) {
        problems++;
        console.log(`[tap-target 375px ${route}] ${small.join(" | ")}`);
      }
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log(`\n${checks} page renders checked. ${problems ? `${problems} issue group(s) found.` : "No issues."}`);
process.exit(problems ? 1 : 0);
