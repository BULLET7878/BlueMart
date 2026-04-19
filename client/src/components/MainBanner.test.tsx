import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainBanner from './MainBanner';
import { describe, it, expect } from 'vitest';

describe('MainBanner Component', () => {
  it('renders the main heading correctly', () => {
    // We wrap inside BrowserRouter because the component uses <Link />
    render(
      <BrowserRouter>
        <MainBanner />
      </BrowserRouter>
    );

    const headingElement = screen.getByText(/Freshness You/i);
    expect(headingElement).toBeInTheDocument();
    
    const shopNowBtn = screen.getByText(/Shop Now/i);
    expect(shopNowBtn).toBeInTheDocument();
  });
});
