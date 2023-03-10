import { Carousel } from '@mantine/carousel';
import { MangaCard } from '../MangaCard/MangaCard';
import { Manga } from '../../types/manga';
import { CarouselSection } from '../CarouselSection/CarouselSection';

interface MangaListSectionProps {
  title: string;
  mangaList: Manga[];
}

export function MangaListSection({ title, mangaList }: MangaListSectionProps) {
  return (
    <CarouselSection title={title}>
      {mangaList.map((manga: Manga) => (
        <Carousel.Slide key={manga.id}>
          <MangaCard
            key={manga.id}
            id={manga.id}
            author={manga.staff.nodes[0].name.full}
            coverImage={manga.coverImage.large}
            title={
              manga.title.english ? manga.title.english : manga.title.romaji
            }
          />
        </Carousel.Slide>
      ))}
    </CarouselSection>
  );
}
