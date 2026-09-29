import Link from 'next/link'

import { Reveal } from '@/components/motion/Reveal'
import { Diamond } from '@/components/ui/Diamond'
import { Media } from '@/components/ui/Media'
import { SocialIcon } from '@/components/ui/SocialIcon'
import type { FooterSection } from '@/types/content'

type FooterProps = {
  data: FooterSection
  /** `bar` is the legal pages' footer: the copyright strip alone. */
  variant?: 'full' | 'bar'
}

export function Footer({ data, variant = 'full' }: FooterProps) {
  if (variant === 'bar') {
    return (
      <footer>
        <FooterBar data={data} />
      </footer>
    )
  }

  return (
    <footer
      // No `id="contact"`: that hash opens the contact modal, and an anchor
      // here would make a `/en#contact` deep link jump the page to the footer.
      // Desktop matches the design's 1440 × 907.58 band (63.03% of width),
      // capped so it stops growing past the 1440 artboard.
      className="relative isolate flex min-h-[32rem] flex-col overflow-hidden bg-ink text-sand lg:min-h-[min(63.03vw,56.75rem)]"
    >
      <Media asset={data.media.backdrop} className="absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/45" />

      <div className="container-page flex flex-1 flex-col justify-between gap-12 py-8 md:gap-16 md:py-12">
        <div className="flex flex-row items-start justify-between gap-6">
          <Reveal offset={24}>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-sand/90">{data.newsletter.label}</p>
              {/* `#newsletter` opens the modal (see ModalHost); a CMS URL links out instead. */}
              <a
                href={data.newsletter.href || '#newsletter'}
                className="grid h-9 w-fit place-items-center rounded-md bg-sand px-4 text-sm text-ink transition-colors duration-300 hover:bg-flame hover:text-sand"
              >
                {data.newsletter.cta}
              </a>
            </div>
          </Reveal>

          <Reveal offset={24} delay={0.1}>
            <ul className="flex items-center gap-3 text-sm md:gap-4 md:text-base">
              {data.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid cursor-pointer place-items-center p-1"
                  >
                    <Diamond className="size-7 bg-sand text-ink group-hover:bg-flame group-hover:text-sand md:size-8">
                      <SocialIcon id={social.id} />
                    </Diamond>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <p className="type-display text-[clamp(2.25rem,8vw,4rem)] text-sand">
            {data.wordmark.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </p>
        </Reveal>
      </div>

      {/* Solid bar at every width, so the legal links never sit on the image. */}
      <FooterBar data={data} />
    </footer>
  )
}

function FooterBar({ data }: { data: FooterSection }) {
  return (
    <div className="bg-ink">
      <div className="container-page flex flex-col items-center gap-1.5 py-4 text-base text-sand/80 sm:flex-row sm:justify-between sm:py-5">
        <p>{data.copyright}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          {data.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="cursor-pointer transition-colors duration-300 hover:text-flame"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
