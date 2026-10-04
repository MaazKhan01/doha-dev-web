import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LegalContent } from '@/components/sections/LegalContent'
import { getLegalPage, legalSlugs } from '@/lib/cms/legal'
import { isLocale, locales } from '@/lib/i18n/config'

type Params = { params: Promise<{ locale: string; slug: string }> }

/** Same window as the home page; must stay a literal. Keep in step with `CMS_REVALIDATE`. */
export const revalidate = 300

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}

  const page = await getLegalPage(locale, slug)
  if (!page) return {}

  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((item) => [item, `/${item}/${slug}`])),
    },
  }
}

export default async function LegalRoute({ params }: Params) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const page = await getLegalPage(locale, slug)
  if (!page) notFound()

  return <LegalContent data={page} />
}
