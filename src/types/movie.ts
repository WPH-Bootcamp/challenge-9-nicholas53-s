// Satu film di list (popular, now playing, search results)
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  original_language: string;
  original_title: string;
}

// Response dari endpoint list (popular, now_playing, search)
export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Genre
export interface Genre {
  id: number;
  name: string;
}

// Detail film — lebih lengkap dari Movie
export interface MovieDetail extends Omit<Movie, 'genre_ids'> {
  genres: Genre[];
  runtime: number | null;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
}

// Cast & Crew
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

// Video/Trailer
export interface MovieVideo {
  id: string;
  key: string; // YouTube key
  name: string;
  site: string; // "YouTube"
  type: string; // "Trailer", "Teaser"
  official: boolean;
}

export interface MovieVideosResponse {
  id: number;
  results: MovieVideo[];
}

// Search params
export interface SearchParams {
  query: string;
  page?: number;
}
