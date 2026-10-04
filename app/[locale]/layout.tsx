import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import '@/app/globals.css'
import { Header } from '@/components/layout/Header'
import { ModalHost } from '@/components/modals/ModalHost'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { getSiteContent } from '@/lib/cms/site'
import { fontVariables } from '@/lib/fonts'
import { isLocale, localeDirection, locales } from '@/lib/i18n/config'

type LayoutParams = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const { meta } = await getSiteContent(locale)
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((item) => [item, `/${item}`])),
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutParams & { children: React.ReactNode }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const content = await getSiteContent(locale)

  return (
    <html lang={locale} dir={localeDirection[locale]} className={fontVariables}>
      <body className="min-h-dvh">
        <SmoothScroll />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sand"
        >
          {content.chrome.skipToContent}
        </a>

        <Header locale={locale} data={content.header} />
        {/* Each route group's layout renders <main> and its own footer variant. */}
        {children}
        <ModalHost modals={content.modals} />
      </body>
    </html>
  )
}
