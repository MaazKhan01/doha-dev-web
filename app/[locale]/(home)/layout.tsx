import { Footer } from '@/components/layout/Footer'
import { getSiteContent } from '@/lib/cms/site'
import { isLocale } from '@/lib/i18n/config'

/** Home: the page, then the full footer band with backdrop and wordmark. */
export default async function HomeLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  // The locale layout has already 404'd anything else.
  if (!isLocale(locale)) return null

  const { footer } = await getSiteContent(locale)

  return (
    <>
      <main id="main">{children}</main>
      <Footer data={footer} />
    </>
  )
}
