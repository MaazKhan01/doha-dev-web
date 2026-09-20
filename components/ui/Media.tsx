import Image from 'next/image'

import { cn } from '@/lib/utils/cn'
import type { MediaAsset } from '@/types/content'

type MediaProps = {
  asset: MediaAsset
  className?: string
  sizes?: string
  priority?: boolean
}

/**
 * Image slot that degrades to a labelled placeholder while the real assets are
 * still being exported from design. Every art-directed image on the site goes
 * through here so the fill/sizes behaviour stays consistent.
 */
export function Media({ asset, className, sizes = '100vw', priority = false }: MediaProps) {
  if (!asset.src) {
    return (
      <div
        role="img"
        aria-label={asset.alt}
        className={cn(
          'flex items-center justify-center bg-current/8 px-4 text-center',
          'outline-1 outline-dashed outline-current/20 -outline-offset-1',
          'text-[0.7rem] leading-snug tracking-wide text-current/45 uppercase',
          className,
        )}
      >
        {asset.alt}
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  )
}
