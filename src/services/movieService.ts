import api from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/constants';
import type {
  MovieListResponse,
  MovieDetail,
  MovieCredits,
  MovieVideosResponse,
  SearchParams,
} from '@/types/movie';

// Ambil film populer
export const getPopularMovies = async (page: number = 1): Promise<MovieListResponse> => {
  const response = await api.get<MovieListResponse>(API_ENDPOINTS.movies.popular, {
    params: { page },
  });
  return response.data;
};

// Ambil film yang sedang tayang
export const getNowPlayingMovies = async (page: number = 1): Promise<MovieListResponse> => {
  const response = await api.get<MovieListResponse>(API_ENDPOINTS.movies.nowPlaying, {
    params: { page },
  });
  return response.data;
};

// Ambil detail satu film berdasarkan ID
export const getMovieDetails = async (id: number): Promise<MovieDetail> => {
  const response = await api.get<MovieDetail>(API_ENDPOINTS.movies.details(id));
  return response.data;
};

// Ambil cast & crew film
export const getMovieCredits = async (id: number): Promise<MovieCredits> => {
  const response = await api.get<MovieCredits>(API_ENDPOINTS.movies.credits(id));
  return response.data;
};

// Ambil trailer/video film
export const getMovieVideos = async (id: number): Promise<MovieVideosResponse> => {
  const response = await api.get<MovieVideosResponse>(API_ENDPOINTS.movies.videos(id));
  return response.data;
};

// Ambil film serupa
export const getSimilarMovies = async (id: number): Promise<MovieListResponse> => {
  const response = await api.get<MovieListResponse>(API_ENDPOINTS.movies.similar(id));
  return response.data;
};

// Search film berdasarkan keyword
export const searchMovies = async ({
  query,
  page = 1,
}: SearchParams): Promise<MovieListResponse> => {
  const response = await api.get<MovieListResponse>(API_ENDPOINTS.movies.search, {
    params: { query, page },
  });
  return response.data;
};
