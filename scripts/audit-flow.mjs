/**
 * Reads the built HTML in out/ and asserts the things that actually break client trust:
 * every internal link resolves, every page has unique SEO tags, the real NAP appears,
 * prices in the markup match the data file, schema parses, no placeholder text ships.
 * Run: npm run audit:flow
 */
import fs from "node:fs";
import path from "node:path";
import { BUSINESS, HOURS } from "../src/data/business.ts";
import { SERVICES, PAGE_SERVICES } from "../src/data/services.ts";
import { ARTICLES } from "../src/data/journal.ts";
import { FAQS } from "../src/data/faqs.ts";
import { REVIEWS } from "../src/data/reviews.ts";

const OUT = path.join(process.cwd(), "out");
let pass = 0;
const fails = [];
const check = (name, cond, detail = "") => {
  if (cond) pass++;
  else fails.push(`${name}${detail ? ` — ${detail}` : ""}`);
};

const htmlFiles = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) htmlFiles.push(p);
  }
})(OUT);

const routeOf = (f) => "/" + path.relative(OUT, f).replace(/index\.html$/, "").replace(/\\/g, "/");
const pages = htmlFiles.map((f) => ({ file: f, route: routeOf(f), html: fs.readFileSync(f, "utf8") }));
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");

check("Every expected route was exported", pages.length >= 18, `${pages.length} html files`);

// ---- links ----
const known = new Set(pages.map((p) => p.route.replace(/\/$/, "") || "/"));
known.add("/sitemap.xml");
known.add("/robots.txt");
known.add("/llms.txt");
for (const p of pages) {
  const hrefs = [...p.html.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1].split("?")[0]).filter((h) => !h.startsWith("//"));
  for (const h of new Set(hrefs)) {
    if (/\.(webp|jpg|jpeg|png|svg|ico|txt|xml|js|css|json|woff2?)$/.test(h)) {
      check(`asset exists ${h}`, fs.existsSync(path.join(OUT, h)), `${p.route}`);
      continue;
    }
    check(`internal link resolves ${h}`, known.has(h.replace(/\/$/, "") || "/"), `linked from ${p.route}`);
  }
}

// ---- per-page SEO ----
const titles = new Map();
const descs = new Map();
const NOT_FOUND = new Set(["/404.html", "/404/", "/_not-found/"]);
for (const p of pages) {
  const isNotFound = NOT_FOUND.has(p.route);
  const noindex = /name="robots" content="[^"]*noindex/.test(p.html);
  const title = (p.html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "").replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&");
  const decode = (x) => x.replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  const desc = decode(p.html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const canonical = p.html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
  const h1s = [...p.html.matchAll(/<h1[\s>]/g)].length;
  check(`${p.route} has a title`, title.length > 10 && title.length <= 70, `${title.length} chars: ${title}`);
  check(`${p.route} has a meta description`, (desc.length > 70 && desc.length <= 170) || isNotFound, `${desc.length} chars`);
  check(`${p.route} has a canonical`, !!canonical || isNotFound, canonical);
  check(`${p.route} has exactly one h1`, h1s === 1, `${h1s} found`);
  check(`${p.route} has og:image`, /property="og:image"/.test(p.html) || isNotFound || noindex);
  if (isNotFound) pass++;
  else if (titles.has(title)) fails.push(`duplicate <title> on ${p.route} and ${titles.get(title)}`);
  else { titles.set(title, p.route); pass++; }
  if (isNotFound) pass++;
  else if (desc && descs.has(desc)) fails.push(`duplicate description on ${p.route} and ${descs.get(desc)}`);
  else { descs.set(desc, p.route); pass++; }

  // JSON-LD must parse
  for (const m of p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1].replace(/\\u003c/g, "<"));
      pass++;
    } catch (e) {
      fails.push(`invalid JSON-LD on ${p.route}: ${e.message}`);
    }
  }

  // images
  for (const m of p.html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    check(`${p.route} img has alt`, /\salt="/.test(tag), tag.slice(0, 90));
    check(`${p.route} img has width+height`, /\swidth="/.test(tag) && /\sheight="/.test(tag), tag.slice(0, 90));
  }

  // placeholders and junk
  const t = text(p.html);
  for (const bad of ["lorem ipsum", "TODO:", "FIXME", "undefined", "NaN", "[object Object]"]) {
    check(`${p.route} free of "${bad}"`, !t.includes(bad));
  }
  check(`${p.route} has no emoji`, !/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u.test(t), t.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u)?.[0]);
  check(`${p.route} has a booking CTA`, /data-cta="book"/.test(p.html) || p.route.startsWith("/portal"));
}

