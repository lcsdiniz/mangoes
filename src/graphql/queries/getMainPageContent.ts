import { gql } from "@apollo/client";
import { MEDIA_FRAGMENT } from "../fragments/mediaFragment";

export const GET_MAIN_PAGE_CONTENT = gql`
  ${MEDIA_FRAGMENT}
  query GetMainPageContent($mediaType: MediaType, $page: Int, $perPage: Int, $userId: Int) {
    userFavorites: User(id: $userId) {
      id
      favourites {
        manga {
          edges {
            node {
              id
              title {
                romaji
                english
              }
              coverImage {
                large
                medium
              }
              staff {
                nodes {
                  name {
                    full
                  },
                  primaryOccupations
                }
              }
            }
          }
        }
      }
    }
    trending: Page(page: $page, perPage: $perPage) {
      media(sort: TRENDING_DESC, type: $mediaType, isAdult: false) {
        ...Media
      }
    }
    popular: Page(page: $page, perPage: $perPage) {
      media(sort: POPULARITY_DESC, type: $mediaType, isAdult: false) {
        ...Media
      }
    }
    top: Page(page: $page, perPage: $perPage) {
      media(sort: SCORE_DESC, type: $mediaType, isAdult: false) {
        ...Media
      }
    }
  }
`;