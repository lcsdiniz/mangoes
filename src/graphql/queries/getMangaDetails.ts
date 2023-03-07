import { gql } from "@apollo/client";

export const GET_MANGA_DETAILS = gql`
	query GetMediaDetails($mediaId: Int) {
		Media(id: $mediaId) {
			...manga
		}
	}

	fragment manga on Media {
		id
		title {
			english
			romaji
			native
		},
		coverImage {
			large
			color
		}
		type,
		format,
		description,
		status,
		startDate {
			year
			month
			day
		},
		endDate {
			year
			month
			day
		},
		chapters,
		genres,
		meanScore,
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