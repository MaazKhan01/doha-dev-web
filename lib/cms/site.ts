import 'server-only'

import { cache } from 'react'

import { queryCms } from '@/lib/cms/client'
import { FOOTER_QUERY, HEADER_QUERY } from '@/lib/cms/graphQlQueries'
import { mapFooter, mapHeader } from '@/lib/cms/mappers'
import { staticContent } from '@/lib/cms/static'
import type { Locale } from '@/lib/i18n/config'
import type { CmsFooterQuery, CmsHeaderQuery } from '@/types/cms'
import type { SiteContent } from '@/types/content'

/**
 * Everything the locale layout renders around a page: metadata, header and
 * footer. Shared by every route, so it is loaded apart from any page's body.
 *
 * Header and footer are fetched in parallel. They are locale-independent
 * queries, so `en` and `ar` hit the same Data Cache entry; the mappers pick
 * the language. Each falls back to the static copy on its own if its request
 * fails.
 */
export const getSiteContent = cache(async (locale: Locale): Promise<SiteContent> => {
  const fallback = staticContent[locale]

  const [header, footer] = await Promise.all([
    queryCms<CmsHeaderQuery>(HEADER_QUERY),
    queryCms<CmsFooterQuery>(FOOTER_QUERY),
  ])

  return {
    meta: fallback.meta,
    chrome: fallback.chrome,
    header: mapHeader(header, { locale, fallback }),
    footer: mapFooter(footer, { locale, fallback }),
    // Static until the CMS models the modal copy.
    modals: fallback.modals,
  }
})
