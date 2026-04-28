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
    bannerSection {
        bannerBackgroundColorAr
        bannerBackgroundColorEn
        bannerTitleAr
        bannerTitleEn
        fieldGroupName
        bannerBackgroundImageEn {
          node {
            filePath
            mediaItemUrl
          }
        }
        bannerBackgroundImageAr {
          node {
            filePath
            mediaItemUrl
          }
        }
      }
      component {
        ... on FlexibleContentComponentVideoBannerSectionLayout {
          fieldGroupName
          videoUrlDesktop {
            node {
              filePath
              mediaItemUrl
            }
          }
          bannerTextEn
          bannerTextAr
          bannerImageEn {
            node {
              mediaItemUrl
              filePath
              sourceUrl
            }
          }
          bannerImageAr {
            node {
              filePath
              sourceUrl
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

          backgroundImageEn {
            node {
              id
              sourceUrl
            }
          }
                      headingEn
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
          backgroundImage2 {
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

// Gallery banner fragment (reused inside both gallery list queries)
const GALLERY_BANNER_FIELDS = `
  bannerSection {
    bannerTitleEn
    bannerTitleAr
    bannerBackgroundColorEn
    bannerBackgroundColorAr
    bannerBackgroundImageEn {
      node { mediaItemUrl }
    }
    bannerBackgroundImageAr {
      node { mediaItemUrl }
    }
  }
`;

export const VIDEO_GALLERY_QUERY = `query VideoGalleryQuery {
  page(id: "video-gallery", idType: URI) {
    id
    flexibleContent {
      ${GALLERY_BANNER_FIELDS}
      component {
        fieldGroupName
        ... on FlexibleContentComponentMediaGridLayout {
          fieldGroupName
          mediaType
          videoDetails {
            videoSourceType
            videoThumbnail {
              node {
                mediaItemUrl
              }
            }
            videoTitle
            videoUrl
            uploadVideo {
              node {
                mediaItemUrl
              }
            }
            postDate
          }
          sectionBackground {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}`;

export const IMAGE_GALLERY_LIST_QUERY = `query ImageGalleryListQuery {
  page(id: "image-gallery", idType: URI) {
    id
    flexibleContent {
      ${GALLERY_BANNER_FIELDS}
      component {
        fieldGroupName
        ... on FlexibleContentComponentMediaGridLayout {
          fieldGroupName
          mediaType
          imageDetails {
            nodes {
              uri
              ... on ImageGallery {
                id
                imageGalleryContent {
                  heading
                  photoCount
                  
                  imageGallery {
                    nodes {
                      sourceUrl
                      mediaItemUrl
                      date
                    }
                  }
                  bannerSection {
                    bannerTitleEn
                    bannerTitleAr
                    bannerBackgroundImageEn {
                      node { mediaItemUrl }
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
}`;

export const IMAGE_GALLERY_DETAIL_QUERY = `query ImageGalleryDetailQuery($slug: ID!) {
  imageGallery(id: $slug, idType: SLUG) {
    title
    slug
    uri
    imageGalleryContent {
      heading
      photoCount
      bannerSection {
        bannerTitleEn
        bannerTitleAr
        bannerBackgroundColorEn
        bannerBackgroundColorAr
        bannerBackgroundImageEn {
          node { mediaItemUrl }
        }
        bannerBackgroundImageAr {
          node { mediaItemUrl }
        }
      }
      imageGallery {
        nodes {
          mediaItemUrl
          sourceUrl
          altText
          title
        }
      }
    }
  }
}`;

// Rich Content Page (Terms of Use, Privacy Policy, etc.)
export const RICH_CONTENT_PAGE_QUERY = `query RichContentPage($uri: ID!) {
  page(id: $uri, idType: URI) {
    id
    flexibleContent {
      component {
        fieldGroupName
        ... on FlexibleContentComponentClassicEditorLayout {
          fieldGroupName
          richContent
        }
      }
      bannerSection {
        bannerBackgroundColorAr
        bannerBackgroundColorEn
        bannerTitleAr
        bannerTitleEn
        bannerBackgroundImageEn {
          node {
            mediaItemUrl
          }
        }
        bannerBackgroundImageAr {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
}`;

// Venues Page
const VENUE_TAB_FIELDS = `
  titleEn
  titleAr
  contentEn
  isSubtab
  showDistanceInformation
   accordion {
                    headingAr
                    headingEn
                    fieldGroupName
                    accordionItem {
                      titleEn
                      titleAr
                      row {
                        valueEn
                        valueAr
                        labelEn
                        labelAr
                      }
                    }
                  }
  distanceInformationSection {
                    mapImageEn {
                      node {
                        mediaItemUrl
                      }
                    }
                    mapLabelEn
                    sectionTitleEn
                    distanceItems {
                      distanceEn
                      iconEn {
                        node {
                          mediaItemUrl
                        }
                      }
                      travelTimeEn
                      venueNameEn
                    }
                  }
      
  documentEn {
    node { filePath file mediaItemUrl }
  }
  imageGalleryAr {
    nodes { filePath file mediaItemUrl }
  }
  imageGalleryEn {
    nodes { filePath file mediaItemUrl }
  }
`;

export const VENUES_QUERY = `query VenuesQuery {
  page(id: "sports-and-venues", idType: URI) {
    id
    flexibleContent {
      bannerSection {
        bannerTitleEn
        bannerTitleAr
        bannerBackgroundImageEn {
          node {
            mediaItemUrl
          }
        }
        bannerBackgroundImageAr {
          node {
            mediaItemUrl
          }
        }
        bannerBackgroundColorEn
        bannerBackgroundColorAr
      }
      component {
        ... on FlexibleContentComponentTabsContentLayout {
          fieldGroupName
          addTab {
            nodes {
              id
              ... on TabContent {
                id
                title
                tabFields {
                  ${VENUE_TAB_FIELDS}
                  subTab {
                    nodes {
                      id
                      ... on TabContent {
                        id
                        title
                        tabFields {
                          ${VENUE_TAB_FIELDS}
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
  }
}`;
