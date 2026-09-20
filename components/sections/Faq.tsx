import { Reveal } from '@/components/motion/Reveal'
import { Accordion } from '@/components/ui/Accordion'
import type { FaqSection } from '@/types/content'

export function Faq({ data }: { data: FaqSection }) {
  return (
    <section id="faq" className="container-page pt-section pb-section">
      <Reveal>
        <h2 className="type-eyebrow max-w-xs">{data.title}</h2>
      </Reveal>

      <Reveal delay={0.12} className="mt-10">
        <Accordion items={data.items} />
      </Reveal>
    </section>
  )
}
