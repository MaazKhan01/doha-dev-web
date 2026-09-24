/**
 * Every GraphQL query the site sends to the CMS (WPGraphQL), each paired with
 * the variables it runs with.
 *
 * Components never import this file. The loaders in `lib/cms/` run these on
 * the server, map the response to the types in `types/content.ts`, and pass
 * typed props down — see `lib/cms/site.ts` and `lib/cms/home.ts`.
 *
 * Page-builder layouts are matched by `__typename` in `lib/cms/mappers.ts`.
 * Adding a layout here means adding its mapper there.
 *
 * @typedef {import('./client').CmsQuery} CmsQuery
 */

/** Logo and navigation. Global, so it takes no variables. */
/** @type {CmsQuery} */
export const HEADER_QUERY = {
  query: /* GraphQL */ `
    query HeaderQuery {
      header {
        headerFields {
          logoAr {
            node {
              filePath
              fileSize
              mediaItemId
              mediaItemUrl
              mediaType
              altText
              uri
              title
            }
          }
          logoEn {
            node {
              file
              filePath
              link
              mediaItemUrl
              uri
              title
            }
          }
          menus {
            labelAr
            labelEn
            urlAr
            urlEn
            subMenus {
              urlEn
              urlAr
              labelEn
              labelAr
              fieldGroupName
            }
          }
        }
      }
    }
  `,
  variables: {},
}

/** Footer band, CTA, socials, legal links and copyright. Global, so it takes no variables. */
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
          foregroundMediaEn {
            node {
              mediaItemUrl
              altText
            }
          }
          foregroundMediaAr {
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
      }
    }
  `,
  variables: {},
}

/**
 * The home page and its page-builder components, in the order editors
 * arranged them. The query is page-agnostic — another page reuses it with its
 * own `uri`: `{ ...HOMEPAGE_QUERY, variables: { uri: '/about' } }`.
 */
/** @type {CmsQuery} */
export const HOMEPAGE_QUERY = {
  query: /* GraphQL */ `
    query GetHomepageContent($uri: ID!) {
      page(id: $uri, idType: URI) {
        id
        title
        slug
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
                  sourceUrl
                }
              }
              backgroundMediaImagevideoAr {
                node {
                  mediaItemUrl
                  mimeType
                  sourceUrl
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
              bannerText
              bannerTextAr
            }
            ... on PageBuilderPageComponentsValuePropositionGridLayout {
              cardsGridSectionTitle
              cardsGridSectionTitleArabic
              cardsGridSectionSubtitleDescription
              cardsGridSectionSubtitleDescriptionArabic
              cardsGridFeatureCards {
                cardTitle
                cardTitleAr
                cardImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
                cardImageAr {
                  node {
                    sourceUrl
                    altText
                  }
                }
                cardDescription
                cardDescriptionAr
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
                    sourceUrl
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
  `,
  variables: { uri: '/home' },
}
