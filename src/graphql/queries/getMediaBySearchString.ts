import { gql } from '@apollo/client';

export const GET_MEDIA_BY_SEARCH_STRING = gql`
  query GetMediaBySearchString($selectSearch: String) {
    Page(page: 1, perPage: 50) {
      media(
        sort: POPULARITY_DESC
        type: MANGA
        isAdult: false
        search: $selectSearch
      ) {
        id
        title {
          userPreferred
          romaji
          english
          native
        }
        coverImage {
          large
          color
        }
        description
        type
        episodes
        duration
        chapters
        volumes
        genres
        isAdult
        averageScore
        popularity
        mediaListEntry {
          id
          status
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
    }
  }
`;
