import {
  pick,
  pickMedia,
  toHeadingLines,
  toLines,
  toMedia,
  toParagraphs,
  toPlainText,
} from '@/lib/cms/format'
import type { Locale } from '@/lib/i18n/config'
import type {
  CmsCalloutBanner,
  CmsCommitteeSection,
  CmsFaqSection,
  CmsFooterQuery,
  CmsHeaderQuery,
  CmsHeroBanner,
  CmsOverviewSection,
  CmsPageComponent,
  CmsPageComponentTypename,
  CmsPageQuery,
  CmsValuePropositionGrid,
} from '@/types/cms'
import type {
  CommitteeSection,
  FaqSection,
  FooterSection,
  HeaderSection,
  HeroSection,
  IntroSection,
  PageSection,
  SocialLink,
  StatementSection,
  StaticContent,
  ValuePropsSection,
} from '@/types/content'

/**
 * WPGraphQL response → `types/content.ts`. Pure functions: no fetching, no
 * React. `fallback` is the locale's static content, used only for values the
 * CMS does not model (alt text, placeholders, socials) — never to paper over a
 * field an editor deliberately left empty.
 */

type Ctx = { locale: Locale; fallback: StaticContent }

/** A section before it is given its position id. Distributes, so `type` still narrows `data`. */
type SectionPayload = PageSection extends infer S ? (S extends PageSection ? Omit<S, 'id'> : never) : never

const compact = <T>(list: (T | null | undefined)[] | null | undefined): T[] =>
  (list ?? []).filter((item): item is T => item != null)

// ─── Header / footer ─────────────────────────────────────────────────────────

export function mapHeader(raw: CmsHeaderQuery | null, { locale, fallback }: Ctx): HeaderSection {
  const fields = raw?.header?.headerFields
  if (!fields) return fallback.header

  const logo = pickMedia(locale, fields.logoEn, fields.logoAr)

  return {
    logo: toMedia(logo, toPlainText(logo?.node?.title) || fallback.header.logo.alt),
    menus: compact(fields.menus).flatMap((menu) => {
      const label = toPlainText(pick(locale, menu.labelEn, menu.labelAr))
      if (!label) return []
      return {
        label,
        href: pick(locale, menu.urlEn, menu.urlAr) || '#',
        children: compact(menu.subMenus).flatMap((sub) => {
          const subLabel = toPlainText(pick(locale, sub.labelEn, sub.labelAr))
          return subLabel ? { label: subLabel, href: pick(locale, sub.urlEn, sub.urlAr) || '#' } : []
        }),
      }
    }),
  }
}

export function mapFooter(raw: CmsFooterQuery | null, { locale, fallback }: Ctx): FooterSection {
  const fields = raw?.footer?.footerFields
  const base = fallback.footer
  if (!fields) return base

  const cta = fields.callToAction
  const en = cta?.ctaButton
  const ar = cta?.ctaButtonAr

  return {
    newsletter: {
      label: toPlainText(pick(locale, cta?.ctaLabel, cta?.ctaLabelAr)),
      placeholder: base.newsletter.placeholder,
      cta: toPlainText(pick(locale, en?.buttonLabel, ar?.buttonLabel)) || base.newsletter.cta,
      href: pick(locale, en?.buttonLink, ar?.buttonLink) || undefined,
    },
    socials: compact(fields.socials).flatMap((social) => {
      const id = toSocialId(social.platform)
      const href = pick(locale, social.urlEn, social.urlAr)
      if (!id || !href) return []
      return { id, href, label: base.socials.find((item) => item.id === id)?.label ?? id }
    }),
    wordmark: toLines(pick(locale, fields.headlineEn, fields.headlineAr)),
    copyright: toPlainText(pick(locale, fields.copyrightText, fields.copyrightTextAr)),
    links: compact(fields.footerLinks).flatMap((item) => {
      const label = toPlainText(
        pick(locale, item.footerLink?.footerLinkText, item.footerLinkAr?.footerLinkText),
      )
      if (!label) return []
      return {
        label,
        href: pick(locale, item.footerLink?.footerLinkLink, item.footerLinkAr?.footerLinkLinkAr) || '#',
      }
    }),
    media: {
      backdrop: toMedia(
        pickMedia(locale, fields.backgroundMediaEn, fields.backgroundMediaAr),
        base.media.backdrop.alt,
      ),
      inset: toMedia(
        pickMedia(locale, fields.foregroundMediaEn, fields.foregroundMediaAr),
        base.media.inset.alt,
      ),
    },
  }
}

