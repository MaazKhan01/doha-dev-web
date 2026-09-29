'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef, type ReactNode } from 'react'

import { setScrollLocked } from '@/components/providers/SmoothScroll'
import { cn } from '@/lib/utils/cn'

type ModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Accessible name of the close button. */
  closeLabel: string
  children: ReactNode
  className?: string
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * The one modal shell: a 55% scrim and a sand card that rises, fades and
 * de-blurs in — the same motion vocabulary as `Reveal` — and settles back out
 * faster than it came in. Radix supplies the focus trap, Escape, outside-click
 * and aria wiring; Lenis is paused so the page behind stays put.
 *
 * Children render the visible heading through `Modal.Title` so the dialog is
 * named by what the reader sees.
 */
export function Modal({ open, onOpenChange, closeLabel, children, className }: ModalProps) {
  const reduceMotion = useReducedMotion()
  const card = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setScrollLocked(open)
    return () => setScrollLocked(false)
  }, [open])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/55"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.15 : 0.45, ease: EASE }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              forceMount
              aria-describedby={undefined}
              // Start in the first field rather than on the close button.
              onOpenAutoFocus={(event) => {
                const field = card.current?.querySelector<HTMLElement>('input, textarea, select')
                if (!field) return
                event.preventDefault()
                field.focus()
              }}
            >
              <motion.div
                ref={card}
                // Wheel and touch scroll the card natively, not through Lenis.
                data-lenis-prevent
                // `inset-0 m-auto` centres without left/right, so RTL needs nothing.
                className={cn(
                  'fixed inset-0 z-50 m-auto h-fit max-h-[calc(100dvh-2rem)] w-[min(45rem,calc(100vw-2rem))]',
                  'overflow-y-auto overscroll-contain rounded-card bg-sand text-ink',
                  'px-6 pt-14 pb-10 sm:px-14 sm:pt-16 sm:pb-16',
                  className,
                )}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={
                  reduceMotion
                    ? { opacity: 0, transition: { duration: 0.15 } }
                    : { opacity: 0, y: 16, scale: 0.98, transition: { duration: 0.3, ease: EASE } }
                }
                transition={{ duration: reduceMotion ? 0.15 : 0.6, ease: EASE }}
              >
                <Dialog.Close
                  aria-label={closeLabel}
                  // A 40px hit area whose icon lands 28px in from the corner, as drawn.
                  className="absolute end-5 top-5 grid size-10 place-items-center rounded-full transition-opacity duration-300 hover:opacity-60"
                >
                  <Image src="/icons/close.svg" alt="" width={23.6} height={23.6} unoptimized />
                </Dialog.Close>

                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

Modal.Title = Dialog.Title
