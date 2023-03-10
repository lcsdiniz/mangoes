import { gql } from "@apollo/client";

export const TOGGLE_FAVOURITE = gql`
  mutation TOGGLE_FAVORITE($mangaId: Int) {
    ToggleFavourite(mangaId: $mangaId) {
      manga {
        nodes {
          id,
          title {
            romaji,
            english
          },
          isFavourite
        }
      }
    }
  }
`