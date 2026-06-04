import MovieCard from './MovieCard';
import type { Movie } from '@/types/movie';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  withRank?: boolean; // tampilkan nomor ranking
}

// Skeleton loading — placeholder saat data belum datang
function MovieSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-800 rounded-lg aspect-[2/3]" />
      <div className="mt-2 h-4 bg-gray-800 rounded w-3/4" />
      <div className="mt-1 h-3 bg-gray-800 rounded w-1/4" />
    </div>
  );
}

export default function MovieGrid({ movies, isLoading, withRank }: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Tampilkan 10 skeleton saat loading */}
        {Array.from({ length: 10 }).map((_, i) => (
          <MovieSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <span className="text-5xl mb-4">🎬</span>
        <p className="text-lg font-medium">Data Not Found</p>
        <p className="text-sm">Try other keywords</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} rank={withRank ? index + 1 : undefined} />
      ))}
    </div>
  );
}
