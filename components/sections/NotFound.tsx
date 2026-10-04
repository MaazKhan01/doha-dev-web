'use client'

import { motion, useReducedMotion, useSpring } from 'motion/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRef, type PointerEvent } from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { buttonClass } from '@/components/ui/formStyles'
import { notFoundCopy } from '@/content/notFound'
import { defaultLocale, isLocale } from '@/lib/i18n/config'
import { cn } from '@/lib/utils/cn'

/** Degrees the centre diamond tilts at the edge of the field. */
const TILT = 28

/**
 * The 404 page: "4◆4", where the zero is the site's diamond motif. The diamond
 * tilts toward the pointer, and a faint field of small diamonds lights up in
 * flame around it. Under reduced motion both stay still.
 *
 * A client component because not-found boundaries receive no params — the
 * locale comes from `useParams` — and for the pointer tracking.
 */
export function NotFound() {
  const params = useParams<{ locale?: string }>()
  const locale = params?.locale && isLocale(params.locale) ? params.locale : defaultLocale
  const copy = notFoundCopy[locale]

  const reduceMotion = useReducedMotion()
  const field = useRef<HTMLDivElement>(null)
  const spring = { stiffness: 140, damping: 16, mass: 0.6 }
  const rotateX = useSpring(0, spring)
  const rotateY = useSpring(0, spring)

  function track(event: PointerEvent<HTMLDivElement>) {
    const el = field.current
    if (!el || reduceMotion) return
    const box = el.getBoundingClientRect()
    const x = event.clientX - box.left
    const y = event.clientY - box.top
    // The spotlight is a CSS mask driven by these three variables — no
    // per-diamond work in JS, so it stays smooth on large screens.
    el.style.setProperty('--x', `${x}px`)
    el.style.setProperty('--y', `${y}px`)
    el.style.setProperty('--spot', '1')
    rotateY.set((x / box.width - 0.5) * TILT * 2)
    rotateX.set(-(y / box.height - 0.5) * TILT * 2)
  }

  function rest() {
    field.current?.style.setProperty('--spot', '0')
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div
      ref={field}
      onPointerMove={track}
      onPointerLeave={rest}
      className="relative isolate overflow-hidden border-t border-stone"
    >
      {/* React 19 hoists this into <head>; not-found boundaries take no metadata export. */}
      <title>{copy.metaTitle}</title>

      <div aria-hidden className="diamond-field -z-10" />

      <div className="container-page flex min-h-[calc(100dvh-8rem)] flex-col items-center justify-center py-16 text-center md:min-h-[calc(100dvh-10.5rem)] md:py-24">
        <Reveal offset={24}>
          <p className="text-[0.9375rem] font-bold text-flame uppercase">{copy.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.12}>
          <h1 className="type-display mt-4 text-[clamp(7rem,26vw,20rem)] leading-[0.8]">
            <span className="sr-only">404</span>
            {/* Digits stay in this order in RTL too; `ltr` keeps the diamond between them. */}
            <span aria-hidden dir="ltr" className="inline-flex items-center gap-[0.06em]">
              <span>4</span>
              <span className="inline-grid place-items-center [perspective:600px]">
                <motion.span
                  className="grid size-[0.72em] place-items-center"
                  style={{ rotateX, rotateY }}
                >
                  <span className="size-[0.5em] rotate-45 rounded-[0.05em] bg-flame" />
                </motion.span>
              </span>
              <span>4</span>
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.24}>
          <h2 className="type-eyebrow mt-10 md:mt-14">{copy.title}</h2>
          <p className="type-lead mx-auto mt-4 max-w-xl text-muted">{copy.body}</p>
        </Reveal>

        <Reveal delay={0.36} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href={`/${locale}`} className={cn(buttonClass, 'h-13 min-w-45')}>
            {copy.home}
          </Link>
          {/* `#contact` opens the contact modal — see ModalHost. */}
          <a
            href="#contact"
            className={cn(
              'inline-grid h-13 min-w-45 place-items-center rounded-field border border-ink px-6 text-lg',
              'transition-colors duration-300 hover:bg-ink hover:text-sand',
            )}
          >
            {copy.contact}
          </a>
        </Reveal>
      </div>
    </div>
  )
}
