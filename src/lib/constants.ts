// Constants untuk aplikasi

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
} as const;

export const STORAGE_KEYS = {
  favorites: 'movie-favorites',
  watchlist: 'movie-watchlist',
} as const;

export const QUERY_KEYS = {
  movies: {
    popular: (page: number) => ['movies', 'popular', page] as const,
    nowPlaying: (page: number) => ['movies', 'now-playing', page] as const,
    details: (id: number) => ['movie', id] as const,
    search: (query: string, page: number) => ['movies', 'search', query, page] as const,
  },
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  movies: {
    popular: '/movie/popular',
    nowPlaying: '/movie/now_playing',
    details: (id: number) => `/movie/${id}`,
    credits: (id: number) => `/movie/${id}/credits`,
    videos: (id: number) => `/movie/${id}/videos`,
    similar: (id: number) => `/movie/${id}/similar`,
    search: '/search/movie',
  },
} as const;
