import { Reveal } from '@/components/motion/Reveal'
import { Media } from '@/components/ui/Media'
import type { HeroSection } from '@/types/content'

export function Hero({ data }: { data: HeroSection }) {
  return (
    <section className="container-page">
      <Reveal offset={24} className="relative overflow-hidden rounded-card">
        {data.video.src ? (
          <video
            className="aspect-[4/5] w-full object-cover sm:aspect-[3/2] lg:aspect-[16/9]"
            src={data.video.src}
            poster={data.video.poster || undefined}
            autoPlay
            muted
            loop
            playsInline
            aria-label={data.video.alt}
          />
        ) : (
          <Media
            asset={{ src: data.video.poster, alt: data.video.alt }}
            priority
            className="aspect-[4/5] w-full sm:aspect-[3/2] lg:aspect-[16/9]"
          />
        )}

        {/* Keeps the centred sand heading legible over any frame of footage. */}
        <div aria-hidden className="absolute inset-0 bg-ink/25" />

        <div className="absolute inset-0 grid place-items-center px-6 md:px-16">
          <h1 className="type-display text-center text-[clamp(2.25rem,8vw,6rem)] text-sand">
            {data.heading.map((line, index) => (
              <Reveal key={index} delay={0.15 + index * 0.12} offset={32}>
                <span className="block">{line.text}</span>
              </Reveal>
            ))}
          </h1>
        </div>
      </Reveal>
    </section>
  )
}
