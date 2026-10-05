import 'server-only'

import { cache } from 'react'

import { uiStrings } from '@/content/ui'
import { queryCms } from '@/lib/cms/client'
import { FOOTER_QUERY, HEADER_QUERY } from '@/lib/cms/graphQlQueries'
import { mapFooter, mapHeader, mapModals } from '@/lib/cms/mappers'
import type { Locale } from '@/lib/i18n/config'
import type { CmsFooterQuery, CmsHeaderQuery } from '@/types/cms'
import type { SiteContent } from '@/types/content'

/**
 * Everything the locale layout renders around a page: metadata, header,
 * footer and modal copy — all from the CMS. Shared by every route, so it is
 * loaded apart from any page's body.
 *
 * Header and footer are fetched in parallel. They are locale-independent
 * queries, so `en` and `ar` hit the same Data Cache entry; the mappers pick
 * the language. A failed query throws (see `queryCms`) — there is no static
 * copy to fall back to.
 */
export const getSiteContent = cache(async (locale: Locale): Promise<SiteContent> => {
  const ui = uiStrings[locale]

  const [header, footer] = await Promise.all([
    queryCms<CmsHeaderQuery>(HEADER_QUERY),
    queryCms<CmsFooterQuery>(FOOTER_QUERY),
  ])

  return {
    // The CMS has no SEO fields yet; these are the site-wide defaults.
    meta: ui.meta,
    chrome: ui.chrome,
    header: mapHeader(header, { locale, ui }),
    footer: mapFooter(footer, { locale, ui }),
    modals: mapModals(header, footer, { locale, ui }),
  }
})
