import { Reveal } from '@/components/motion/Reveal'
import { buttonClass } from '@/components/ui/formStyles'
import { cn } from '@/lib/utils/cn'
import type { LegalPage } from '@/types/content'

/** Two-digit section number: 01, 02 … */
const pad = (index: number) => String(index + 1).padStart(2, '0')

/**
 * Legal notices, privacy, transparency: title and intro, numbered sections in
 * two columns divided by stone rules, and a help card that opens the contact
 * modal.
 */
export function LegalContent({ data }: { data: LegalPage }) {
  return (
    // The header rule of the design, full-bleed under the site header.
    <article className="border-t border-stone">
      <div className="container-page pt-16 pb-16 md:pt-20 md:pb-24">
        <header className="grid gap-6 md:grid-cols-2 md:gap-16">
          <Reveal>
            {/* 92px at the 1440 artboard. */}
            <h1 className="type-display text-[clamp(3rem,6.4vw,5.75rem)]">
              {data.title.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-xl text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.65] md:pt-4">{data.intro}</p>
          </Reveal>
        </header>

        <ol className="mt-12 border-t border-ink md:mt-20">
          {data.sections.map((section, index) => (
            <li key={section.id} id={section.id} className="border-b border-stone">
              <Reveal
                offset={24}
                className="grid gap-3 pt-10 pb-9 md:pt-14 md:pb-12 lg:grid-cols-[31.25rem_1fr] lg:gap-0"
              >
                <h2 className="text-[clamp(1.25rem,1.8vw,1.625rem)] leading-tight font-bold">
                  {pad(index)} — {section.title}
                </h2>
                <div className="max-w-[47rem] text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.65]">
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal
          offset={24}
          className="mt-14 flex flex-col gap-6 rounded-card bg-white px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-14 sm:py-10 md:mt-[4.5rem]"
        >
          <div>
            <h2 className="text-[clamp(1.25rem,1.8vw,1.625rem)] leading-tight font-bold uppercase">
              {data.help.title}
            </h2>
            <p className="mt-2 text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.65]">{data.help.body}</p>
          </div>
          {/* `#contact` opens the contact modal — see ModalHost. */}
          <a href="#contact" className={cn(buttonClass, 'h-13 w-45')}>
            {data.help.cta}
          </a>
        </Reveal>
      </div>
    </article>
  )
}
