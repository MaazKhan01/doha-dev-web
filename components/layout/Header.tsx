import Link from 'next/link'

import { LocaleSwitch } from '@/components/layout/LocaleSwitch'
import { Wordmark } from '@/components/layout/Wordmark'
import type { Locale } from '@/lib/i18n/config'
import type { HeaderSection } from '@/types/content'

type HeaderProps = {
  locale: Locale
  data: HeaderSection
}

export function Header({ locale, data }: HeaderProps) {
  return (
    <header className="container-page grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-5 md:gap-6 md:py-8">
      {/* Top-level items only: the design has no dropdown yet, so `children` is
          carried in the data but not rendered. `#contact` / `#newsletter` open
          their modals — see ModalHost. */}
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

      {/* Home link, so the legal pages have a way back. The logo's alt names it. */}
      <Link href={`/${locale}`}>
        <Wordmark logo={data.logo} />
      </Link>

      <LocaleSwitch locale={locale} />
    </header>
  )
}
