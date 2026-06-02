import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/lib/constants';
import type { Movie } from '@/types/movie';

interface MovieStore {
  // State
  favorites: Movie[];

  // Actions
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addToFavorites: (movie) =>
        set((state) => ({
          favorites: [...state.favorites, movie],
        })),

      removeFromFavorites: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        })),

      // Toggle — kalau sudah ada di favorites, hapus. Kalau belum, tambah.
      toggleFavorite: (movie) => {
        const isFav = get().isFavorite(movie.id);
        if (isFav) {
          get().removeFromFavorites(movie.id);
        } else {
          get().addToFavorites(movie);
        }
      },

      // Cek apakah film sudah di favorites
      isFavorite: (movieId) => get().favorites.some((m) => m.id === movieId),
    }),
    {
      name: STORAGE_KEYS.favorites, // key di localStorage
    }
  )
);
