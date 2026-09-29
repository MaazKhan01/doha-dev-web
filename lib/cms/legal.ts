import 'server-only'

import { cache } from 'react'

import { legalAr } from '@/content/legal.ar'
import { legalEn } from '@/content/legal.en'
import type { Locale } from '@/lib/i18n/config'
import type { LegalPage } from '@/types/content'

const staticLegal: Record<Locale, LegalPage[]> = {
  en: legalEn,
  ar: legalAr,
}

/** Slugs to prerender. Once the CMS serves these pages, list them from it instead. */
export const legalSlugs = legalEn.map((page) => page.slug)

/**
 * One legal page by slug, or `null` for an unknown slug (the route 404s).
 *
 * Static until the CMS query for legal pages is shared: add it to
 * `graphQlQueries.js`, a raw type to `types/cms.ts`, a `mapLegalPage` to
 * `mappers.ts`, and resolve it here with the static page as the fallback —
 * the route and component stay as they are.
 */
export const getLegalPage = cache(async (locale: Locale, slug: string): Promise<LegalPage | null> => {
  return staticLegal[locale].find((page) => page.slug === slug) ?? null
})
