/**
 * Every GraphQL query the site sends to the CMS (WPGraphQL), each paired with
 * the variables it runs with.
 *
 * Components never import this file. The loaders in `lib/cms/` run these on
 * the server, map the response to the types in `types/content.ts`, and pass
 * typed props down — see `lib/cms/site.ts` and `lib/cms/home.ts`.
 *
 * Page-builder layouts are matched by `__typename` in `lib/cms/mappers.ts`, so
 * every `pageComponents` selection must keep `__typename`. Adding a layout
 * here means adding its mapper there.
 *
 * @typedef {import('./client').CmsQuery} CmsQuery
 */

/**
 * Logo, navigation and the contact modal's copy, in one request (the CMS also
 * exposes the modal copy as its own query; folding it in saves a round trip).
 * Global, so it takes no variables.
 */
/** @type {CmsQuery} */
export const HEADER_QUERY = {
  query: /* GraphQL */ `
    query GetHeader {
      header {
        headerFields {
          logoEn {
            node {
              mediaItemUrl
              altText
            }
          }
          logoAr {
            node {
              mediaItemUrl
              altText
            }
          }
          menus {
            labelEn
            labelAr
            urlEn
            urlAr
            subMenuRequired
            subMenus {
              labelEn
              labelAr
              urlEn
              urlAr
            }
          }
        }
        contactModalFields {
          title
          titleAr
          subtitle
          subtitleAr
          submitButtonLabel
          submitButtonLabelAr
          footerNote
          footerNoteAr
        }
      }
    }
  `,
  variables: {},
}

/**
 * Footer band, CTA, socials, legal links, copyright and the newsletter modal's
 * copy, in one request. Global, so it takes no variables.
 */
/** @type {CmsQuery} */
export const FOOTER_QUERY = {
  query: /* GraphQL */ `
    query GetFooter {
      footer {
        footerFields {
          headlineEn
          headlineAr
          callToAction {
            ctaLabel
            ctaLabelAr
            ctaButton {
              buttonLabel
              buttonLink
            }
            ctaButtonAr {
              buttonLabel
              buttonLink
            }
          }
          backgroundMediaEn {
            node {
              mediaItemUrl
              altText
            }
          }
          backgroundMediaAr {
            node {
              mediaItemUrl
              altText
            }
          }
          socials {
            platform
            urlEn
            urlAr
          }
          copyrightText
          copyrightTextAr
          footerLinks {
            footerLink {
              footerLinkText
              footerLinkLink
            }
            footerLinkAr {
              footerLinkText
              footerLinkLinkAr
            }
          }
        }
        newsletterModalFields {
          badgeLabel
          badgeLabelAr
          title
          titleAr
          description
          descriptionAr
          buttonLabel
          buttonLabelAr
          consentText
          consentTextAr
        }
      }
    }
  `,
  variables: {},
}

/**
 * The home page's page-builder components, in the order editors arranged them.
 * The builder lives on the "Dynamic Sections" template. Page-agnostic — another
 * page on that template reuses it: `{ ...HOMEPAGE_QUERY, variables: { uri: 'about' } }`.
 */
/** @type {CmsQuery} */
export const HOMEPAGE_QUERY = {
  query: /* GraphQL */ `
    query GetHomepage($uri: String!) {
      pageBy(uri: $uri) {
        id
        uri
        title
        status
        template {
          __typename
          ... on Template_DynamicSections {
            templateName
            pageBuilder {
              slug
              pageComponents {
                __typename
                ... on PageBuilderPageComponentsHeroBannerLayout {
                  heroHeading
                  heroHeadingAr
                  heroBgMedia {
                    node {
                      mediaItemUrl
                      mimeType
                    }
                  }
                  heroBgMediaAr {
                    node {
                      mediaItemUrl
                      mimeType
                    }
                  }
                }
                ... on PageBuilderPageComponentsOverviewSectionLayout {
                  overviewSectionTitle {
                    highlightText
                    normalText
                  }
                  overviewSectionTitleAr {
                    highlightText
                    normalText
                  }
                  overviewSectionMainBodyContent
                  overviewSectionMainBodyContentArabic
                  overviewSectionHighlightLink {
                    text
                    link
                  }
                  overviewSectionHighlightLinkAr {
                    text
                    link
                  }
                }
                ... on PageBuilderPageComponentsCalloutBannerLayout {
                  bannerHeadline
                  bannerHeadlineArabic
                  bannerText {
                    theBannerText
                  }
                  bannerTextAr {
                    theBannerTextAr
                  }
                }
                ... on PageBuilderPageComponentsValuePropositionGridLayout {
                  cardsGridSectionTitle
                  cardsGridSectionTitleArabic
                  cardsGridSectionSubtitleDescription
                  cardsGridSectionSubtitleDescriptionArabic
                  cardsGridFeatureCards {
                    cardTitle
                    cardTitleAr
                    cardDescription
                    cardDescriptionAr
                    cardImage {
                      node {
                        mediaItemUrl
                        altText
                      }
                    }
                    cardImageAr {
                      node {
                        mediaItemUrl
                        altText
                      }
                    }
                  }
                }
                ... on PageBuilderPageComponentsCommitteeSectionLayout {
                  sectionTitle
                  sectionTitleAr
                  sectionDescription
                  sectionDescriptionAr
                  manualMembers {
                    name
                    nameAr
                    role
                    roleAr
                    photo {
                      node {
                        mediaItemUrl
                        altText
                      }
                    }
                  }
                }
                ... on PageBuilderPageComponentsFaqSectionLayout {
                  sectionTitle
                  sectionTitleAr
                  faqPosts {
                    nodes {
                      ... on Faq {
                        id
                        faqId
                        title
                        faqItemDetails {
                          faqQuestion
                          faqQuestionAr
                          faqAnswer
                          faqAnswerAr
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
  variables: { uri: 'home' },
}

/**
 * A legal page (legal notices, privacy, transparency…) by slug. Only pages on
 * the "Legal Notices" template carry `legalNoticesPageFields`; any other
 * template comes back without them and the static copy is served instead.
 * Reuse per page: `{ ...LEGAL_PAGE_QUERY, variables: { uri: 'privacy' } }`.
 */
/** @type {CmsQuery} */
export const LEGAL_PAGE_QUERY = {
  query: /* GraphQL */ `
    query GetLegalPage($uri: ID!) {
      page(id: $uri, idType: URI) {
        uri
        slug
        title
        status
        template {
          __typename
          templateName
          ... on Template_LegalNotices {
            legalNoticesPageFields {
              mainTitle
              mainTitleAr
              topNoticeText
              topNoticeTextAr
              legalSections {
                sectionNumber
                sectionTitle
                sectionTitleAr
                sectionContent
                sectionContentAr
              }
              ctaBannerTitle
              ctaBannerTitleAr
              ctaBannerSubtitle
              ctaBannerSubtitleAr
              ctaButtonLabel
              ctaButtonLabelAr
            }
          }
        }
      }
    }
  `,
  variables: { uri: 'legal-notices' },
}
