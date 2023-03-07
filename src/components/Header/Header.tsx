import { useQuery } from '@apollo/client';
import { Header as MantineHeader, Group, Text, MantineColor, SelectItemProps, Autocomplete, Menu, Avatar, UnstyledButton, MediaQuery } from '@mantine/core';
import { forwardRef, useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '../Logo/Logo';
import { GET_MEDIA_BY_SEARCH_STRING } from '../../graphql/queries/getMediaBySearchString';
import { AuthContext, AuthContextType } from '../../hooks/auth';
import { useStyles } from './styles';

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, description, value, image, onMouseDown, ...others }: ItemProps, ref) => (
    <Link to={`manga/${id}`} onClick={()=>{
      const dropdown = document.getElementsByClassName('mantine-Autocomplete-dropdown');
      // dropdown && dropdown[0].setAttribute('aria-expanded', 'false')
      dropdown && dropdown[1].setAttribute('aria-expanded', 'false')
    }} style={{ textDecoration: 'none',  }}>
      <div ref={ref} {...others}>
        <Group noWrap>
          <img src={image} />
          
          <div>
            <Text>{value}</Text>
            <Text size="xs" color="dimmed">
              <div dangerouslySetInnerHTML={{ __html: `${description}` }} />
            </Text>
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
  const [autoCompleteValue, setAutoCompleteValue] = useState('');
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const { user, signOut } = useContext(AuthContext) as AuthContextType;

  const { loading, error, data } = useQuery(
		GET_MEDIA_BY_SEARCH_STRING,
		{
			variables: {
				page: 1,
				perPage: 50,
        autoCompleteValue: autoCompleteValue
			}
		}
	);

  const formattedData = data ? data.Page.media.map((item: any) => ({
    id: item.id,
    image: item.coverImage.medium,
    value: item.title.english ? item.title.english : item.title.romaji,
    description: item.description,
  })) : []

  const { classes } = useStyles();

  return (
    <MantineHeader height={50} className={classes.header}>
      <Link to="/" className={classes.link}>
        <Logo /> 
      </Link>

      <MediaQuery smallerThan="md" styles={{ flex: 1, padding: '0 24px' }}>
        <Autocomplete
          className={classes.autoComplete}
          value={autoCompleteValue}
          onChange={(value) => setAutoCompleteValue(value)}
          placeholder="Search your favorite manga!"
          itemComponent={AutoCompleteItem}
          data={formattedData}
          limit={50}
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
              <Avatar alt={user!.email!} radius="xl" size={20} />
              
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