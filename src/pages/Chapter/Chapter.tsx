import { AspectRatio, Container, Paper, Text, Title } from '@mantine/core';
import { GET_CHAPTER_DATA } from '../../graphql/queries/getChapterData';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useStyles } from './styles';
import { ContentLoader } from '../../components/ContentLoader/ContentLoader';
import { formatChapterName } from '../../utils/format';

export function Chapter() {
  const { classes } = useStyles();
  const { id, chapter } = useParams();
  const { loading, error, data } = useQuery(
		GET_CHAPTER_DATA,
		{
			variables: {
				mediaId: Number(id)
			}
		}
	);

  if (loading) {
		return <div>
			<ContentLoader />
		</div>
	};
  if (error) return <p>Error</p>;

  return (
    <Container>
      <Title order={1} align='center'>
        {data.Media.title.english ? data.Media.title.english : data.Media.title.romaji}
      </Title>
      <Title order={2} align='center'>
        {formatChapterName(chapter!)}
      </Title>
      
      <div className={classes.pagesContainer}>
        {Array.from(Array(18), (e, i) => {
          return <AspectRatio ratio={720 / 1080}>
            <Paper key={i} shadow="xs" p="md" h={1200} bg="dark">
              <Text size={50} align='center' color='white'>
                DUMMY PAGE
              </Text>
            </Paper>
          </AspectRatio>
          
        })}
      </div>
    </Container>
  )
}