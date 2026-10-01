import { NotFound } from '@/components/sections/NotFound'

/**
 * Any `notFound()` under a locale — an unknown legal slug, or any path the
 * catch-all in `[...rest]` picks up. Renders inside the locale layout, so the
 * header, language switch and modals are all there.
 */
export default function LocaleNotFound() {
  return (
    <main id="main">
      <NotFound />
    </main>
  )
}
