import 'server-only'

import { cache } from 'react'

import { uiStrings } from '@/content/ui'
import { queryCms } from '@/lib/cms/client'
import { LEGAL_PAGE_QUERY } from '@/lib/cms/graphQlQueries'
import { mapLegalPage } from '@/lib/cms/mappers'
import type { Locale } from '@/lib/i18n/config'
import type { CmsLegalPageQuery } from '@/types/cms'
import type { LegalPage } from '@/types/content'

/**
 * Slugs to prerender at build — the WordPress page URIs the footer links to.
 * Any other slug is still tried on request, so a new legal page published in
 * the CMS appears without a code change.
 */
export const legalSlugs = ['legal-notices', 'privacy-policy']

/**
 * One legal page by slug, from the CMS: the Legal Notices template, or the
 * Default template with content (the privacy policy). `null` — the route
 * 404s — when the CMS has no such page.
 *
 * Unlike the home page and layout, a failed query does not throw: it logs the
 * reason and 404s. A legal page the CMS cannot serve (e.g. its field group is
 * not exposed to GraphQL) should not take down the build or the rest of the
 * site. The query is locale-independent, so `/en/…` and `/ar/…` share one
 * Data Cache entry.
 */
export const getLegalPage = cache(async (locale: Locale, slug: string): Promise<LegalPage | null> => {
  try {
    const raw = await queryCms<CmsLegalPageQuery>({ ...LEGAL_PAGE_QUERY, variables: { uri: slug } })
    return mapLegalPage(raw, { locale, slug, ui: uiStrings[locale] })
  } catch (error) {
    console.error(`[cms] legal page "${slug}" unavailable, serving 404:`, (error as Error).message)
    return null
  }
})
