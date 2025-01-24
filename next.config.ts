import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    authInterrupts: true,
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config
  },
}

export default nextConfig
