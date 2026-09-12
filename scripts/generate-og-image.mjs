/**
 * Build public/og-image.jpg — the link-preview image for iMessage, SMS, Slack, etc.
 * Uses Ru's vector logo on the brand ink background (1200×630, Open Graph standard).
 * Run: node scripts/generate-og-image.mjs
 */
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;
const BG = { r: 11, g: 10, b: 8 }; // --color-ink

const logo = readFileSync(join(root, "public/brand/rucutz-logo.svg"));
const logoPng = await sharp(logo).resize(920, 380, { fit: "inside" }).png().toBuffer();
const meta = await sharp(logoPng).metadata();

await sharp({
  create: { width: W, height: H, channels: 3, background: BG },
})
  .composite([
    {
      input: logoPng,
      left: Math.round((W - meta.width) / 2),
      top: Math.round((H - meta.height) / 2),
    },
  ])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(join(root, "public/og-image.jpg"));

console.log("Wrote public/og-image.jpg (1200×630)");
