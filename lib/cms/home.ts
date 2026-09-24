import 'server-only'

import { cache } from 'react'

import { queryCms } from '@/lib/cms/client'
import { HOMEPAGE_QUERY } from '@/lib/cms/graphQlQueries'
import { mapSections } from '@/lib/cms/mappers'
import { staticContent, staticHomeSections } from '@/lib/cms/static'
import type { Locale } from '@/lib/i18n/config'
import type { CmsPageQuery } from '@/types/cms'
import type { HomeContent } from '@/types/content'

/**
 * Single entry point for the home page's content: its page-builder sections,
 * in the order editors arranged them in the CMS.
 *
 * `cache()` deduplicates within one render pass; cross-request caching is the
 * Data Cache's job, configured in `client.ts`. When the CMS is unset or the
 * request fails, the static sections render in the design's order.
 */
export const getHomeContent = cache(async (locale: Locale): Promise<HomeContent> => {
  const fallback = staticContent[locale]
  const page = await queryCms<CmsPageQuery>(HOMEPAGE_QUERY)

  return {
    sections: mapSections(page, { locale, fallback }) ?? staticHomeSections(fallback),
  }
})
