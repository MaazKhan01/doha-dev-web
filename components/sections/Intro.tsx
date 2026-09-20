import { Reveal } from '@/components/motion/Reveal'
import { DisplayHeading } from '@/components/ui/DisplayHeading'
import type { IntroSection } from '@/types/content'

export function Intro({ data }: { data: IntroSection }) {
  return (
    <section className="container-page pt-section">
      <div className="grid gap-8 md:grid-cols-2 md:gap-16">
        <Reveal>
          {/* 64px at full width, scaling down rather than wrapping awkwardly. */}
          <DisplayHeading lines={data.heading} className="text-[clamp(2.25rem,6.5vw,4rem)]" />
        </Reveal>

        <div className="type-lead flex flex-col gap-6">
          {data.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={0.1 + index * 0.1} offset={28}>
              <p className="max-w-2xl">{paragraph}</p>
            </Reveal>
          ))}

          {data.attribution && (
            <Reveal delay={0.1 + data.paragraphs.length * 0.1} offset={28}>
              <p className="max-w-2xl text-sm leading-snug text-flame">
                <span className="block">{data.attribution.name}</span>
                <span className="block">{data.attribution.role}</span>
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
