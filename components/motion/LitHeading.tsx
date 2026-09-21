'use client'

import { motion, useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'

import { cn } from '@/lib/utils/cn'
import type { HeadingLine } from '@/types/content'

/** Resting state of a line that has not lit yet. */
const DIMMED = 0.16

/** Seconds between one line lighting and the next. */
const STEP = 0.8

/** How long a single line takes to fill. */
const FILL = 0.6

/**
 * A display heading that starts greyed out and fills in line by line.
 *
 * The run is on a timer, not tied to scroll position — it only waits until the
 * heading is on screen before starting, so the sequence is never spent before
 * anyone sees it. It plays once.
 *
 * Each line carries its own `delay` rather than relying on `staggerChildren`:
 * variant propagation from a `whileInView` parent does not reach the spans
 * here, so the stagger silently never ran.
 */
export function LitHeading({ lines, className }: { lines: HeadingLine[]; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.15 })

  if (shouldReduceMotion) {
    return (
      <h2 ref={ref} className={cn('type-display', className)}>
        {lines.map((item, index) => (
          <span key={index} className="block">
            <span className={item.accent ? 'text-flame' : undefined}>{item.text}</span>
          </span>
        ))}
      </h2>
    )
  }

  return (
    <h2 ref={ref} className={cn('type-display', className)}>
      {lines.map((item, index) => (
        <motion.span
          key={index}
          className={cn('block', item.accent && 'text-flame')}
          initial={{ opacity: DIMMED }}
          animate={{ opacity: inView ? 1 : DIMMED }}
          transition={{ duration: FILL, delay: index * STEP, ease: [0.22, 1, 0.36, 1] }}
        >
          {item.text}
        </motion.span>
      ))}
    </h2>
  )
}
