/**
 * Raw WPGraphQL responses for the queries in `lib/cms/graphQlQueries.js`.
 *
 * These describe the CMS, not the site: only `lib/cms/mappers.ts` reads them,
 * and it turns them into the types in `types/content.ts`. Every field is
 * optional because WPGraphQL returns `null` for anything an editor left empty.
 */

type Maybe<T> = T | null | undefined

export interface CmsMediaNode {
  mediaItemUrl?: Maybe<string>
  sourceUrl?: Maybe<string>
  mimeType?: Maybe<string>
  altText?: Maybe<string>
  title?: Maybe<string>
}

/** ACF media fields come wrapped in an edge: `{ node { … } }`. */
export type CmsMedia = Maybe<{ node?: Maybe<CmsMediaNode> }>

// ─── Header ──────────────────────────────────────────────────────────────────

export interface CmsMenuLink {
  labelEn?: Maybe<string>
  labelAr?: Maybe<string>
  urlEn?: Maybe<string>
  urlAr?: Maybe<string>
}

export interface CmsMenu extends CmsMenuLink {
  /** Editors' switch for the sub-menu; when off, `subMenus` is ignored. */
  subMenuRequired?: Maybe<boolean>
  subMenus?: Maybe<Maybe<CmsMenuLink>[]>
}

export interface CmsContactModalFields {
  title?: Maybe<string>
  titleAr?: Maybe<string>
  subtitle?: Maybe<string>
  subtitleAr?: Maybe<string>
  submitButtonLabel?: Maybe<string>
  submitButtonLabelAr?: Maybe<string>
  footerNote?: Maybe<string>
  footerNoteAr?: Maybe<string>
}

