
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Aarav-Portfolio",

  images: {
    unoptimized: true,
  },

  productionBrowserSourceMaps: true,

  allowedDevOrigins: ["*.trycloudflare.com"],
  devIndicators: false,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;