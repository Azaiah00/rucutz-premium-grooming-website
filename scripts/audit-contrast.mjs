/**
 * Reads the real hex values out of globals.css and checks every colour pairing the
 * site actually uses. Fails the build if a pairing drops below WCAG AA.
 * Run: npm run audit:contrast
 */
import fs from "node:fs";

const css = fs.readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");
const tokens = Object.fromEntries([...css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
const lum = (hex) => {
  const [r, g, b] = rgb(hex).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// [foreground, background, minimum, where]
const PAIRS = [
  ["bone", "ink", 4.5, "body text"],
  ["bone", "ink-2", 4.5, "body text on alt sections"],
  ["bone", "ink-3", 4.5, "body text on cards"],
  ["bone-dim", "ink", 4.5, "muted paragraphs"],
  ["bone-dim", "ink-2", 4.5, "muted paragraphs on alt"],
  ["bone-dim", "ink-3", 4.5, "muted paragraphs on cards"],
  ["bone-mute", "ink", 4.5, "small meta text"],
  ["bone-mute", "ink-2", 4.5, "small meta text on alt"],
  ["bone-mute", "ink-3", 4.5, "small meta text on cards"],
  ["gold", "ink", 4.5, "gold links, eyebrows, prices"],
  ["gold", "ink-2", 4.5, "gold on alt sections"],
  ["gold", "ink-3", 4.5, "gold on cards"],
  ["gold-lift", "ink", 4.5, "hover + graffiti tag"],
  ["gold-lift", "ink-3", 4.5, "graffiti tag on cards"],
  ["ink", "gold", 4.5, "button label on gold"],
  ["ink", "gold-lift", 4.5, "button label on the light end of the foil"],
  ["ink", "gold-deep", 4.5, "button label on the dark end of the foil"],
  ["bronze-ink", "paper", 4.5, "gold-family text if a light section is ever used"],
  ["line", "ink", 1.4, "hairline borders (non-text, informational)"],
];

// Gradient text/buttons: every stop has to clear AA too, not just the token colours.
const stops = (block, label) => {
  const m = css.match(block);
  return m ? [...m[0].matchAll(/#[0-9a-f]{6}/gi)].map((x) => [x[0], label]) : [];
};
const foilText = stops(/@utility foil-text \{[^}]*\}/i, "foil-text stop on ink (big display type)");
const foilBtn = stops(/--gold-foil:[^;]+;/i, "ink label on gold-foil button stop");

let fail = 0;
console.log("Contrast audit — RuCutz\n");
for (const [hex, label] of foilText) {
  const r = ratio(hex, tokens.ink);
  const ok = r >= 3; // display type is always ≥ 24px, so AA large-text applies
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${r.toFixed(2)}:1  (min 3, large text)  ${hex} — ${label}`);
}
for (const [hex, label] of foilBtn) {
  const r = ratio(tokens.ink, hex);
  const ok = r >= 4.5;
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${r.toFixed(2)}:1  (min 4.5)  ${hex} — ${label}`);
}
for (const [fg, bg, min, where] of PAIRS) {
  const f = tokens[fg];
  const b = tokens[bg];
  if (!f || !b) {
    console.log(`? missing token: ${fg} / ${bg}`);
    fail++;
    continue;
  }
  const r = ratio(f, b);
  const ok = r >= min;
  if (!ok) fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${r.toFixed(2)}:1  (min ${min})  ${fg} on ${bg} — ${where}`);
}
console.log(fail ? `\n${fail} pairing(s) failed.` : "\nAll pairings pass.");
process.exit(fail ? 1 : 0);
