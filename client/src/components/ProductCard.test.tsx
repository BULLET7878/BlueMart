import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from './ProductCard';

// Mock the AppContext
vi.mock('../context/AppContext', () => ({
  useAppContext: () => ({
    currency: '₹',
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
    cartItems: {},
    navigate: vi.fn(),
  }),
}));

const mockProduct = {
  _id: 'prod_001',
  name: 'Fresh Apples',
  category: 'Fruits',
  image: ['https://via.placeholder.com/150'],
  price: 120,
  offerPrice: 99,
  inStock: true,
};

describe('ProductCard Component', () => {
  it('renders the product name', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Fresh Apples/i)).toBeInTheDocument();
  });

  it('renders the offer price', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(/99/)).toBeInTheDocument();
  });

  it('renders the ADD button when product is not in cart', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(/ADD/i)).toBeInTheDocument();
  });

  it('renders the category badge', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Fruits/i)).toBeInTheDocument();
  });
});
