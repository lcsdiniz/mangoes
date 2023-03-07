import { gql } from "@apollo/client";
import { MEDIA_FRAGMENT } from "../fragments/mediaFragment";

export const GET_MANGA = gql`
  ${MEDIA_FRAGMENT}
  query GetMainPageContent($mediaType: MediaType, $page: Int, $perPage: Int) {
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