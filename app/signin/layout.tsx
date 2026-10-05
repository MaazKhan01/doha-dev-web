import type { Metadata } from 'next'

import '@/app/globals.css'
import { fontVariables } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Sign in - Doha 2036',
  // A gate, not a page: keep it out of search results.
  robots: { index: false, follow: false },
}

/**
 * A root layout of its own: the sign-in page sits outside `[locale]`, so it
 * renders without the CMS-driven header, footer and modals — and loads even
 * when the CMS is unreachable.
 */
export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      <body className="min-h-dvh">{children}</body>
    </html>
  )
}
