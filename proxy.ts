import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, locales } from '@/lib/i18n/config'

/** Picks the best supported locale from the Accept-Language header. */
function negotiateLocale(request: NextRequest) {
  const header = request.headers.get('accept-language')
  if (!header) return defaultLocale

  const preferred = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { tag: tag.toLowerCase(), quality: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.quality - a.quality)

  for (const { tag } of preferred) {
    const match = locales.find((locale) => tag === locale || tag.startsWith(`${locale}-`))
    if (match) return match
  }

  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )
  if (hasLocale) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${negotiateLocale(request)}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Everything except Next internals, the API and files with an extension.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
