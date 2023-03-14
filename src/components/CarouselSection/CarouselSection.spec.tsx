import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CarouselSection } from './CarouselSection';

describe('CarouselSection', () => {
  it('renders with proper title', () => {
    render(<CarouselSection title="Carousel Title">Dummy</CarouselSection>);

    expect(screen.getByText('Carousel Title'));
  });
});
