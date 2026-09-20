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
    placeholder: string
    cta: string
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
  contactLabel: string
  skipToContent: string
}

export interface HomeContent {
  meta: {
    title: string
    description: string
  }
  chrome: SiteChrome
  hero: HeroSection
  intro: IntroSection
  statement: StatementSection
  valueProps: ValuePropsSection
  committee: CommitteeSection
  faq: FaqSection
  footer: FooterSection
}
