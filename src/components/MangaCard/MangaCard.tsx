import { AspectRatio, Card, Text, Image } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import { useStyles } from './styles';

interface MangaCardProps {
  id: number;
  coverImage: string;
  title: string;
  author: string;
}

export function MangaCard({ id, coverImage, title, author }: MangaCardProps) {
  const { classes } = useStyles();
  const isMobile = useMediaQuery('(max-width: 50em)');

  return (
    <Card withBorder className={classes.card}>
      <Link to={`manga/${id}`}>
        <AspectRatio ratio={720 / 1080} w={isMobile ? 140 : 200}>
          <Image src={coverImage} alt="cover" />
        </AspectRatio>
      </Link>

      <Link to={`manga/${id}`} style={{ textDecoration: 'none' }}>
        <Text color="orange" size={16} mt={8} className={classes.title}>
          {title}
        </Text>
      </Link>

      <Text size={14} className={classes.author}>
        {author}
      </Text>
    </Card>
  );
}
