import { AspectRatio, Center, Container, Text, Title } from '@mantine/core';
import { GET_CHAPTER_DATA } from '../../graphql/queries/getChapterData';
import { useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import { useStyles } from './styles';
import { ContentLoader } from '../../components/ContentLoader/ContentLoader';
import { formatChapterName } from '../../utils/format';
import { useEffect } from 'react';

export function Chapter() {
  const { classes } = useStyles();
  const { id, chapter } = useParams();
  const { hash } = useLocation();
  const { loading, error, data } = useQuery(
		GET_CHAPTER_DATA,
		{
			variables: {
				mediaId: Number(id)
			}
		}
	);
  
  useEffect(() => {
    if(!loading) {
      scrollToLastPageRead()
    }
  }, [loading])

  function scrollToLastPageRead() {
    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (loading) {
		return <div>
			<ContentLoader />
		</div>
	};

  if (error) return <p>Error</p>;
  
  return (
    <Container>
      <Title order={1} align='center' mt={32}>
        {data.Media.title.english ? data.Media.title.english : data.Media.title.romaji}
      </Title>
      
      <Title order={2} align='center'>
        {formatChapterName(chapter!)}
      </Title>
      
      <div className={classes.pagesContainer}>
        {Array.from(Array(18), (e, i) => {
          return <AspectRatio key={i} ratio={720 / 1080} id={`Page${i + 1}`}>
            <Center
              key={i}
              p="md"
              h={1200}
              sx={(theme) => ({
                height: '2.5rem',
                backgroundImage: theme.fn.gradient({ from: 'white', to: 'gray', deg: 45 }),
                color: theme.white,
            })}>
              <Text size={50} align='center' color='white' >
                DUMMY PAGE #{i + 1}
              </Text>
            </Center>
          </AspectRatio>
        })}
      </div>
    </Container>
  )
}