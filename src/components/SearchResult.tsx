import { Link } from 'react-router-dom';
import { Play, Heart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useMovieStore } from '@/store/movieStore';
import { getImageUrl, formatRating } from '@/lib/utils';
import { IMAGE_SIZES } from '@/lib/constants';
import type { Movie } from '@/types/movie';
import Frame55 from '@/Asset/Frame55-1.svg';

interface SearchResultsProps {
  query: string;
  movies: Movie[];
  isLoading: boolean;
}

// Loading skeleton
function SearchSkeleton() {
  return (
    <div className="flex gap-6 py-6 items-start">
      <Skeleton className="shrink-0 w-[140px] h-[210px] rounded-2xl bg-gray-800" />
      <div className="flex-1 space-y-3 pt-2">
        <Skeleton className="h-6 w-2/3 rounded bg-gray-800" />
        <Skeleton className="h-4 w-1/4 rounded bg-gray-800" />
        <Skeleton className="h-4 w-full rounded bg-gray-800" />
        <Skeleton className="h-4 w-3/4 rounded bg-gray-800" />
        <Skeleton className="h-10 w-36 rounded-full bg-gray-800 mt-4" />
      </div>
    </div>
  );
}

export default function SearchResults({ movies, isLoading }: SearchResultsProps) {
  const { toggleFavorite, isFavorite } = useMovieStore();

  const handleFavorite = (movie: Movie) => {
    const isFav = isFavorite(movie.id);
    toggleFavorite(movie);
    if (!isFav) {
      toast.success('Success Add to Favorites', { duration: 2000, icon: '✅' });
    } else {
      toast.error('Removed from Favorites', { duration: 2000 });
    }
  };

  return (
    <div className="px-[140px] max-md:px-6 pt-24 max-md:pt-20 pb-12">
      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <SearchSkeleton />
              {i < 2 && <div className="border-b border-white/10" />}
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && movies.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-32 max-md:py-20 text-center"
        >
          <img src={Frame55} alt="not found" className="w-32 h-32 mb-6 opacity-80" />
          <p className="text-white font-semibold text-lg mb-2">Data Not Found</p>
          <p className="text-gray-500 text-sm">Try other keywords</p>
        </motion.div>
      )}

      {/* Results */}
      {!isLoading && movies.length > 0 && (
        <AnimatePresence>
          <div className="flex flex-col">
            {movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {/* ── DESKTOP CARD ── */}
                <div className="hidden md:flex gap-6 py-6 items-start">
                  {/* Poster */}
                  <Link to={`/movie/${movie.id}`} className="shrink-0">
                    <div className="w-[140px] h-[210px] rounded-2xl overflow-hidden bg-gray-800 ring-1 ring-white/10">
                      <img
                        src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.small)}
                        alt={movie.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0 py-1">
                    <Link to={`/movie/${movie.id}`}>
                      <h3 className="text-white font-bold text-xl hover:text-red-400 transition-colors mb-2 line-clamp-1">
                        {movie.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 mb-3">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-yellow-400 text-sm font-medium">
                        {formatRating(movie.vote_average)}/10
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-5 max-w-2xl">
                      {movie.overview}
                    </p>
                    <Link to={`/movie/${movie.id}`}>
                      <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-5 h-10 text-sm font-semibold gap-2">
                        Watch Trailer
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                          <Play size={9} fill="#dc2626" className="text-red-600 ml-0.5" />
                        </div>
                      </Button>
                    </Link>
                  </div>

                  {/* Heart button */}
                  <button
                    onClick={() => handleFavorite(movie)}
                    className={`shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-1 ${
                      isFavorite(movie.id)
                        ? 'bg-red-500/20 border-red-500 text-red-500'
                        : 'border-white/30 text-white hover:border-white'
                    }`}
                  >
                    <Heart size={16} className={isFavorite(movie.id) ? 'fill-red-500' : ''} />
                  </button>
                </div>

                {/* ── MOBILE CARD ── */}
                <div className="md:hidden py-5">
                  {/* Row: Poster + Title/Rating/Overview */}
                  <div className="flex gap-4 items-start mb-4">
                    <Link to={`/movie/${movie.id}`} className="shrink-0">
                      <div className="w-[90px] h-[135px] rounded-xl overflow-hidden bg-gray-800 ring-1 ring-white/10">
                        <img
                          src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.small)}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0 pt-1">
                      <Link to={`/movie/${movie.id}`}>
                        <h3 className="text-white font-bold text-base hover:text-red-400 transition-colors mb-1.5 line-clamp-2">
                          {movie.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-yellow-400 text-xs font-medium">
                          {formatRating(movie.vote_average)}/10
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                        {movie.overview}
                      </p>
                    </div>
                  </div>

                  {/* Watch Trailer full width + Heart */}
                  <div className="flex items-center gap-3">
                    <Link to={`/movie/${movie.id}`} className="flex-1">
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full h-11 text-sm font-semibold gap-2">
                        Watch Trailer
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                          <Play size={9} fill="#dc2626" className="text-red-600 ml-0.5" />
                        </div>
                      </Button>
                    </Link>
                    <button
                      onClick={() => handleFavorite(movie)}
                      className={`shrink-0 w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        isFavorite(movie.id)
                          ? 'bg-red-500/20 border-red-500 text-red-500'
                          : 'border-white/30 text-white'
                      }`}
                    >
                      <Heart size={16} className={isFavorite(movie.id) ? 'fill-red-500' : ''} />
                    </button>
                  </div>
                </div>

                {/* Divider */}
                {index < movies.length - 1 && <div className="border-b border-white/10" />}
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
