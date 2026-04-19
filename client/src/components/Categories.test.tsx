import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Categories from './Categories';

// Mock the AppContext
vi.mock('../context/AppContext', () => ({
  useAppContext: () => ({
    navigate: vi.fn(),
  }),
}));

// Mock static assets
vi.mock('../assets/assets', () => ({
  categories: [
    { text: 'Fruits & Vegetables', path: 'fruits', image: 'fruit.png', bgColor: '#fff' },
    { text: 'Dairy & Eggs', path: 'dairy', image: 'dairy.png', bgColor: '#fff' },
    { text: 'Snacks', path: 'snacks', image: 'snack.png', bgColor: '#fff' },
  ],
}));

describe('Categories Component', () => {
  it('renders the section heading', () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );
    expect(screen.getByText(/Shop by/i)).toBeInTheDocument();
  });

  it('renders all category items', () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );
    expect(screen.getByText(/Fruits & Vegetables/i)).toBeInTheDocument();
    expect(screen.getByText(/Dairy & Eggs/i)).toBeInTheDocument();
    expect(screen.getByText(/Snacks/i)).toBeInTheDocument();
  });

  it('renders the VIEW ALL button', () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );
    expect(screen.getByText(/VIEW ALL/i)).toBeInTheDocument();
  });
});
