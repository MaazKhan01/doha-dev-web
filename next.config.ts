import type { NextConfig } from 'next'

/**
 * The CMS host, derived from the GraphQL endpoint, so uploaded media can be
 * optimised by next/image without maintaining a second env var.
 */
const cmsHost = process.env.CMS_GRAPHQL_ENDPOINT
  ? new URL(process.env.CMS_GRAPHQL_ENDPOINT).hostname
  : undefined

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Optimised derivatives are expensive to generate; keep them for a year.
    minimumCacheTTL: 60 * 60 * 24 * 365,
    remotePatterns: cmsHost ? [{ protocol: 'https', hostname: cmsHost }] : [],
  },

  async headers() {
    return [
      {
        // Route handlers must never be cached by a CDN or the browser.
        source: '/api/:path*',
        headers: [{ key: 'Cache-Control', value: 'no-store, must-revalidate' }],
      },
      {
        // Not content-hashed, so it revalidates hourly rather than being
        // pinned in caches past a brand update.
        source: '/logo.svg',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' }],
      },
    ]
  },
}

export default nextConfig
