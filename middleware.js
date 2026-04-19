import { NextResponse } from 'next/server';
import { i18n } from './i18n';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname is missing any locale
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale

}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
