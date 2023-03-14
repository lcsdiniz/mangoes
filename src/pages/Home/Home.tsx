import { useQuery } from '@apollo/client';
import { Container } from '@mantine/core';
import { GET_MAIN_PAGE_CONTENT } from '../../graphql/queries/getMainPageContent';
import { ContentLoader } from '../../components/ContentLoader/ContentLoader';
import { MangaListSection } from '../../components/MangaListSection/MangaListSection';
import { CoverCarousel } from '../../components/CoverCarousel/CoverCarousel';
import { Favorite } from '../../types/favoritesList';
import { ContinueReadingSection } from '../../components/ContinueReadingSection/ContinueReadingSection';
import { readingList } from '../../continueReading';

export function Home() {
  const { loading, error, data } = useQuery(GET_MAIN_PAGE_CONTENT, {
    variables: {
      mediaType: 'MANGA',
      page: 1,
      perPage: 15,
      userId: 6184052, // My AniList User Id
    },
  });

  if (loading) {
    return (
      <div>
        <ContentLoader />
      </div>
    );
  }

  if (error) return <p>Error : {error.message}</p>;

  function favoritesListFormat(favoritesList: Favorite[]) {
    const formattedList = favoritesList.map((favorite) => favorite.node);

    return formattedList;
  }

  return (
    <Container maw="100vw" p={0}>
      <CoverCarousel mangaList={data.top.media} />

      <ContinueReadingSection
        title="Continue Reading"
        mangaList={readingList}
      />

      <MangaListSection
        title="My List"
        mangaList={favoritesListFormat(
          data.userFavorites.favourites.manga.edges
        )}
      />

      <MangaListSection title="Trending" mangaList={data.trending.media} />

      <MangaListSection title="Popular" mangaList={data.popular.media} />
    </Container>
  );
}
