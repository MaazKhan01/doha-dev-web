import { ScrollLitHeading } from '@/components/motion/ScrollLitHeading'
import type { StatementSection } from '@/types/content'

/** The full-width centred "Why Doha?" statement that lights up as you scroll. */
export function Statement({ data }: { data: StatementSection }) {
  return (
    <section className="container-page pt-section">
      <ScrollLitHeading
        lines={data.heading}
        // 144px at the 1440 artboard.
        className="mx-auto max-w-6xl text-center text-[clamp(2.25rem,10vw,9rem)]"
      />
    </section>
  )
}
