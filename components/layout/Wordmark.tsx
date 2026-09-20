import Image from 'next/image'

import { cn } from '@/lib/utils/cn'

/**
 * The header lockup: Qatar Olympic Committee, the DOHA bid wordmark and Qatar
 * Paralympic Committee, shipped as a single SVG. Width is capped so it never
 * crowds the nav on a phone.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="Doha — aspiring to welcome the Olympic and Paralympic Games"
      width={341}
      height={102}
      priority
      className={cn('h-auto w-[clamp(8.5rem,26vw,21rem)]', className)}
    />
  )
}
