import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ContinueReadingCard } from './ContinueReadingCard';

describe('ContinueReadingCard', () => {
  it('renders correct data', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ContinueReadingCard
          id={0}
          title="Manga Title"
          chapter="1"
          pageUrl=""
          progress={10}
          totalPages={90}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Manga Title'));
    expect(screen.getByText('Chapter 1'));
    expect(screen.getByText('10%'));
  });

  it('renders chapter when its a name', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ContinueReadingCard
          id={0}
          title="Manga Title 2"
          chapter="Extra 4"
          pageUrl=""
          progress={10}
          totalPages={90}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Manga Title 2'));
    expect(screen.getByText('Extra 4'));
  });

  it('calculates page progression in link href', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ContinueReadingCard
          id={0}
          title="Manga Title 3"
          chapter="100"
          pageUrl=""
          progress={10}
          totalPages={80}
        />
      </MemoryRouter>
    );

    const linkEl = screen.getByRole('link', { name: 'Manga Title 3' });
    expect(linkEl).toHaveAttribute('href', '/manga/0/100#Page8');
  });
});
