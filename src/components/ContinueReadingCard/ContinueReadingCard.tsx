import { Card, RingProgress, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';
import { formatChapterName } from '../../utils/format';

interface ContinueReadingCardProps {
  id: number;
  title: string;
  chapter: string;
  pageUrl: string;
  progress: number;
  totalPages: number;
}

export function ContinueReadingCard({
  id,
  pageUrl,
  title,
  chapter,
  progress,
  totalPages,
}: ContinueReadingCardProps) {
  const { classes } = useStyles();

  function calculatesPageProgress() {
    const pageProgress = Math.ceil((progress / 100) * totalPages);
    return pageProgress;
  }

  return (
    <Card withBorder className={classes.card}>
      <Link to={`manga/${id}/${chapter}#Page${calculatesPageProgress()}`}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={pageUrl}
            alt="chapter cover"
            style={{
              filter: 'blur(0.5px) brightness(0.2)',
              height: 300,
              width: 200,
            }}
          />

          <RingProgress
            sections={[{ value: progress, color: 'orange' }]}
            label={
              <Text weight={700} align="center" size="xl" color="white">
                {progress}%
              </Text>
            }
            size={120}
            thickness={12}
            roundCaps
            style={{
              position: 'absolute',
              display: 'block',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              margin: 'auto',
            }}
          />
        </div>
      </Link>

      <Link
        to={`manga/${id}/${chapter}#Page${calculatesPageProgress()}`}
        style={{ textDecoration: 'none' }}
      >
        <Text color="orange" size={16} mt={8} className={classes.title}>
          {title}
        </Text>
      </Link>

      <Text size={14}>{formatChapterName(chapter)}</Text>
    </Card>
  );
}
