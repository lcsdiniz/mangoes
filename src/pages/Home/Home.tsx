import { useQuery } from "@apollo/client";
import { Container } from '@mantine/core';
import { GET_MANGA } from '../../graphql/queries/getManga';
import { ContentLoader } from '../../components/ContentLoader/ContentLoader';
import { MangaListSection } from '../../components/MangaListSection/MangaListSection';
import { CoverCarousel } from '../../components/CoverCarousel/CoverCarousel';

export function Home() {
	const { loading, error, data } = useQuery(
		GET_MANGA,
		{
			variables: {
				mediaType: "MANGA",
				page: 1,
				perPage: 15
			}
		}
	);

	if (loading) {
		return <div>
			<ContentLoader />
		</div>
	};
  
	if (error) return <p>Error : {error.message}</p>;

	return (
		<Container maw="100vw" p={0}>
			<CoverCarousel mangaList={data.top.media} />

			<MangaListSection title="Trending" mangaList={data.trending.media} />
			
			<MangaListSection title="Popular" mangaList={data.popular.media} />
		</Container>
	)
}