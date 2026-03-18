import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@template/ui', '@template/core', '@template/ai'],
  experimental: {
    optimizePackageImports: ['@template/ui'],
  },
}

export default nextConfig
