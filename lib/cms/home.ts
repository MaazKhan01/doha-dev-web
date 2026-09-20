import 'server-only'

import { cache } from 'react'

import { homeAr } from '@/content/home.ar'
import { homeEn } from '@/content/home.en'
import type { Locale } from '@/lib/i18n/config'
import type { HomeContent } from '@/types/content'

const staticContent: Record<Locale, HomeContent> = {
  en: homeEn,
  ar: homeAr,
}

/**
 * Single entry point for the home page's content.
 *
 * `cache()` deduplicates within one render pass — `generateMetadata`, the
 * layout and the page all ask for the same locale and get one resolution.
 * Cross-request caching is the Data Cache's job, configured in `client.ts`.
 *
 * Today it returns the static fixtures. When the CMS is live, map the GraphQL
 * response to `HomeContent` here — no section component has to change.
 */
export const getHomeContent = cache(async (locale: Locale): Promise<HomeContent> => {
  return staticContent[locale]
})
