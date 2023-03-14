import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { MangaCard } from './MangaCard';

const initialEntries = ['/'];

describe('MangaCard', () => {
  it("shows Manga's title and author", async () => {
    render(
      <MemoryRouter initialEntries={initialEntries}>
        <MangaCard
          title="Manga Title"
          author="Manga Author"
          id={0}
          coverImage=""
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Manga Title'));
    expect(screen.getByText('Manga Author'));
  });
});
