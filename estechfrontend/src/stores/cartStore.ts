// src/stores/cartStore.ts
import { create } from 'zustand';

interface CartState {
    cartCount: number;
    setCartCount: (count: number) => void;
}

const useCartStore = create<CartState>((set) => ({
    cartCount: 0,
    setCartCount: (count) => set({ cartCount: count }),
}));

export default useCartStore;
