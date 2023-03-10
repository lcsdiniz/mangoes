import {
  Affix,
  AspectRatio,
  Button,
  Center,
  Container,
  Text,
  Title,
  Transition,
} from '@mantine/core';
import { useQuery } from '@apollo/client';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { IconArrowUp } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { useStyles } from './styles';
import { ContentLoader } from '../../components/ContentLoader/ContentLoader';
import { formatChapterName } from '../../utils/format';
import { GET_CHAPTER_DATA } from '../../graphql/queries/getChapterData';

export function Chapter() {
  const { id, chapter } = useParams();
  const { hash } = useLocation();
  const [scroll, scrollTo] = useWindowScroll();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_CHAPTER_DATA, {
    variables: {
      mediaId: Number(id),
    },
  });

  const { classes } = useStyles();

  function scrollToLastPageRead() {
    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    if (!loading) {
      scrollToLastPageRead();
    }
  }, [scrollToLastPageRead, loading]);

  if (loading) {
    return (
      <div>
        <ContentLoader />
      </div>
    );
  }

  if (error) return <p>Error</p>;

  return (
    <>
      <Container>
        <Link to={`/manga/${id}`} className={classes.link}>
          <Title order={1} align="center" color="orange" mt={32}>
            {data.Media.title.english
              ? data.Media.title.english
              : data.Media.title.romaji}
          </Title>
        </Link>

        <Title order={2} align="center">
          {formatChapterName(chapter!)}
        </Title>

        <div className={classes.pagesContainer}>
          {Array.from(Array(18), (e, i) => {
            return (
              <AspectRatio key={i} ratio={720 / 1080} id={`Page${i + 1}`}>
                <Center
                  key={i}
                  p="md"
                  h={1200}
                  sx={(theme) => ({
                    height: '2.5rem',
                    backgroundImage: theme.fn.gradient({
                      from: 'white',
                      to: 'gray',
                      deg: 45,
                    }),
                    color: theme.white,
                  })}
                >
                  <Text size={50} align="center" color="white">
                    DUMMY PAGE #{i + 1}
                  </Text>
                </Center>
              </AspectRatio>
            );
          })}
        </div>
      </Container>

      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              leftIcon={<IconArrowUp size="1rem" />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Back to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
}
