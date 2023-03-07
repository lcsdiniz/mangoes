import { useRef } from 'react';
import { Carousel } from '@mantine/carousel';
import { useQuery } from "@apollo/client";
import { MangaCard } from "../../components/MangaCard/MangaCard";
import { Button, Container, Text, Title } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';
import { GET_MANGA } from '../../graphql/queries/getManga';
import { ContentLoader } from '../../components/ContentLoader/ContentLoader';

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
	const autoplay = useRef(Autoplay({ delay: 5000 }));

	const { classes } = useStyles();

	if (loading) {
		return <div>
			<ContentLoader />
		</div>
	};
  
	if (error) return <p>Error : {error.message}</p>;

	return (
		<Container className={classes.container}>
			<section>
				<Carousel
					withIndicators
					controlsOffset="xs"
					controlSize={40}
					// plugins={[autoplay.current]}
					// onMouseEnter={autoplay.current.stop}
					// onMouseLeave={autoplay.current.reset}
					slidesToScroll={1}
					draggable={false}
					loop
				>
					{data.top.media.map((item: any) => (
						<Carousel.Slide key={item.id} className={classes.carouselSlide}>
							<div className={classes.carouselBackground} style={{ backgroundImage: `url(${item.bannerImage})`, filter: 'brightness(0.4)' }}></div>
							<div className={classes.mangaInformation}>
								<Title order={2} className={classes.mangaTitle}>{item.title.english ? item.title.english : item.title.romaji}</Title>
								<Text lineClamp={3} className={classes.mangaDescription}>
									
									<div dangerouslySetInnerHTML={{ __html: `${item.description.replace('<br>', ' ')}` }} />
								</Text>
								<Link to={`manga/${item.id}`}>
									<Button size='lg' mt={32}>START READING</Button>
								</Link>
							</div>
						</Carousel.Slide>
					))}
				</Carousel>
			</section>

			<section className={classes.mangaListSection}>
				<h1 className={classes.sectionTitle}>Trending</h1>
				<Carousel
					slideSize="20%"
					breakpoints={[
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
					{data.trending.media.map((item: any) => (
						<Carousel.Slide key={item.id}>
							<MangaCard
								key={item.id}
								id={item.id}
								author={item.staff.nodes[0].name.full}
								coverImage={item.coverImage.large}
								title={item.title.english ? item.title.english : item.title.romaji}
							/>
						</Carousel.Slide>
					))}
				</Carousel>
			</section>

			<section className={classes.mangaListSection}>
				<h1 className={classes.sectionTitle}>Top</h1>
				<Carousel
					slideSize="20%"
					breakpoints={[
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
					{data.top.media.map((item: any) => (
						<Carousel.Slide key={item.id}>
							<MangaCard
								key={item.id}
								id={item.id}
								author={item.staff.nodes[0].name.full}
								coverImage={item.coverImage.large}
								title={item.title.english ? item.title.english : item.title.romaji}
							/>
						</Carousel.Slide>
					))}
				</Carousel>
			</section>
		</Container>
	)
}