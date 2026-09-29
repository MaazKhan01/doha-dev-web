/**
 * The shape every section renders against.
 *
 * Static content in `content/` and the CMS loaders in `lib/cms/` both resolve
 * to these types, so swapping the data source never touches a component.
 */

export interface MediaAsset {
  /** Public path or absolute CMS URL. Empty string renders a placeholder. */
  src: string
  alt: string
}

export interface VideoAsset extends MediaAsset {
  poster: string
}

/** A display heading is authored line by line so the accent colour is data, not markup. */
export interface HeadingLine {
  text: string
  accent?: boolean
}

export interface LinkItem {
  label: string
  href: string
}

export interface NavItem extends LinkItem {
  children: LinkItem[]
}

export interface HeaderSection {
  /** Empty `src` falls back to the bundled `/logo.svg` lockup. */
  logo: MediaAsset
  menus: NavItem[]
}

export interface HeroSection {
  heading: HeadingLine[]
  video: VideoAsset
}

export interface IntroSection {
  heading: HeadingLine[]
  paragraphs: string[]
  /** Signs off the intro copy. */
  attribution?: {
    name: string
    role: string
    href?: string
  }
}

export interface StatementSection {
  heading: HeadingLine[]
}

export interface ValuePropItem {
  id: string
  title: string
  body: string
  image: MediaAsset
}

export interface ValuePropsSection {
  title: string
  description: string
  items: ValuePropItem[]
}

export interface CommitteeMember {
  id: string
  role: string
  name: string
  image: MediaAsset
}

export interface CommitteeSection {
  title: string
  description: string
  members: CommitteeMember[]
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface FaqSection {
  title: string
  items: FaqItem[]
}

export interface SocialLink {
  id: 'instagram' | 'facebook' | 'tiktok' | 'x'
  label: string
  href: string
}

export interface FooterSection {
  newsletter: {
    label: string
    cta: string
    /** When set, the CTA links out instead of opening the newsletter modal. */
    href?: string
  }
  socials: SocialLink[]
  wordmark: string[]
  copyright: string
  links: LinkItem[]
  media: {
    backdrop: MediaAsset
    inset: MediaAsset
  }
}

export interface SiteChrome {
  skipToContent: string
}

/** Copy shared by every form: status lines and the dialog's close button. */
export interface FormCopy {
  submit: string
  submitting: string
  success: string
  error: string
  close: string
}

export interface NewsletterModalContent extends FormCopy {
  eyebrow: string
  heading: string[]
  body: string
  emailLabel: string
  emailPlaceholder: string
  consent: string
}

export interface ContactModalContent extends FormCopy {
  eyebrow: string
  heading: string[]
  body: string
  fields: {
    name: { label: string; placeholder: string }
    email: { label: string; placeholder: string }
    subject: { label: string; placeholder: string }
    message: { label: string; placeholder: string }
  }
  /** Sits beside the submit button, e.g. the reply-time promise. */
  note: string
}

export interface SiteModals {
  newsletter: NewsletterModalContent
  contact: ContactModalContent
}

/** The ids a link can target to open a modal: `href="#contact"`, `href="#newsletter"`. */
export type ModalId = keyof SiteModals

export interface LegalSection {
  id: string
  title: string
  paragraphs: string[]
}

export interface LegalPage {
  slug: string
  meta: { title: string; description: string }
  title: string[]
  intro: string
  sections: LegalSection[]
  help: {
    title: string
    body: string
    cta: string
  }
}

/** Every section the page builder can render, keyed by the prop it takes. */
export interface SectionDataMap {
  hero: HeroSection
  intro: IntroSection
  statement: StatementSection
  valueProps: ValuePropsSection
  committee: CommitteeSection
  faq: FaqSection
}

export type SectionType = keyof SectionDataMap

/** One band of a page, in the order the CMS lists it. */
export type PageSection = {
  [K in SectionType]: { id: string; type: K; data: SectionDataMap[K] }
}[SectionType]

/** Shared by every page: rendered by the locale layout. */
export interface SiteContent {
  meta: {
    title: string
    description: string
  }
  chrome: SiteChrome
  header: HeaderSection
  footer: FooterSection
  modals: SiteModals
}

export interface HomeContent {
  sections: PageSection[]
}

/**
 * The static copy in `content/`, authored section by section in the design's
 * default order. It is what renders while the CMS is unset or unreachable, and
 * the source for values the CMS does not model (alt text, placeholders, socials).
 */
export type StaticContent = SiteContent & SectionDataMap