/**
 * `platform` is free text in the CMS; only platforms with an icon render.
 * Accepts "Instagram", "instagram", "X", "Twitter", "X (Twitter)", "Tik Tok"…
 */
function toSocialId(platform: string | null | undefined): SocialLink['id'] | null {
  const key = (platform ?? '').toLowerCase().replace(/[^a-z]/g, '')
  if (key === 'x' || key.includes('twitter')) return 'x'
  if (key.startsWith('instagram')) return 'instagram'
  if (key.startsWith('facebook')) return 'facebook'
  if (key.startsWith('tiktok')) return 'tiktok'
  if (key && process.env.NODE_ENV !== 'production') {
    console.warn(`[cms] no icon for social platform "${platform}"; skipping`)
  }
  return null
}

// ─── Page-builder sections ───────────────────────────────────────────────────

function mapHero(raw: CmsHeroBanner, { locale, fallback }: Ctx): HeroSection {
  const media = pickMedia(locale, raw.heroBgMedia, raw.backgroundMediaImagevideoAr)
  const url = media?.node?.mediaItemUrl || media?.node?.sourceUrl || ''
  // One field takes either a video or a still; the still becomes the poster.
  const isVideo = media?.node?.mimeType?.startsWith('video/') ?? false

  return {
    heading: toHeadingLines(pick(locale, raw.heroHeading, raw.heroHeadingAr)),
    video: {
      src: isVideo ? url : '',
      poster: isVideo ? '' : url,
      alt: fallback.hero.video.alt,
    },
  }
}

function mapIntro(raw: CmsOverviewSection, { locale }: Ctx): IntroSection {
  const title = pick(locale, raw.overviewSectionTitle, raw.overviewSectionTitleAr)
  const link = pick(locale, raw.overviewSectionHighlightLink, raw.overviewSectionHighlightLinkAr)
  // Authored as "Name" on the first line and the role beneath it.
  const [name, ...role] = toLines(link?.text)

  return {
    heading: [
      ...toHeadingLines(title?.highlightText, true),
      ...toHeadingLines(title?.normalText),
    ],
    paragraphs: toParagraphs(
      pick(locale, raw.overviewSectionMainBodyContent, raw.overviewSectionMainBodyContentArabic),
    ),
    attribution: name
      ? { name, role: role.join(' '), href: link?.link || undefined }
      : undefined,
  }
}

function mapStatement(raw: CmsCalloutBanner, { locale }: Ctx): StatementSection {
  const heading = toHeadingLines(pick(locale, raw.bannerText, raw.bannerTextAr))
  // The design lights the question line; do that unless the editor bolded others.
  if (heading[0] && !heading.some((line) => line.accent)) heading[0] = { ...heading[0], accent: true }
  return { heading }
}

function mapValueProps(raw: CmsValuePropositionGrid, { locale }: Ctx): ValuePropsSection {
  return {
    title: toPlainText(pick(locale, raw.cardsGridSectionTitle, raw.cardsGridSectionTitleArabic)),
    description: toPlainText(
      pick(
        locale,
        raw.cardsGridSectionSubtitleDescription,
        raw.cardsGridSectionSubtitleDescriptionArabic,
      ),
    ),
    items: compact(raw.cardsGridFeatureCards).map((card, index) => {
      const title = toPlainText(pick(locale, card.cardTitle, card.cardTitleAr))
      return {
        id: `card-${index}`,
        title,
        body: toPlainText(pick(locale, card.cardDescription, card.cardDescriptionAr)),
        image: toMedia(pickMedia(locale, card.cardImage, card.cardImageAr), title),
      }
    }),
  }
}

