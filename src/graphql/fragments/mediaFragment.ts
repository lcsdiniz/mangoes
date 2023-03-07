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
			color
		}
		bannerImage
		description
		status(version: 2)
		chapters
		volumes
		genres
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