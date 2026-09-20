'use client'

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'

import { cn } from '@/lib/utils/cn'
import type { HeadingLine } from '@/types/content'

/** Resting state of a line that has not been reached yet. */
const DIMMED = 0.16

function Line({
  line,
  progress,
  range,
}: {
  line: HeadingLine
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [DIMMED, 1], { clamp: true })

  return (
    <span className="block">
      <motion.span
        style={{ opacity }}
        className={cn('inline-block', line.accent && 'text-flame')}
      >
        {line.text}
      </motion.span>
    </span>
  )
}

/**
 * A display heading that starts greyed out and lights up line by line as the
 * section travels through the viewport. Each line owns a slice of the scroll
 * range, with a slight overlap so the sweep reads as continuous.
 */
export function ScrollLitHeading({
  lines,
  className,
}: {
  lines: HeadingLine[]
  className?: string
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.55'],
  })

  if (shouldReduceMotion) {
    return (
      <h2 ref={ref} className={cn('type-display', className)}>
        {lines.map((line, index) => (
          <span key={index} className="block">
            <span className={line.accent ? 'text-flame' : undefined}>{line.text}</span>
          </span>
        ))}
      </h2>
    )
  }

  const step = 1 / lines.length

  return (
    <h2 ref={ref} className={cn('type-display', className)}>
      {lines.map((line, index) => (
        <Line
          key={index}
          line={line}
          progress={scrollYProgress}
          range={[index * step, Math.min(1, (index + 1.35) * step)]}
        />
      ))}
    </h2>
  )
}
