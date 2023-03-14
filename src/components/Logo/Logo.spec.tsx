import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo', () => {
  it('shows logo', () => {
    render(<Logo />);

    expect(screen.getByText('Mangoes'));
    expect(screen.getByAltText('mangoes'));
  });
});
