import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { MockedProvider } from '@apollo/client/testing';
import { Header } from './Header';
import AuthProvider from '../../hooks/auth';
import { GET_MEDIA_BY_SEARCH_STRING } from '../../graphql/queries/getMediaBySearchString';

const initialEntries = ['/'];

const searchMock = [
  {
    request: {
      query: GET_MEDIA_BY_SEARCH_STRING,
      variables: {
        page: 1,
        perPage: 50,
        selectSearch: '',
      },
    },
    result: {
      data: {
        Page: {
          media: [],
        },
      },
    },
  },
  {
    request: {
      query: GET_MEDIA_BY_SEARCH_STRING,
      variables: {
        page: 1,
        perPage: 50,
        selectSearch: 'slam dunk',
      },
    },
    result: {
      data: {
        Page: {
          media: [
            {
              id: 30051,
              title: {
                romaji: 'SLAM DUNK',
                english: 'Slam Dunk',
              },
              coverImage: {
                medium:
                  'https://s4.anilist.co/file/anilistcdn/media/manga/cover/small/bx30051-Lfej2WdOZty5.png',
              },
              description:
                "Hanamichi Sakuragi's got no game with girls--none at all! It doesn't help that he's known for throwing down at a moment's notice and always coming out on top. A hopeless bruiser, he's been rejected by 50 girls in a row! All that changes when he meets the girl of his dreams, Haruko, and she's actually not afraid of him! When she introduces him to the game of basketball, his life is changed forever...\n<br><br>\n(Source: Viz Media)",
            },
          ],
        },
      },
    },
  },
];

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(() => vi.fn(() => {})),
  };
});

describe('Header', () => {
  it('renders properly', () => {
    render(
      <AuthProvider
        value={{ email: 'mock@mock.com', accessToken: 'ACCESS_TOKEN' }}
      >
        <MemoryRouter initialEntries={initialEntries}>
          <MockedProvider mocks={searchMock} addTypename={false}>
            <Header />
          </MockedProvider>
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByText('mock@mock.com'));
    expect(screen.getByPlaceholderText('Search your favorite manga!'));
  });

  it('renders fetches data', async () => {
    render(
      <AuthProvider
        value={{ email: 'mock@mock.com', accessToken: 'ACCESS_TOKEN' }}
      >
        <MemoryRouter initialEntries={initialEntries}>
          <MockedProvider mocks={searchMock} addTypename={false}>
            <Header />
          </MockedProvider>
        </MemoryRouter>
      </AuthProvider>
    );

    const searchInput = screen.getByPlaceholderText(
      'Search your favorite manga!'
    );

    fireEvent.focus(searchInput);
    fireEvent.change(searchInput, { target: { value: 'slam dunk' } });

    expect(screen.getByText('Searching...')).toBeInTheDocument();
    expect(await screen.findByText('Slam Dunk')).toBeInTheDocument();
  });
});
