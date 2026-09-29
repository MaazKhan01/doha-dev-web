'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

let instance: Lenis | null = null

/**
 * Pauses Lenis while an overlay is open, so the page behind a modal stays put.
 * A no-op under reduced motion, where Lenis never starts.
 */
export function setScrollLocked(locked: boolean) {
  if (locked) instance?.stop()
  else instance?.start()
}

/**
 * Lenis smooth scrolling, driven by rAF and disabled for readers who ask for
 * reduced motion. Mounted once in the root layout.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReducedMotion.matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    instance = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      instance = null
    }
  }, [])

  return null
}
