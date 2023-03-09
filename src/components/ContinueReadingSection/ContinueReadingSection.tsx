import { Carousel } from "@mantine/carousel";
import { ContinueReadingCard } from "../ContinueReadingCard/ContinueReadingCard";
import { CarouselSection } from "../CarouselSection/CarouselSection";

interface ContinueReadingSection {
  title: string
  mangaList: {
    id: number
    title: string
    chapter: string
    pageUrl: string
    progress: number
    totalPages: number
  }[]
}

export function ContinueReadingSection({ title, mangaList }: ContinueReadingSection) {
  return (
		<CarouselSection title={title}>
			{mangaList.map((manga) => (
				<Carousel.Slide key={manga.id}>
					<ContinueReadingCard
						id={manga.id}
						chapter={manga.chapter}
						pageUrl={manga.pageUrl}
						title={manga.title}
						progress={manga.progress}
						totalPages={manga.totalPages}
					/>
				</Carousel.Slide>
			))}
		</CarouselSection>
  )
}