import { describe, it, expect } from 'vitest';

// Pure utility functions extracted for unit testing
// These mirror the logic inside AppContext

const getCartCount = (cartItems: Record<string, number>) => {
  return Object.values(cartItems).reduce((total: number, qty: number) => total + qty, 0);
};

const getCartAmount = (cartItems: Record<string, number>, products: any[]) => {
  return Object.entries(cartItems).reduce((total: number, [id, qty]: [string, number]) => {
    const product = products.find(p => p._id === id);
    return product ? total + (product.offerPrice * qty) : total;
  }, 0);
};

describe('AppContext Cart Utilities', () => {
  const mockProducts = [
    { _id: 'p1', name: 'Apple', offerPrice: 50, price: 70 },
    { _id: 'p2', name: 'Milk', offerPrice: 60, price: 80 },
  ];

  describe('getCartCount', () => {
    it('returns 0 for an empty cart', () => {
      expect(getCartCount({})).toBe(0);
    });

    it('returns the total quantity of all items', () => {
      expect(getCartCount({ p1: 2, p2: 3 })).toBe(5);
    });

    it('returns correct count for single item', () => {
      expect(getCartCount({ p1: 1 })).toBe(1);
    });
  });

  describe('getCartAmount', () => {
    it('returns 0 for an empty cart', () => {
      expect(getCartAmount({}, mockProducts)).toBe(0);
    });

    it('calculates total using offer price', () => {
      // 2 × ₹50 + 1 × ₹60 = ₹160
      expect(getCartAmount({ p1: 2, p2: 1 }, mockProducts)).toBe(160);
    });

    it('ignores items not found in products array', () => {
      expect(getCartAmount({ unknown: 5 }, mockProducts)).toBe(0);
    });
  });
});
