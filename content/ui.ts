import type { Locale } from '@/lib/i18n/config'
import type { UiStrings } from '@/types/content'

/**
 * Interface vocabulary: the text the CMS has no field for. Everything a
 * visitor reads as content — headings, copy, links, modal titles and buttons,
 * legal text, images — comes from the CMS and is never duplicated here.
 *
 * When the CMS gains a field for one of these, map it in `lib/cms/mappers.ts`
 * and delete the string here.
 */
export const uiStrings: Record<Locale, UiStrings> = {
  en: {
    meta: {
      title: 'Doha 2036 - A Games For All Summers',
      description:
        'Doha is exploring the opportunity to host the Olympic and Paralympic Games in 2036.',
    },
    siteName: 'Doha 2036',
    chrome: { skipToContent: 'Skip to content', mainNav: 'Main', languageNav: 'Language' },
    logoAlt: 'Doha — aspiring to welcome the Olympic and Paralympic Games',
    socialLabels: { instagram: 'Instagram', facebook: 'Facebook', tiktok: 'TikTok', x: 'X' },
    newsletter: {
      emailLabel: 'Email address',
      emailPlaceholder: 'your@email.com',
      submitting: 'Signing up…',
      success: 'Thank you — you are on the list.',
      error: 'Something went wrong. Please try again.',
      close: 'Close',
    },
    contact: {
      eyebrow: 'Contact us',
      fields: {
        name: { label: 'Name', placeholder: 'Full name' },
        email: { label: 'Email', placeholder: 'your@email.com' },
        subject: { label: 'Subject', placeholder: 'What is your enquiry about?' },
        message: { label: 'Message', placeholder: 'Write your message…' },
      },
      submitting: 'Sending…',
      success: 'Thank you — your message has been sent.',
      error: 'Something went wrong. Please try again.',
      close: 'Close',
    },
    notFound: {
      metaTitle: 'Page not found - Doha 2036',
      eyebrow: 'Error 404',
      title: 'Off the track',
      body: 'The page you’re looking for has moved, been renamed or never existed. Let’s get you back in the race.',
      home: 'Back to home',
      contact: 'Contact us',
    },
  },
  ar: {
    meta: {
      title: 'الدوحة 2036 — دورة ألعاب لكل الصيف',
      description: 'تدرس الدوحة فرصة استضافة الألعاب الأولمبية والبارالمبية في عام 2036.',
    },
    siteName: 'الدوحة 2036',
    chrome: { skipToContent: 'تخطَّ إلى المحتوى', mainNav: 'القائمة الرئيسية', languageNav: 'اللغة' },
    logoAlt: 'الدوحة — نتطلع إلى استضافة الألعاب الأولمبية والبارالمبية',
    socialLabels: { instagram: 'إنستغرام', facebook: 'فيسبوك', tiktok: 'تيك توك', x: 'إكس' },
    newsletter: {
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'بريدك الإلكتروني',
      submitting: 'جارٍ الاشتراك…',
      success: 'شكراً لك — تم تسجيلك في القائمة.',
      error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
      close: 'إغلاق',
    },
    contact: {
      eyebrow: 'اتصل بنا',
      fields: {
        name: { label: 'الاسم', placeholder: 'الاسم الكامل' },
        email: { label: 'البريد الإلكتروني', placeholder: 'your@email.com' },
        subject: { label: 'الموضوع', placeholder: 'ما موضوع استفسارك؟' },
        message: { label: 'الرسالة', placeholder: 'اكتب رسالتك…' },
      },
      submitting: 'جارٍ الإرسال…',
      success: 'شكراً لك — تم إرسال رسالتك.',
      error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
      close: 'إغلاق',
    },
    notFound: {
      metaTitle: 'الصفحة غير موجودة - الدوحة 2036',
      eyebrow: 'خطأ 404',
      title: 'خارج المسار',
      body: 'الصفحة التي تبحث عنها نُقلت أو تغيّر اسمها أو لم تكن موجودة أصلاً. لنُعِدك إلى السباق.',
      home: 'العودة إلى الرئيسية',
      contact: 'اتصل بنا',
    },
  },
}
