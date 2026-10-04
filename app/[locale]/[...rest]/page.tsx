import { notFound } from 'next/navigation'

/**
 * Catches every path no other route matches (`/en/a/b/c`), so it gets the
 * branded 404 inside the locale layout instead of Next's bare default.
 * More specific routes — `/[locale]` and `/[locale]/[slug]` — always win.
 */
export default function CatchAll() {
  notFound()
}
