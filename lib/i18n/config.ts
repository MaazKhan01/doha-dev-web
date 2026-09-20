export const locales = ['en', 'ar'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
}

export const localeLabel: Record<Locale, string> = {
  en: 'En',
  ar: 'Ar',
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
