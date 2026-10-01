import type { Locale } from '@/lib/i18n/config'

/** Copy for the 404 page. Static: a missing page should never depend on the CMS answering. */
export const notFoundCopy: Record<
  Locale,
  { metaTitle: string; eyebrow: string; title: string; body: string; home: string; contact: string }
> = {
  en: {
    metaTitle: 'Page not found - Doha 2036',
    eyebrow: 'Error 404',
    title: 'Off the track',
    body: 'The page you’re looking for has moved, been renamed or never existed. Let’s get you back in the race.',
    home: 'Back to home',
    contact: 'Contact us',
  },
  ar: {
    metaTitle: 'الصفحة غير موجودة - الدوحة 2036',
    eyebrow: 'خطأ 404',
    title: 'خارج المسار',
    body: 'الصفحة التي تبحث عنها نُقلت أو تغيّر اسمها أو لم تكن موجودة أصلاً. لنُعِدك إلى السباق.',
    home: 'العودة إلى الرئيسية',
    contact: 'اتصل بنا',
  },
}
