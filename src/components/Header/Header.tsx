import { useQuery } from '@apollo/client';
import {
  Header as MantineHeader,
  Group,
  Text,
  MantineColor,
  SelectItemProps,
  Menu,
  Avatar,
  UnstyledButton,
  MediaQuery,
  Select,
  Loader,
} from '@mantine/core';
import { forwardRef, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Logo } from '../Logo/Logo';
import { GET_MEDIA_BY_SEARCH_STRING } from '../../graphql/queries/getMediaBySearchString';
import { AuthContext, AuthContextType } from '../../hooks/auth';
import { useStyles } from './styles';

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, description, label, image, ...others }: ItemProps, ref) => (
    <Link to={`manga/${value}`} style={{ textDecoration: 'none' }}>
      <div ref={ref} {...others}>
        <Group noWrap>
          <img src={image} />

          <div>
            <Text>{label}</Text>
            <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
              <Text size="xs" color="dimmed">
                <div dangerouslySetInnerHTML={{ __html: `${description}` }} />
              </Text>
            </MediaQuery>
          </div>
        </Group>
      </div>
    </Link>
  )
);

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  description: string;
  image: string;
}

export function Header() {
  const [selectSearch, setSelectSearch] = useState('');
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const { user, signOut } = useContext(AuthContext) as AuthContextType;

  const { loading, error, data } = useQuery(GET_MEDIA_BY_SEARCH_STRING, {
    variables: {
      page: 1,
      perPage: 50,
      selectSearch,
    },
  });

  const formattedData = data
    ? data.Page.media.map((item: any) => ({
        value: item.id,
        image: item.coverImage.medium,
        label: item.title.english ? item.title.english : item.title.romaji,
        description: item.description,
      }))
    : [];

  const { classes } = useStyles();
  const navigate = useNavigate();

  function handleNavigate(mangaId: string | null) {
    if (mangaId) {
      navigate(`manga/${mangaId}`);
    }
  }

  return (
    <MantineHeader height={50} className={classes.header}>
      <Link to="/" className={classes.link}>
        <Logo />
      </Link>
      <MediaQuery smallerThan="md" styles={{ flex: 1, padding: '0 24px' }}>
        <Select
          className={classes.select}
          onChange={(value) => handleNavigate(value)}
          placeholder="Search your favorite manga!"
          itemComponent={SelectItem}
          data={formattedData}
          limit={10}
          searchable
          clearable
          searchValue={selectSearch}
          onSearchChange={setSelectSearch}
          maxDropdownHeight={400}
          nothingFound={
            loading ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  justifyContent: 'center',
                }}
              >
                <Loader size="xs" /> Searching...
              </div>
            ) : (
              'Manga not found :('
            )
          }
        />
      </MediaQuery>

      <Menu
        width={100}
        position="bottom-end"
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton>
            <Group spacing={7}>
              <Avatar alt={user!.email!} radius="xl" size={35} />

              <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                <Text weight={500} size="sm" mr={3}>
                  {user!.email}
                </Text>
              </MediaQuery>
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item color="red" onClick={signOut}>
            Sign Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </MantineHeader>
  );
}
