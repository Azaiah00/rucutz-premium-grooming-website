/**
 * Screenshots every route at phone / tablet / laptop / desktop into .frames/ for design review.
 * Run: npm run serve (in another shell), then npm run frames
 */
import { chromium } from "playwright";
import fs from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:4321";
const CHROME = process.env.PW_CHROMIUM ?? "/opt/pw-browsers/chromium";
const ROUTES = process.env.ROUTES?.split(",") ?? ["/", "/services/", "/services/king-haircut-experience/", "/gallery/", "/about/", "/visit/", "/faq/", "/journal/", "/journal/how-to-get-360-waves/", "/policies/", "/book/", "/portal/"];
const SIZES = [
  ["phone", 375, 812],
  ["tablet", 768, 1024],
  ["laptop", 1024, 768],
  ["desktop", 1440, 900],
];

fs.mkdirSync(".frames", { recursive: true });
const browser = await chromium.launch({ executablePath: CHROME });
for (const [name, width, height] of SIZES) {
  const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce", deviceScaleFactor: 1 });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      document.querySelectorAll(".reveal, .spray").forEach((el) => el.classList.add("is-in"));
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(700);
    const file = `.frames/${route.replace(/\//g, "_") || "_home"}${name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    await page.close();
  }
  await ctx.close();
}
await browser.close();
console.log("Frames written to .frames/");
