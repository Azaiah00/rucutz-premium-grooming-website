import localFont from "next/font/local";

// Self-hosted (latin subset only). Rock Salt is the hand-lettered face Ru already
// uses across his Square site ("Service Menu"), so it carries his existing brand voice.
export const shoulders = localFont({
  src: [
    { path: "../fonts/big-shoulders-display-latin-800-normal.woff2", weight: "800" },
    { path: "../fonts/big-shoulders-display-latin-900-normal.woff2", weight: "900" },
  ],
  variable: "--font-shoulders",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const barlow = localFont({
  src: [
    { path: "../fonts/barlow-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/barlow-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/barlow-latin-600-normal.woff2", weight: "600" },
    { path: "../fonts/barlow-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-barlow",
  display: "swap",
});

export const rockSalt = localFont({
  src: [{ path: "../fonts/rock-salt-latin-400-normal.woff2", weight: "400" }],
  variable: "--font-rocksalt",
  display: "swap",
  preload: false,
});
