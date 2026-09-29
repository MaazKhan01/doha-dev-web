import type { NextConfig } from 'next'

import { CMS_GRAPHQL_ENDPOINT } from './lib/cms/config'

/**
 * The CMS host, derived from the GraphQL endpoint in `lib/cms/config.ts`, so
 * uploaded media can be optimised by next/image with no second setting.
 */
const cmsHost = CMS_GRAPHQL_ENDPOINT ? new URL(CMS_GRAPHQL_ENDPOINT).hostname : undefined

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
