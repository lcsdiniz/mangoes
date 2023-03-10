import { Carousel } from '@mantine/carousel';
import { Title, Text, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Manga } from '../../types/manga';
import { useStyles } from './styles';

interface CoverCarouselProps {
  mangaList: Manga[];
}

export function CoverCarousel({ mangaList }: CoverCarouselProps) {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const { classes } = useStyles();

  return (
    <section className={classes.bannerSection}>
      <Carousel
        withIndicators
        controlsOffset="xs"
        controlSize={40}
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        slidesToScroll={1}
        draggable={false}
        loop
      >
        {mangaList.map((manga: Manga) => (
          <Carousel.Slide key={manga.id} className={classes.carouselSlide}>
            <div
              className={classes.carouselBackground}
              style={{
                backgroundImage: `url(${manga.bannerImage})`,
                filter: 'brightness(0.4)',
              }}
            />
            <div className={classes.mangaInformation}>
              <Title order={2} className={classes.mangaTitle}>
                {manga.title.english ? manga.title.english : manga.title.romaji}
              </Title>
              <Text lineClamp={3} className={classes.mangaDescription}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${manga.description!.replace('<br>', ' ')}`,
                  }}
                />
              </Text>
              <Link to={`manga/${manga.id}`}>
                <Button size="lg" mt={32}>
                  START READING
                </Button>
              </Link>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </section>
  );
}
