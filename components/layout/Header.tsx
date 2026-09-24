import Link from 'next/link'

import { Wordmark } from '@/components/layout/Wordmark'
import { localeLabel, locales, type Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils/cn'
import type { HeaderSection } from '@/types/content'

type HeaderProps = {
  locale: Locale
  data: HeaderSection
}

export function Header({ locale, data }: HeaderProps) {
  return (
    <header className="container-page grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-5 md:gap-6 md:py-8">
      {/* Top-level items only: the design has no dropdown yet, so `children` is
          carried in the data but not rendered. */}
      <nav aria-label="Main" className="justify-self-start">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:gap-x-6 md:text-lg">
          {data.menus.map((item) => (
            <li key={`${item.label}-${item.href}`}>
              <Link href={item.href} className="transition-colors duration-300 hover:text-flame">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Wordmark logo={data.logo} />

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
              href={`/${item}`}
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
    </header>
  )
}