export interface CmsHeaderQuery {
  header?: Maybe<{
    contactModalFields?: Maybe<CmsContactModalFields>
    headerFields?: Maybe<{
      logoEn?: CmsMedia
      logoAr?: CmsMedia
      menus?: Maybe<Maybe<CmsMenu>[]>
    }>
  }>
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface CmsButton {
  buttonLabel?: Maybe<string>
  buttonLink?: Maybe<string>
}

export interface CmsSocial {
  /** An ACF select, so WPGraphQL returns it as a list: `["instagram"]`. Normalised in the mapper. */
  platform?: Maybe<string | Maybe<string>[]>
  urlEn?: Maybe<string>
  urlAr?: Maybe<string>
}

export interface CmsFooterLink {
  footerLink?: Maybe<{
    footerLinkText?: Maybe<string>
    footerLinkLink?: Maybe<string>
  }>
  /** Note the Arabic URL field is `footerLinkLinkAr`, not `footerLinkLink`. */
  footerLinkAr?: Maybe<{
    footerLinkText?: Maybe<string>
    footerLinkLinkAr?: Maybe<string>
  }>
}

export interface CmsNewsletterModalFields {
  badgeLabel?: Maybe<string>
  badgeLabelAr?: Maybe<string>
  title?: Maybe<string>
  titleAr?: Maybe<string>
  description?: Maybe<string>
  descriptionAr?: Maybe<string>
  buttonLabel?: Maybe<string>
  buttonLabelAr?: Maybe<string>
  consentText?: Maybe<string>
  consentTextAr?: Maybe<string>
}

export interface CmsFooterQuery {
  footer?: Maybe<{
    newsletterModalFields?: Maybe<CmsNewsletterModalFields>
    footerFields?: Maybe<{
      headlineEn?: Maybe<string>
      headlineAr?: Maybe<string>
      callToAction?: Maybe<{
        ctaLabel?: Maybe<string>
        ctaLabelAr?: Maybe<string>
        ctaButton?: Maybe<CmsButton>
        ctaButtonAr?: Maybe<CmsButton>
      }>
      backgroundMediaEn?: CmsMedia
      backgroundMediaAr?: CmsMedia
      socials?: Maybe<Maybe<CmsSocial>[]>
      copyrightText?: Maybe<string>
      copyrightTextAr?: Maybe<string>
      footerLinks?: Maybe<Maybe<CmsFooterLink>[]>
    }>
  }>
}

// ─── Legal pages ─────────────────────────────────────────────────────────────

export interface CmsLegalSection {
  /** Editor-supplied, e.g. "01". */
  sectionNumber?: Maybe<string>
  sectionTitle?: Maybe<string>
  sectionTitleAr?: Maybe<string>
  /** WYSIWYG HTML. */
  sectionContent?: Maybe<string>
  sectionContentAr?: Maybe<string>
}

export interface CmsLegalNoticesFields {
  mainTitle?: Maybe<string>
  mainTitleAr?: Maybe<string>
  topNoticeText?: Maybe<string>
  topNoticeTextAr?: Maybe<string>
  legalSections?: Maybe<Maybe<CmsLegalSection>[]>
  ctaBannerTitle?: Maybe<string>
  ctaBannerTitleAr?: Maybe<string>
  ctaBannerSubtitle?: Maybe<string>
  ctaBannerSubtitleAr?: Maybe<string>
  ctaButtonLabel?: Maybe<string>
  ctaButtonLabelAr?: Maybe<string>
}

export interface CmsLegalPageQuery {
  pageBy?: Maybe<{
    uri?: Maybe<string>
    slug?: Maybe<string>
    title?: Maybe<string>
    status?: Maybe<string>
    /** Only `Template_LegalNotices` carries the fields; others arrive with just `__typename`. */
    template?: Maybe<{
      __typename?: string
      templateName?: Maybe<string>
      legalNoticesPageFields?: Maybe<CmsLegalNoticesFields>
    }>
  }>
}

// ─── Page builder ────────────────────────────────────────────────────────────

export interface CmsHeroBanner {
  __typename: 'PageBuilderPageComponentsHeroBannerLayout'
  heroHeading?: Maybe<string>
  heroHeadingAr?: Maybe<string>
  heroBgMedia?: CmsMedia
  backgroundMediaImagevideoAr?: CmsMedia
}

export interface CmsSplitTitle {
  highlightText?: Maybe<string>
  normalText?: Maybe<string>
}

export interface CmsTextLink {
  text?: Maybe<string>
  link?: Maybe<string>
}

export interface CmsOverviewSection {
  __typename: 'PageBuilderPageComponentsOverviewSectionLayout'
  overviewSectionTitle?: Maybe<CmsSplitTitle>
  overviewSectionTitleAr?: Maybe<CmsSplitTitle>
  overviewSectionMainBodyContent?: Maybe<string>
  overviewSectionMainBodyContentArabic?: Maybe<string>
  overviewSectionHighlightLink?: Maybe<CmsTextLink>
  overviewSectionHighlightLinkAr?: Maybe<CmsTextLink>
}

export interface CmsCalloutBanner {
  __typename: 'PageBuilderPageComponentsCalloutBannerLayout'
  /** The accent line, e.g. "Why Doha". */
  bannerHeadline?: Maybe<string>
  bannerHeadlineArabic?: Maybe<string>
  /** A repeater, one row per line of the statement. */
  bannerText?: Maybe<Maybe<{ theBannerText?: Maybe<string> }>[]>
  bannerTextAr?: Maybe<Maybe<{ theBannerTextAr?: Maybe<string> }>[]>
}

export interface CmsFeatureCard {
  cardTitle?: Maybe<string>
  cardTitleAr?: Maybe<string>
  cardDescription?: Maybe<string>
  cardDescriptionAr?: Maybe<string>
  cardImage?: CmsMedia
  cardImageAr?: CmsMedia
}

export interface CmsValuePropositionGrid {
  __typename: 'PageBuilderPageComponentsValuePropositionGridLayout'
  cardsGridSectionTitle?: Maybe<string>
  cardsGridSectionTitleArabic?: Maybe<string>
  cardsGridSectionSubtitleDescription?: Maybe<string>
  cardsGridSectionSubtitleDescriptionArabic?: Maybe<string>
  cardsGridFeatureCards?: Maybe<Maybe<CmsFeatureCard>[]>
}

export interface CmsCommitteeMember {
  name?: Maybe<string>
  nameAr?: Maybe<string>
  role?: Maybe<string>
  roleAr?: Maybe<string>
  photo?: CmsMedia
}

export interface CmsCommitteeSection {
  __typename: 'PageBuilderPageComponentsCommitteeSectionLayout'
  sectionTitle?: Maybe<string>
  sectionTitleAr?: Maybe<string>
  sectionDescription?: Maybe<string>
  sectionDescriptionAr?: Maybe<string>
  manualMembers?: Maybe<Maybe<CmsCommitteeMember>[]>
}

export interface CmsFaqPost {
  id?: Maybe<string>
  title?: Maybe<string>
  faqItemDetails?: Maybe<{
    faqQuestion?: Maybe<string>
    faqQuestionAr?: Maybe<string>
    faqAnswer?: Maybe<string>
    faqAnswerAr?: Maybe<string>
  }>
}

export interface CmsFaqSection {
  __typename: 'PageBuilderPageComponentsFaqSectionLayout'
  sectionTitle?: Maybe<string>
  sectionTitleAr?: Maybe<string>
  faqPosts?: Maybe<{ nodes?: Maybe<Maybe<CmsFaqPost>[]> }>
}

export type CmsPageComponent =
  | CmsHeroBanner
  | CmsOverviewSection
  | CmsCalloutBanner
  | CmsValuePropositionGrid
  | CmsCommitteeSection
  | CmsFaqSection

export type CmsPageComponentTypename = CmsPageComponent['__typename']

export interface CmsPageQuery {
  page?: Maybe<{
    id?: Maybe<string>
    title?: Maybe<string>
    slug?: Maybe<string>
    pageBuilder?: Maybe<{
      slug?: Maybe<string>
      /** Layouts this build does not know arrive with only `__typename`. */
      pageComponents?: Maybe<Maybe<CmsPageComponent | { __typename: string }>[]>
    }>
  }>
}
