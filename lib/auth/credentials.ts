import 'server-only'

/**
 * TEMPORARY hardcoded access details for the preview gate. Server-only: the
 * sign-in form posts to a server action, so these never reach the browser.
 * Replace with real authentication before launch.
 */
export const PREVIEW_CREDENTIALS = {
  email: 'preview@qoc.qa',
  password: 'Doha2036!',
}
