import { gql } from "@apollo/client";

export const MEDIA_FRAGMENT = gql`
	fragment Media on Media {
		id
		title {
			english,
			romaji,
			native
		}
		coverImage {
			large
		}
		bannerImage
		description
		staff {
			nodes {
				name {
					full
				},
				primaryOccupations
			}
		}
	}
`