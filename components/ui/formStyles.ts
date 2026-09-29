import { cn } from '@/lib/utils/cn'

/** White field, 6px radius, stone hairline — shared by every input and textarea. */
export const fieldClass = cn(
  'w-full rounded-field border border-stone bg-white px-4.5 text-lg text-ink',
  'placeholder:text-ink transition-[border-color] duration-300 focus:border-ink focus:outline-none',
)

/** Solid flame button — every submit and card CTA. */
export const buttonClass = cn(
  'inline-grid shrink-0 place-items-center rounded-field bg-flame px-6 text-lg text-sand',
  'transition-colors duration-300 hover:bg-ink disabled:opacity-60',
)
