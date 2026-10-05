import 'server-only'

import { cache } from 'react'

import { uiStrings } from '@/content/ui'
import { queryCms } from '@/lib/cms/client'
import { HOMEPAGE_QUERY } from '@/lib/cms/graphQlQueries'
import { mapSections } from '@/lib/cms/mappers'
import type { Locale } from '@/lib/i18n/config'
import type { CmsPageQuery } from '@/types/cms'
import type { HomeContent } from '@/types/content'

/**
 * Single entry point for the home page's content: its page-builder sections,
 * in the order editors arranged them in the CMS.
 *
 * `cache()` deduplicates within one render pass; cross-request caching is the
 * Data Cache's job, configured in `client.ts`. A failed query throws — the
 * page never renders hardcoded sections in place of the CMS's.
 */
export const getHomeContent = cache(async (locale: Locale): Promise<HomeContent> => {
  const page = await queryCms<CmsPageQuery>(HOMEPAGE_QUERY)
  return { sections: mapSections(page, { locale, ui: uiStrings[locale] }) }
})
