import { Link } from 'react-router-dom';
import { Play, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { getImageUrl, formatRating } from '@/lib/utils';
import { useMovieStore } from '@/store/movieStore';
import { IMAGE_SIZES } from '@/lib/constants';
import type { Movie } from '@/types/movie';

interface FavoriteCardProps {
  movie: Movie;
}

export default function FavoriteCard({ movie }: FavoriteCardProps) {
  const { toggleFavorite } = useMovieStore();

  const handleRemove = () => {
    toggleFavorite(movie);
    toast.error('Removed from Favorites', { duration: 2000 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ duration: 0.25 }}
      className="flex gap-4 bg-gray-900/80 rounded-2xl p-4 items-start border border-white/5"
    >
      {/* Poster */}
      <Link to={`/movie/${movie.id}`} className="shrink-0">
        <div className="w-24 h-36 rounded-xl overflow-hidden bg-gray-800">
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
          <h3 className="text-white font-semibold text-base hover:text-red-400 transition-colors line-clamp-1">
            {movie.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1.5 mb-3">
          <Star size={13} className="text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-400 text-sm font-medium">
            {formatRating(movie.vote_average)}/10
          </span>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">{movie.overview}</p>

        <Link to={`/movie/${movie.id}`}>
          <Button
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-5 h-9 text-sm font-medium gap-2"
          >
            Watch Trailer
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <Play size={10} fill="#dc2626" className="text-red-600 ml-0.5" />
            </div>
          </Button>
        </Link>
      </div>

      {/* Remove favorite */}
      <button
        onClick={handleRemove}
        className="shrink-0 p-2 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors mt-1"
      >
        <Heart size={16} fill="currentColor" />
      </button>
    </motion.div>
  );
}
