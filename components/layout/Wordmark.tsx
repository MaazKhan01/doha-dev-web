import Image from 'next/image'

import { cn } from '@/lib/utils/cn'
import type { MediaAsset } from '@/types/content'

/**
 * The header lockup: Qatar Olympic Committee, the DOHA bid wordmark and Qatar
 * Paralympic Committee. Uses the CMS logo when one is uploaded, else the
 * bundled SVG. Width is capped so it never crowds the nav on a phone; height
 * follows the image's own ratio.
 */
export function Wordmark({ logo, className }: { logo: MediaAsset; className?: string }) {
  return (
    <Image
      src={logo.src || '/logo.svg'}
      alt={logo.alt}
      width={341}
      height={102}
      priority
      className={cn('h-auto w-[clamp(8.5rem,26vw,21rem)]', className)}
    />
  )
}
