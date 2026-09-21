import Link from 'next/link'

import { Wordmark } from '@/components/layout/Wordmark'
import { localeLabel, locales, type Locale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils/cn'

type HeaderProps = {
  locale: Locale
  contactLabel: string
}

export function Header({ locale, contactLabel }: HeaderProps) {
  return (
    <header className="container-page grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-5 md:gap-6 md:py-8">
      <Link
        href="#contact"
        className="justify-self-start text-xs transition-colors duration-300 hover:text-flame md:text-lg"
      >
        {contactLabel}
      </Link>

      <Wordmark />

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
