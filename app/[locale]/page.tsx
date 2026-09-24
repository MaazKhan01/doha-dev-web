import { notFound } from 'next/navigation'

import { PageBuilder } from '@/components/layout/PageBuilder'
import { getHomeContent } from '@/lib/cms/home'
import { isLocale } from '@/lib/i18n/config'

/**
 * Prerendered at build time and refreshed in the background at most once every
 * five minutes. A publish webhook can purge it sooner — see
 * `app/api/revalidate/route.ts`.
 *
 * Must stay a literal: Next only reads statically analysable segment config,
 * so it cannot be `CMS_REVALIDATE`. Keep the two in step.
 */
export const revalidate = 300

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const { sections } = await getHomeContent(locale)

  return <PageBuilder sections={sections} />
}
