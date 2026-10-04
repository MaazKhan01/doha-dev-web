import type { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

type DiamondProps = {
  children: ReactNode
  /** Adds a quarter turn — used to mark an open accordion row. */
  spin?: boolean
  className?: string
}

/**
 * A square rotated 45°. Its contents are counter-rotated so icons and glyphs
 * stay upright. Shared by the FAQ markers and the footer's social chips so the
 * shape reads as one motif.
 */
export function Diamond({ children, spin = false, className }: DiamondProps) {
  return (
    <span
      className={cn(
        'grid shrink-0 place-items-center',
        'transition-[rotate,background-color,color] duration-500 ease-[var(--ease-brand)]',
        spin ? 'rotate-[135deg]' : 'rotate-45',
        className,
      )}
    >
      <span
        className={cn(
          'grid place-items-center transition-[rotate] duration-500 ease-[var(--ease-brand)]',
          spin ? '-rotate-[135deg]' : '-rotate-45',
        )}
      >
        {children}
      </span>
    </span>
  )
}
