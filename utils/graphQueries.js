// GraphQL Queries for QOC-UCMS

export const PAGES_QUERY = `query MyQuery($id: Int!) {
  pages(where: {id: $id}) {
    nodes {
      flexibleComponent {
        component {
          ... on FlexibleComponentComponentBannerSectionLayout {
            fieldGroupName
          }
          ... on FlexibleComponentComponentTextIconLayout {
            fieldGroupName
          }
          ... on FlexibleComponentComponentIconTextLayout {
            fieldGroupName
          }
        }
      }
    }
  }
}`;