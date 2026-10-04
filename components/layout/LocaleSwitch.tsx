'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { localeLabel, locales, type Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils/cn'

/**
 * EN | AR, keeping the reader on the same page: `/en/privacy` ↔ `/ar/privacy`.
 * A client component only because the header lives in the shared layout,
 * which does not know the current path.
 */
export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  // Everything after the locale segment.
  const rest = pathname.replace(/^\/[^/]+/, '')

  return (
    <nav
      aria-label="Language"
      className="flex items-center gap-1.5 justify-self-end text-xs md:gap-2 md:text-lg"
    >
      {locales.map((item, index) => (
        <span key={item} className="flex items-center gap-1.5 md:gap-2">
          {index > 0 && (
            <span aria-hidden className="text-ink/30">
              |
            </span>
          )}
          <Link
            href={`/${item}${rest}`}
            hrefLang={item}
            aria-current={item === locale ? 'true' : undefined}
            className={cn(
              'transition-colors duration-300 hover:text-flame',
              item === locale ? 'text-ink' : 'text-ink/45',
            )}
          >
            {localeLabel[item]}
          </Link>
        </span>
      ))}
    </nav>
  )
}
