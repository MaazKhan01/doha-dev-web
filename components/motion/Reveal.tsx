'use client'

import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Stagger position when several Reveals sit in the same row. */
  delay?: number
  /** Travel distance in px before settling. */
  offset?: number
  className?: string
} & Omit<HTMLMotionProps<'div'>, 'children' | 'className'>

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The site's one entrance animation: a rise, fade and de-blur as an element
 * enters the viewport, once. Everything reveals the same way so the page reads
 * as a single piece rather than a collection of effects.
 */
const VISIBLE = { opacity: 1, y: 0, filter: 'blur(0px)' }

export function Reveal({ children, delay = 0, offset = 40, className, ...rest }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  // Always the same motion element: the server cannot know the preference and
  // renders the hidden state, and React does not patch server styles on
  // hydration — so swapping in a plain <div> left reduced-motion readers
  // looking at invisible content. Instead, show it at once, with no travel.
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset, filter: 'blur(6px)' }}
      animate={shouldReduceMotion ? VISIBLE : undefined}
      whileInView={shouldReduceMotion ? undefined : VISIBLE}
      // Fires once the element is properly into view, not the moment its edge
      // appears — otherwise a fast scroll trips several sections at once and
      // the cascade reads as one flash.
      viewport={{ once: true, margin: '0px 0px -22% 0px' }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/**
 * Reveals its children one after another. Use for lists and stacked paragraphs
 * where a single block fade would feel flat.
 */
export function RevealStagger({
  children,
  step = 0.09,
  offset = 40,
  className,
}: {
  children: ReactNode[]
  step?: number
  offset?: number
  className?: string
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <Reveal key={index} delay={index * step} offset={offset}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
