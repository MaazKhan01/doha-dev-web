import { NextResponse, type NextRequest } from 'next/server'

import { AUTH_COOKIE, AUTH_TOKEN } from '@/lib/auth/session'
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
  const { pathname, search } = request.nextUrl

  // TEMPORARY preview gate (see lib/auth/session.ts): every page needs the
  // session cookie. /api/* is outside the matcher, so the CMS publish webhook
  // and sign-out keep working without it.
  const signedIn = request.cookies.get(AUTH_COOKIE)?.value === AUTH_TOKEN
  if (pathname === '/signin') {
    return signedIn ? NextResponse.redirect(new URL('/', request.url)) : NextResponse.next()
  }
  if (!signedIn) {
    const url = new URL('/signin', request.url)
    if (pathname !== '/') url.searchParams.set('next', pathname + search)
    return NextResponse.redirect(url)
  }

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
