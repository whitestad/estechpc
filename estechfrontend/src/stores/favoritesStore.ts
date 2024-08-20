// src/stores/cartStore.ts
import { create } from 'zustand';

interface FavoritesState {
    favoritesCount: number;
    setFavoritesCount: (count: number) => void;
}

const useFavoritesStore = create<FavoritesState>((set) => ({
    favoritesCount: 0,
    setFavoritesCount: (count) => set({ favoritesCount: count }),
}));

export default useFavoritesStore;
