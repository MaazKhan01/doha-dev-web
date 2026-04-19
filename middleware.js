import { NextResponse } from 'next/server';
import { i18n } from './i18n';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname is missing any locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = i18n.defaultLocale;

    // e.g. / -> /en
    // e.g. /about -> /en/about
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
