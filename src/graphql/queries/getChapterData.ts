import { gql } from "@apollo/client";

export const GET_CHAPTER_DATA = gql`
	query GetMediaDetails($mediaId: Int) {
		Media(id: $mediaId) {
			...manga
		}
	}

	fragment manga on Media {
		title {
			english
			romaji
			native
		},
	}
`