import { NextResponse } from "next/server";

import { i18n } from "./i18n";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request) {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );
  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function proxy(request) {
  const pathname = request.nextUrl.pathname;
  let temp = i18n.locales.find((locale) => pathname.startsWith(`/${locale}`));

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    let temp = i18n.locales.find((locale) => pathname.startsWith(`/${locale}`));
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    if (temp) {
      return NextResponse.redirect(
        new URL(
          `/${temp || locale}${
            pathname.startsWith("/") ? "" : "/"
          }${pathname.slice(3)}`,
          request.url
        )
      );
    } else {
      return NextResponse.redirect(
        new URL(
          `/${temp || locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
          request.url
        )
      );
    }
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
