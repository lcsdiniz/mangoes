import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContentLoader } from './ContentLoader';

describe('ContentLoader', () => {
  it('renders properly', () => {
    render(<ContentLoader />);

    expect(screen.getByTestId('loader-container'));
  });
});
