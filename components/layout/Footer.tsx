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
    // No `id="contact"`: that hash opens the contact modal, and an anchor here
    // would make a `/en#contact` deep link jump the page to the footer.
    <footer className="relative isolate flex flex-col overflow-hidden bg-ink text-sand">
      {/* The design's photo band (Figma 1:1460): 1440 × 907.58 at the artboard,
          scaling with the width and capped there. The photo is cropped from the
          top — its bottom edge stays put — and the bar below overlaps its last
          48.19px. On smaller screens it simply fills the band above the bar. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-full lg:h-[min(63.0261vw,56.7235rem)]">
        <Media asset={data.media.backdrop} position="object-bottom" className="size-full" />
        {/* #030303 at 30%, as drawn. */}
        <div aria-hidden className="absolute inset-0 bg-scrim/30" />
      </div>

      {/* 859.39px at 1440: the photo band less the bar's overlap. The footer's
          content sits 64px in (the rest of the site uses 62px), and the
          wordmark ends 51.36px above the bar — both as drawn. */}
      <div className="container-page flex min-h-[32rem] flex-1 flex-col justify-between gap-12 py-8 md:gap-16 md:py-12 lg:min-h-[min(59.6797vw,53.7119rem)] lg:px-16 lg:pb-[min(3.5667vw,3.21rem)]">
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
          {/* Figma 1:1595: Doha 2036 Bold 114px, line-height 80%, tracking 0,
              in a 566px column so the CMS's one-line headline wraps to three
              lines. Size and width scale together below 1440 to keep the same
              break. Latin only: Arabic keeps the taller line height its glyphs
              need (see .type-display in globals.css). */}
          <p className="type-display max-w-[min(39.3056vw,35.375rem)] text-[clamp(2.75rem,7.9167vw,7.125rem)] text-sand ltr:leading-[0.8] ltr:tracking-normal">
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
    // 108.10px tall at the artboard (Figma 1:1511).
    <div className="bg-ink lg:min-h-[6.7565rem]">
      <div className="container-page flex flex-col items-center gap-1.5 py-4 text-base text-sand/80 sm:flex-row sm:justify-between sm:py-5 lg:min-h-[6.7565rem] lg:px-16">
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
