import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import {
  getPopularMovies,
  getNowPlayingMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
  searchMovies,
} from '@/services/movieService';

// Hook untuk film populer
export const usePopularMovies = (page: number = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.popular(page),
    queryFn: () => getPopularMovies(page),
  });
};

// Hook untuk film now playing
export const useNowPlayingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.nowPlaying(page),
    queryFn: () => getNowPlayingMovies(page),
  });
};

// Hook untuk detail film — hanya fetch kalau ada id
export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.details(id),
    queryFn: () => getMovieDetails(id),
    enabled: !!id, // tidak fetch kalau id kosong/undefined
  });
};

// Hook untuk credits film
export const useMovieCredits = (id: number) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.movies.details(id), 'credits'],
    queryFn: () => getMovieCredits(id),
    enabled: !!id,
  });
};

// Hook untuk video/trailer
export const useMovieVideos = (id: number) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.movies.details(id), 'videos'],
    queryFn: () => getMovieVideos(id),
    enabled: !!id,
  });
};

// Hook untuk similar movies
export const useSimilarMovies = (id: number) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.movies.details(id), 'similar'],
    queryFn: () => getSimilarMovies(id),
    enabled: !!id,
  });
};

// Hook untuk search — hanya fetch kalau query tidak kosong
export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.search(query, page),
    queryFn: () => searchMovies({ query, page }),
    enabled: !!query.trim(), // tidak fetch kalau search kosong
  });
};
