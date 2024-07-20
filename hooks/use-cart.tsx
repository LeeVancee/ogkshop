import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';

import { Product, Size, Color } from '@/types';

interface CartItem extends Product {
  quantity: number;
  selectedSize: Size;
  selectedColor: Color;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Product, selectedSize: Size, selectedColor: Color, quantity?: number) => void;
  updateItemQuantity: (id: string, selectedSize: Size, selectedColor: Color, quantity: number) => void;
  removeItem: (id: string, selectedSize: Size, selectedColor: Color) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product, selectedSize: Size, selectedColor: Color, quantity: number = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) =>
            item.id === data.id &&
            item.selectedSize.id === selectedSize.id &&
            item.selectedColor.id === selectedColor.id
        );

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === data.id &&
              item.selectedSize.id === selectedSize.id &&
              item.selectedColor.id === selectedColor.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
          toast.success('Item quantity updated in cart.');
        } else {
          set({ items: [...currentItems, { ...data, quantity, selectedSize, selectedColor }] });
          toast.success('Item added to cart.');
        }
      },
      updateItemQuantity: (id: string, selectedSize: Size, selectedColor: Color, quantity: number) => {
        const currentItems = get().items;
        set({
          items: currentItems.map((item) =>
            item.id === id && item.selectedSize.id === selectedSize.id && item.selectedColor.id === selectedColor.id
              ? { ...item, quantity }
              : item
          ),
        });
      },
      removeItem: (id: string, selectedSize: Size, selectedColor: Color) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.id === id &&
                item.selectedSize.id === selectedSize.id &&
                item.selectedColor.id === selectedColor.id
              )
          ),
        });
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
