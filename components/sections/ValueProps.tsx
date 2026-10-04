import { Reveal } from '@/components/motion/Reveal'
import { Media } from '@/components/ui/Media'
import type { ValuePropsSection } from '@/types/content'

export function ValueProps({ data }: { data: ValuePropsSection }) {
  return (
    <section className="container-page pt-section">
      <div className="grid gap-4 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h2 className="type-eyebrow max-w-md">{data.title}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="type-lead max-w-2xl text-ink">{data.description}</p>
        </Reveal>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-14 md:gap-6 lg:grid-cols-3 lg:gap-[3.625rem]">
        {data.items.map((item, index) => (
          <Reveal key={item.id} delay={0.24 + index * 0.12} className="h-full">
            <li className="flex h-full flex-col overflow-hidden rounded-card bg-white/55">
              <div className="relative">
                <Media
                  asset={item.image}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3] w-full"
                />
                {/* Keeps the centred title legible over any crop. */}
                <div aria-hidden className="absolute inset-0 bg-ink/30" />
                <h3 className="type-display absolute inset-0 grid place-items-center px-5 text-center text-[clamp(1.4rem,4.5vw,3rem)] text-sand">
                  {item.title}
                </h3>
              </div>

              <p className="type-body p-5 md:p-6">{item.body}</p>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
