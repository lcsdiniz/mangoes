import { Carousel } from "@mantine/carousel";
import { MangaCard } from "../MangaCard/MangaCard";
import { useStyles } from "./styles";
import { Manga } from "../../types/manga";
import { Title } from "@mantine/core";

interface MangaListSectionProps {
  title: string
  mangaList: Manga[]
}

export function MangaListSection({ title, mangaList }: MangaListSectionProps) {
	const { classes } = useStyles();

  return (
    <section className={classes.mangaListSection}>
			<Title order={1} mb={16} color="orange">{title}</Title>
			<Carousel
				slideSize="20%"
				breakpoints={[
					{ maxWidth: 'lg', slideSize: '25%' },
					{ maxWidth: 'md', slideSize: '50%' },
					{ maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
				]}
				dragFree={false}
				align="start"
				withControls={true}
				slidesToScroll={1}
				slideGap={8}
				loop
			>
				{mangaList.map((manga: Manga) => (
					<Carousel.Slide key={manga.id}>
						<MangaCard
							key={manga.id}
							id={manga.id}
							author={manga.staff.nodes[0].name.full}
							coverImage={manga.coverImage.large}
							title={manga.title.english ? manga.title.english : manga.title.romaji}
						/>
					</Carousel.Slide>
				))}
			</Carousel>
		</section>
  )
}