import { RingProgress, Title, Text, Center, BackgroundImage, Card, Box } from "@mantine/core"
import { useStyles } from "./styles";
import { Carousel } from "@mantine/carousel";
import { Link } from "react-router-dom";
import { formatChapterName } from "../../utils/format";

interface ContinueReadingSection {
  title: string
  mangaList: {
    id: number
    title: string
    chapter: string
    pageUrl: string
    progress: number
  }[]
}

export function ContinueReadingSection({ title, mangaList }: ContinueReadingSection) {
	const { classes } = useStyles();

  return (
    <section className={classes.section}>
      <Title order={1} mb={16} color="orange">{title}</Title>

      {/* Continue Reading Card */}
      <Box display="flex" style={{ gap: 16 }}>
        {mangaList.map(manga => (
          <div style={{ width: 200 }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <img src={manga.pageUrl} alt="chapter image" style={{ filter: 'blur(0.5px) brightness(0.2)', height: 316 }}/>
              
              <RingProgress
                sections={[{ value: manga.progress, color: 'orange' }]}
                label={
                  <Text weight={700} align="center" size="xl">
                    {manga.progress}%
                  </Text>
                }
                size={120}
                thickness={12}
                roundCaps
                style={{ position: 'absolute', display: 'block', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto' }}
              />
            </div>

            <Link to={`manga/${manga.chapter}`} className={classes.title}>
              <Text color="orange" align="center">{manga.title} - {formatChapterName(manga.chapter)}</Text>
            </Link>
          </div>
        ))}
      </Box>
    </section>
  )
}