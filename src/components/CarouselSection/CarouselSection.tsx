import { Carousel } from '@mantine/carousel';
import { Title } from '@mantine/core';
import { ReactNode } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { useStyles } from './styles';

interface CarouselSectionProps {
  title: string;
  children: ReactNode;
}

export function CarouselSection({ title, children }: CarouselSectionProps) {
  const { classes } = useStyles();
  const isMobile = useMediaQuery('(max-width: 50em)');

  return (
    <section className={classes.section}>
      <Title order={1} mb={16} color="orange">
        {title}
      </Title>

      <Carousel
        slideSize={isMobile ? '33%' : 200}
        breakpoints={[
          { maxWidth: 'lg', slideSize: '25%' },
          { maxWidth: 'md', slideSize: '33%' },
          { maxWidth: 'sm', slideSize: '33%', slideGap: 8 },
        ]}
        styles={{
          control: {
            '&[data-inactive]': {
              opacity: 0,
              cursor: 'default',
            },
          },
        }}
        dragFree={false}
        align="start"
        withControls
        slidesToScroll={1}
        slideGap={16}
        containScroll="trimSnaps"
        loop
      >
        {children}
      </Carousel>
    </section>
  );
}
