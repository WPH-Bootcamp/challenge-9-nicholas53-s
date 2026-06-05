import { Skeleton } from '@/components/ui/skeleton';
import MovieCard from '@/components/MovieCard';
import type { Movie } from '@/types/movie';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  withRank?: boolean;
}

// Skeleton loading
function MovieCardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="w-full aspect-2/3 rounded-xl bg-gray-800/80" />
      <Skeleton className="h-4 w-3/4 rounded bg-gray-800/80" />
      <Skeleton className="h-3 w-1/4 rounded bg-gray-800/80" />
    </div>
  );
}

// Empty state
interface EmptyStateProps {
  type: 'search' | 'favorites';
  onExplore?: () => void;
}

export function EmptyState({ type, onExplore }: EmptyStateProps) {
  const isSearch = type === 'search';

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-7xl mb-5 opacity-40">🎬</div>
      <p className="text-white font-semibold text-lg mb-1">
        {isSearch ? 'Data Not Found' : 'Data Empty'}
      </p>
      <p className="text-gray-500 text-sm mb-6">
        {isSearch ? 'Try other keywords' : "You don't have a favorite movie yet"}
      </p>
      {!isSearch && onExplore && (
        <button
          onClick={onExplore}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded-full text-sm transition-colors"
        >
          Explore Movie
        </button>
      )}
    </div>
  );
}

export default function MovieGrid({ movies, isLoading, withRank }: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!movies.length) {
    return <EmptyState type="search" />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
      {movies.map((movie, index) => (
        <MovieCard key={movie.id} movie={movie} rank={withRank ? index + 1 : undefined} />
      ))}
    </div>
  );
}
