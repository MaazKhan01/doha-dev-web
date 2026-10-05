import 'server-only'

/**
 * TEMPORARY shared password for the preview gate — one password for everyone,
 * no accounts. Server-only: the sign-in form posts to /api/auth/signin, so it
 * never reaches the browser. Replace with real authentication before launch.
 */
export const PREVIEW_PASSWORD = 'Doha2036!'
