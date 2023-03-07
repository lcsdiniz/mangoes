import { gql } from "@apollo/client";

export const GET_VOLUMES = gql`
  query GetVolumes($mangaId: Int) {
    volumes(where: {manga: {anilistId: $mangaId}}) {
      number
      manga {
        anilistId
      }
      chapters
      coverUrl
      lastUpdate
    }
  }
`;