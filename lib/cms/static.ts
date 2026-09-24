import { homeAr } from '@/content/home.ar'
import { homeEn } from '@/content/home.en'
import type { Locale } from '@/lib/i18n/config'
import type { PageSection, StaticContent } from '@/types/content'

/** The static copy per locale — the fallback whenever the CMS is unset or unreachable. */
export const staticContent: Record<Locale, StaticContent> = {
  en: homeEn,
  ar: homeAr,
}

/** The home page's sections in the design's order, built from the static copy. */
export function staticHomeSections(content: StaticContent): PageSection[] {
  return [
    { id: 'hero', type: 'hero', data: content.hero },
    { id: 'intro', type: 'intro', data: content.intro },
    { id: 'statement', type: 'statement', data: content.statement },
    { id: 'valueProps', type: 'valueProps', data: content.valueProps },
    { id: 'committee', type: 'committee', data: content.committee },
    { id: 'faq', type: 'faq', data: content.faq },
  ]
}
