import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartItem, Flavor } from '../types';

interface CartState {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (f: Flavor, qty?: number) => void;
  setQty: (flavorId: string, qty: number) => void;
  remove: (flavorId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('cart') ?? '[]'); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(items)); }, [items]);

  const value = useMemo<CartState>(() => ({
    items,
    count: items.reduce((s, i) => s + i.quantity, 0),
    subtotal: items.reduce((s, i) => s + i.price * i.quantity, 0),
    add: (f, qty = 1) =>
      setItems((prev) => {
        const found = prev.find((i) => i.flavorId === f.id);
        if (found) return prev.map((i) => (i.flavorId === f.id ? { ...i, quantity: i.quantity + qty } : i));
        return [...prev, { flavorId: f.id, name: f.name, price: f.price, category: f.category, quantity: qty }];
      }),
    setQty: (id, qty) =>
      setItems((prev) => (qty <= 0 ? prev.filter((i) => i.flavorId !== id) : prev.map((i) => (i.flavorId === id ? { ...i, quantity: qty } : i)))),
    remove: (id) => setItems((prev) => prev.filter((i) => i.flavorId !== id)),
    clear: () => setItems([]),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart precisa estar dentro de <CartProvider>');
  return ctx;
}
