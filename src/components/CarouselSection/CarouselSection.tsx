import { Carousel } from "@mantine/carousel";
import { useStyles } from "./styles";
import { Title } from "@mantine/core";
import { ReactNode } from "react";

interface CarouselSectionProps {
  title: string
  children: ReactNode
}

export function CarouselSection({ title, children }: CarouselSectionProps) {
	const { classes } = useStyles();

  return (
    <section className={classes.section}>
			<Title order={1} mb={16} color="orange">{title}</Title>

			<Carousel
				slideSize="200px"
				breakpoints={[
					{ maxWidth: 'lg', slideSize: '25%' },
					{ maxWidth: 'md', slideSize: '50%' },
					{ maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
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
				withControls={true}
				slidesToScroll={1}
				slideGap={16}
        containScroll="keepSnaps"
				loop
			>
				{children}
			</Carousel>
		</section>
  )
}