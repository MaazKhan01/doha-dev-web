import 'server-only'

import { cache } from 'react'

import { legalAr } from '@/content/legal.ar'
import { legalEn } from '@/content/legal.en'
import { queryCms } from '@/lib/cms/client'
import { LEGAL_PAGE_QUERY } from '@/lib/cms/graphQlQueries'
import { mapLegalPage } from '@/lib/cms/mappers'
import type { Locale } from '@/lib/i18n/config'
import type { CmsLegalPageQuery } from '@/types/cms'
import type { LegalPage } from '@/types/content'

const staticLegal: Record<Locale, LegalPage[]> = {
  en: legalEn,
  ar: legalAr,
}

/**
 * Slugs to prerender at build. Any other slug is still tried on request, so a
 * new Legal Notices page in the CMS appears without a code change.
 */
export const legalSlugs = legalEn.map((page) => page.slug)

/**
 * One legal page by slug: the CMS page when it exists on the Legal Notices
 * template, else the static copy, else `null` (the route 404s).
 *
 * The slug is the WordPress page URI (`legal-notices`), and the query is
 * locale-independent, so `/en/…` and `/ar/…` share one Data Cache entry.
 */
export const getLegalPage = cache(async (locale: Locale, slug: string): Promise<LegalPage | null> => {
  const fallback = staticLegal[locale].find((page) => page.slug === slug) ?? null
  const raw = await queryCms<CmsLegalPageQuery>({ ...LEGAL_PAGE_QUERY, variables: { uri: slug } })

  return mapLegalPage(raw, { locale, slug, fallback }) ?? fallback
})
