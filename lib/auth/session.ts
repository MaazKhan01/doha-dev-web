/**
 * TEMPORARY access gate — the site is not public yet. Replace with real
 * authentication (or remove) before launch.
 *
 * The session is one httpOnly cookie holding a fixed token. `proxy.ts` checks
 * it on every page request; the sign-in action sets it; `/api/auth/signout`
 * clears it. Kept apart from the credentials so the proxy never imports them.
 */
export const AUTH_COOKIE = 'doha_preview'

/** The cookie's value once signed in. Changing it signs everyone out. */
export const AUTH_TOKEN = 'doha-2036-preview-v1'

/** How long a sign-in lasts: 7 days. */
export const AUTH_MAX_AGE = 60 * 60 * 24 * 7

/** Only same-site paths may follow sign-in, so `?next=` cannot redirect off-site. */
export function safeNext(value: unknown): string {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : '/'
}