// ---- facts ----
const home = pages.find((p) => p.route === "/").html;
const homeText = text(home);
check("home shows the real phone", homeText.includes(BUSINESS.phone));
check("home shows the real street", homeText.includes(BUSINESS.address.street));
check("home shows the correct ZIP", homeText.includes(BUSINESS.address.postalCode));
check("home does not show the wrong Square ZIP", !homeText.includes("33025"));
check("home links the real booking page", home.includes("book.squareup.com/appointments/evvnhmmwsq6wf1"));
check("home shows the real email", homeText.includes(BUSINESS.email));

const servicesText = text(pages.find((p) => p.route === "/services/").html);
for (const s of SERVICES) {
  check(`services page lists "${s.name}"`, servicesText.includes(s.name.replace(/&/g, "&")), "");
  check(`services page prices ${s.short} at $${s.price}`, servicesText.includes(`$${s.price}`));
}
check("services page lists every service", SERVICES.length === 14, `${SERVICES.length}`);
check("each service with a page was exported", PAGE_SERVICES.every((s) => known.has(`/services/${s.slug}`)));
check("each article was exported", ARTICLES.every((a) => known.has(`/journal/${a.slug}`)));

// prices: nothing in the HTML should quote a price we never set
const priceSet = new Set(SERVICES.map((s) => `$${s.price}`));
priceSet.add("$45"); // no-show fee
priceSet.add("$135"); // demo dashboard figure
priceSet.add("$10"); // scent offer value
for (const p of pages) {
  if (p.route.startsWith("/book") || p.route.startsWith("/portal")) continue;
  for (const m of text(p.html).matchAll(/\$\d+/g)) {
    check(`${p.route} price ${m[0]} exists in the menu`, priceSet.has(m[0]), m[0]);
  }
}

// hours consistency
const visitText = text(pages.find((p) => p.route === "/visit/").html);
for (const h of HOURS) {
  if (!h.open) continue;
  const label = `${Number(h.open.slice(0, 2)) % 12 || 12} ${Number(h.open.slice(0, 2)) >= 12 ? "PM" : "AM"}`;
  check(`visit page shows ${h.day} opening (${label})`, visitText.includes(label));
}

// FAQ + reviews rendered verbatim
const faqText = text(pages.find((p) => p.route === "/faq/").html);
for (const f of FAQS) check(`FAQ page renders "${f.q.slice(0, 40)}…"`, faqText.includes(f.q.replace(/'/g, "'")));
for (const r of REVIEWS.slice(0, 3)) check(`home renders review by ${r.name}`, homeText.includes(r.text.slice(0, 40).replace(/’/g, "’")));

// llms.txt + sitemap
const llms = fs.readFileSync(path.join(OUT, "llms.txt"), "utf8");
check("llms.txt lists every service", SERVICES.every((s) => llms.includes(s.name)));
check("llms.txt carries the NAP", llms.includes(BUSINESS.phone) && llms.includes(BUSINESS.address.street));
const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
check("sitemap has every public route", ["/", "/services/", "/gallery/", "/about/", "/visit/", "/faq/", "/journal/"].every((r) => sitemap.includes(`${BUSINESS.name ? "" : ""}${r}`)));
check("sitemap excludes the demo portal", !sitemap.includes("/portal"));
check("robots.txt disallows the demo portal", fs.readFileSync(path.join(OUT, "robots.txt"), "utf8").includes("/portal/"));

console.log(`Flow audit — ${pass} checks passed, ${fails.length} failed.`);
for (const f of fails) console.log("  FAIL " + f);
process.exit(fails.length ? 1 : 0);
