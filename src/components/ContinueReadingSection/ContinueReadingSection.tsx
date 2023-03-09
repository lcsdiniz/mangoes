import { Title } from "@mantine/core"
import { useStyles } from "./styles";
import { Carousel } from "@mantine/carousel";
import { ContinueReadingCard } from "../ContinueReadingCard/ContinueReadingCard";

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
	const { classes } = useStyles();

  return (
    <section className={classes.section}>
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
			</Carousel>
    </section>
  )
}