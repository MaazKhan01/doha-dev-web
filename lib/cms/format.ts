import type { Locale } from '@/lib/i18n/config'
import type { CmsMedia } from '@/types/cms'
import type { HeadingLine, MediaAsset } from '@/types/content'

/**
 * Small, pure helpers for turning WordPress values into the plain strings the
 * sections render. Sections never receive raw HTML, so nothing downstream
 * needs `dangerouslySetInnerHTML`.
 */

type Maybe<T> = T | null | undefined

/**
 * Picks the value for the locale. Arabic falls back to English while the
 * translation is still being authored, so a missing field never leaves a hole.
 */
export function pick<T>(locale: Locale, en: Maybe<T>, ar: Maybe<T>): T | undefined {
  const value = locale === 'ar' ? (isPresent(ar) ? ar : en) : en
  return value ?? undefined
}

function isPresent<T>(value: Maybe<T>): value is T {
  return value !== null && value !== undefined && value !== ''
}

const namedEntities: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  copy: '©',
  reg: '®',
  trade: '™',
  laquo: '«',
  raquo: '»',
  hellip: '…',
  ndash: '–',
  mdash: '—',
  lsquo: '‘',
  rsquo: '’',
  ldquo: '“',
  rdquo: '”',
}

/** WordPress texturizes quotes and dashes into entities (`&#8217;`); undo that. */
export function decodeEntities(value: string): string {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === '#') {
      const code = entity[1] === 'x' || entity[1] === 'X'
        ? parseInt(entity.slice(2), 16)
        : parseInt(entity.slice(1), 10)
      return Number.isNaN(code) ? match : String.fromCodePoint(code)
    }
    return namedEntities[entity.toLowerCase()] ?? match
  })
}

/** Strips tags and entities, collapsing whitespace. Safe on plain text too. */
export function toPlainText(value: Maybe<string>): string {
  if (!value) return ''
  return decodeEntities(value.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

/** Splits on line breaks, `<br>` and block closes — however an editor broke the lines. */
function splitLines(value: string): string[] {
  return value.split(/<br\s*\/?>|<\/(?:p|div|h[1-6])>|\r?\n/i)
}

/** A single-line field authored as several lines, e.g. a footer headline. */
export function toLines(value: Maybe<string>): string[] {
  if (!value) return []
  return splitLines(value).map(toPlainText).filter(Boolean)
}

/**
 * A display heading, one line per line break. A line wrapped in `<strong>` or
 * `<b>` becomes an accent line, so editors can pick the orange lines with the
 * editor's Bold button rather than a separate field.
 */
export function toHeadingLines(value: Maybe<string>, accent = false): HeadingLine[] {
  if (!value) return []
  return splitLines(value)
    .map((line) => ({
      text: toPlainText(line),
      accent: accent || /<(?:strong|b)\b/i.test(line),
    }))
    .filter((line) => line.text)
    .map((line) => (line.accent ? line : { text: line.text }))
}

/** Rich-text body to paragraphs. A blank line counts as a paragraph break in plain text. */
export function toParagraphs(value: Maybe<string>): string[] {
  if (!value) return []
  return value
    .split(/<\/p>|(?:<br\s*\/?>\s*){2,}|\r?\n\s*\r?\n/i)
    .map(toPlainText)
    .filter(Boolean)
}

/** Where the GraphQL endpoint is served from — also where its uploads are reachable. */
const cmsOrigin = (() => {
  try {
    return process.env.CMS_GRAPHQL_ENDPOINT ? new URL(process.env.CMS_GRAPHQL_ENDPOINT).origin : null
  } catch {
    return null
  }
})()

/**
 * WordPress writes upload URLs with its own site URL (e.g. a local
 * `doha-website.local`), which is not the host the site reaches it on. Rebase
 * uploads onto the endpoint's origin so they load, and pass through
 * `next/image`'s allow-list, wherever WordPress thinks it lives.
 */
export function toPublicUrl(url: Maybe<string>): string {
  if (!url) return ''
  if (!cmsOrigin) return url
  try {
    const parsed = new URL(url)
    return parsed.pathname.startsWith('/wp-content/')
      ? `${cmsOrigin}${parsed.pathname}${parsed.search}`
      : url
  } catch {
    return url
  }
}

/** Paths that open a modal rather than a page, so `/contact` in the CMS just works. */
const modalPaths: Record<string, string> = { '/contact': '#contact', '/newsletter': '#newsletter' }

/**
 * A CMS link to an `href` the site can route. Relative paths gain the locale
 * (`/privacy` → `/en/privacy`); `/contact` and `/newsletter` open their
 * modals; `#…` and absolute URLs pass through. Empty or a bare `#` is no link.
 */
export function toHref(locale: Locale, url: Maybe<string>): string | undefined {
  const value = url?.trim()
  if (!value || value === '#') return undefined
  if (!value.startsWith('/') || value.startsWith('//')) return value

  const withoutLocale = value.replace(/^\/(en|ar)(?=\/|$|#|\?)/, '') || '/'
  const path = withoutLocale.replace(/\/$/, '').toLowerCase()
  return modalPaths[path] ?? `/${locale}${withoutLocale === '/' ? '' : withoutLocale}`
}

/**
 * An ACF media edge to a `MediaAsset`. Alt text comes from the media library;
 * `alt` is used when the editor has not set one. No URL means an empty `src`,
 * which renders the labelled placeholder.
 */
export function toMedia(media: CmsMedia, alt: string): MediaAsset {
  const node = media?.node
  return {
    src: toPublicUrl(node?.mediaItemUrl || node?.sourceUrl),
    alt: toPlainText(node?.altText) || alt,
  }
}

/** Picks the Arabic asset for `ar` when one is uploaded, else the English one. */
export function pickMedia(locale: Locale, en: CmsMedia, ar: CmsMedia): CmsMedia {
  return locale === 'ar' && (ar?.node?.mediaItemUrl || ar?.node?.sourceUrl) ? ar : en
}