function mapCommittee(raw: CmsCommitteeSection, { locale }: Ctx): CommitteeSection {
  return {
    title: toPlainText(pick(locale, raw.sectionTitle, raw.sectionTitleAr)),
    description: toPlainText(pick(locale, raw.sectionDescription, raw.sectionDescriptionAr)),
    members: compact(raw.manualMembers).map((member, index) => {
      const name = toPlainText(pick(locale, member.name, member.nameAr))
      return {
        id: `member-${index}`,
        role: toPlainText(pick(locale, member.role, member.roleAr)),
        name,
        image: toMedia(member.photo, name),
      }
    }),
  }
}

function mapFaq(raw: CmsFaqSection, { locale }: Ctx): FaqSection {
  return {
    title: toPlainText(pick(locale, raw.sectionTitle, raw.sectionTitleAr)),
    items: compact(raw.faqPosts?.nodes).flatMap((post, index) => {
      const details = post.faqItemDetails
      const question = toPlainText(pick(locale, details?.faqQuestion, details?.faqQuestionAr))
      if (!question) return []
      return {
        id: post.id || `faq-${index}`,
        question,
        answer: toPlainText(pick(locale, details?.faqAnswer, details?.faqAnswerAr)),
      }
    }),
  }
}

/**
 * `__typename` → section. This is the page builder's switch: add a layout by
 * adding its fragment to `graphQlQueries.js`, its raw type to `types/cms.ts`,
 * and an entry here. Rendering is `components/layout/PageBuilder.tsx`.
 */
const sectionMappers: {
  [T in CmsPageComponentTypename]: (
    raw: Extract<CmsPageComponent, { __typename: T }>,
    ctx: Ctx,
  ) => SectionPayload
} = {
  PageBuilderPageComponentsHeroBannerLayout: (raw, ctx) => ({ type: 'hero', data: mapHero(raw, ctx) }),
  PageBuilderPageComponentsOverviewSectionLayout: (raw, ctx) => ({ type: 'intro', data: mapIntro(raw, ctx) }),
  PageBuilderPageComponentsCalloutBannerLayout: (raw, ctx) => ({ type: 'statement', data: mapStatement(raw, ctx) }),
  PageBuilderPageComponentsValuePropositionGridLayout: (raw, ctx) => ({ type: 'valueProps', data: mapValueProps(raw, ctx) }),
  PageBuilderPageComponentsCommitteeSectionLayout: (raw, ctx) => ({ type: 'committee', data: mapCommittee(raw, ctx) }),
  PageBuilderPageComponentsFaqSectionLayout: (raw, ctx) => ({ type: 'faq', data: mapFaq(raw, ctx) }),
}

function isKnownComponent(component: { __typename: string }): component is CmsPageComponent {
  return component.__typename in sectionMappers
}

/**
 * The page's components, in the editor's order. Layouts this build does not
 * know are skipped (with a warning in development) rather than breaking the page.
 */
export function mapSections(raw: CmsPageQuery | null, ctx: Ctx): PageSection[] | null {
  const components = raw?.page?.pageBuilder?.pageComponents
  if (!components) return null

  return compact(components).flatMap((component, index) => {
    if (!isKnownComponent(component)) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[cms] no section mapped for ${component.__typename}; skipping`)
      }
      return []
    }

    // TS cannot correlate the union member with its mapper; the table's type guarantees it.
    const map = sectionMappers[component.__typename] as (raw: CmsPageComponent, ctx: Ctx) => SectionPayload

    return { ...map(component, ctx), id: `${component.__typename}-${index}` }
  })
}
