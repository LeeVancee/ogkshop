import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Product } from '@/types';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Product, quantity?: number) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product, quantity: number = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === data.id ? { ...item, quantity: item.quantity + quantity } : item
            ),
          });
          toast.success('Item quantity updated in cart.');
        } else {
          set({ items: [...currentItems, { ...data, quantity }] });
          toast.success('Item added to cart.');
        }
      },
      updateItemQuantity: (id: string, quantity: number) => {
        const currentItems = get().items;
        set({
          items: currentItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
        });
        // toast.success('Item quantity updated.');
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success('Item removed from cart.');
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
