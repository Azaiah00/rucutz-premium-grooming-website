import type { NextConfig } from "next";

// Static export: the whole site is prerendered HTML, so it deploys to any static
// host (Netlify, Vercel, Cloudflare Pages) with no server to maintain.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
