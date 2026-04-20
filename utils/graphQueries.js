// GraphQL Queries for QOC-UCMS
import { gql } from "@apollo/client";

export const PAGES_QUERY = `query PAGES_QUERY($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    flexibleContent {
      component {
        __typename
      }
    }
  }
}`;

export const HEADER = `query GetHeader {
  header {
    headerFields {
      logoEn {
        node {
          sourceUrl

          filePath
          altText
        }
      }
      logoAr {
        node {
          sourceUrl
          altText
        }
      }
      menus {
        connectTo
        nameEn
        nameAr
        urlEn
        urlAr
        subMenuDropdown
        subMenu {
          connectTo
          nameEn
          nameAr
          urlEn
          urlAr
        }
      }
      socialIcons {
        icon {
          node {
            mediaItemUrl
          }
        }
        link
        title
      }
    }
  }
}`;

export const ABOUT_QATAR = `query GetAboutQatar($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    flexibleContent {
      component {
        ... on FlexibleContentComponentGuideSectionLayout {
          sectionTitleEn
          sectionTitleAr
          guideRelation {
            nodes {
              __typename
              id
              uri
              ... on Guide {
                title
                guideContent {
                  steps {
                    descEn
                    headingEn
                    imageEn {
                      node {
                        filePath
                        mediaItemUrl
                      }
                    }
                  }
                  fieldGroupName
                }
              }
            }
          }
        }
      }
    }
  }
}`;

// Specific component queries
export const HERO_BANNER_QUERY = `query GetHeroBanner($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    flexibleContent {
      component {
        ... on FlexibleContentComponentVideoBannerSectionLayout {
          fieldGroupName
          videoUrlDesktop {
            node {
              filePath
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}`;

export const CONTENT_SECTION_QUERY = `query GetContentSection($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    flexibleContent {
      component {
        ... on FlexibleContentComponentContentSectionLayout {
          fieldGroupName
          headingEn
          backgroundImageEn {
            node {
              id
              sourceUrl
            }
          }
          theContentEn
          subheadingEn
          popoutContent {
            headingEn
            contentEn
            fieldGroupName
          }
          buttonEn {
            link
            textColor
            title
            fieldGroupName
            backgroundColor
          }
        }
      }
    }
  }
}`;

export const CALL_TO_ACTION_QUERY = `query GetCTA($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    flexibleContent {
      component {
        ... on FlexibleContentComponentCallToActionLayout {
          descriptionEn
          backgroundImageEn {
            node {
              filePath
              mediaItemUrl
            }
          }
          ctaLinkEn {
            title
            backgroundColor
            fieldGroupName
            link
            textColor
          }
          fieldGroupName
          headingAr
          headingEn
        }
      }
    }
  }
}`;

export const CONTENT_GRID_QUERY = `query GetContentGrid($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    flexibleContent {
      component {
        ... on FlexibleContentComponentPressReleaseSectionLayout {
          fieldGroupName
          sectionDescriptionAr
          pressReleaseSelection {
            nodes {
              contentTypeName
              uri
              contentType {
                node {
                  id
                }
              }
              ... on PressRelease {
                id
                contentTypeName
                uri
                title
                slug
                pressReleaseContent {
                  backgroundImageAr {
                    node {
                      link
                      mediaItemUrl
                    }
                  }
                  buttonAr {
                    textColor
                    title
                    link
                    fieldGroupName
                    backgroundColor
                  }
                  buttonEn {
                    backgroundColor
                    fieldGroupName
                    link
                    textColor
                    title
                  }
                  callPopout
                  fieldGroupName
                  headingAr
                  headingEn
                  imageEn {
                    node {
                      filePath
                      mediaItemUrl
                    }
                  }
                  popoutContent {
                    contentAr
                    contentEn
                    fieldGroupName
                    headingAr
                    headingEn
                    image {
                      node {
                        mediaItemUrl
                        filePath
                      }
                    }
                    imageAr {
                      node {
                        filePath
                        mediaItemUrl
                      }
                    }
                  }
                }
                pressReleaseId
              }
            }
          }
          sectionDescriptionEn
          sectionHeadingAr
          sectionHeadingEn
        }
      }
    }
  }
}`;

export const TABS_CONTENT_QUERY = `query GetTabsContent($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    flexibleContent {
      component {
        ... on FlexibleContentComponentTabsContentLayout {
          titleEn
          tabs {
            labelEn
            contentEn
            imageEn {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
}`;

export const MEDIA_GRID_QUERY = `query GetMediaGrid($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    flexibleContent {
      component {
        ... on FlexibleContentComponentMediaGridLayout {
          titleEn
          images {
            imageEn {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  }
}`;
export const FOOTER = `query GetFooter {
  footer {
    footerFields {
      footerText
      footerTextAr
      footerLinks {
        textEn
        textAr
        urlEn
        urlAr
      }
    }
  }
}`

  // ... on FlexibleContentComponentContentSection2Layout {
  //         fieldGroupName
  //         headingAr
  //         backgroundImageEn {
  //           node {
  //             filePath
  //             mediaItemUrl
  //           }
  //         }
  //         buttonEn {
  //           title
  //           textColor
  //           link
  //           fieldGroupName
  //           backgroundColor
  //         }
  //         headingEn
  //         imageEn {
  //           node {
  //             mediaItemUrl
  //           }
  //         }
  //         theContentEn
  //         theContentAr
  //       }
  //     }

export const CONTENT_SECTION_2_QUERY = `query GetContentSection2($id: ID!) {
  page(id: $id, idType: DATABASE_ID) {
    flexibleContent {
      component {
        ... on FlexibleContentComponentContentSection2Layout {
          fieldGroupName
          headingAr
          backgroundImageEn {
            node {
              filePath
              mediaItemUrl
            }
          }
          buttonEn {
            title
            textColor
            link
            fieldGroupName
            backgroundColor
          }
          headingEn
          imageEn {
            node {
              mediaItemUrl
              filePath
            }
          }
          theContentEn
          theContentAr
        }
      }
    }
  }
}`