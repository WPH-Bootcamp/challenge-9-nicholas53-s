import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { getImageUrl, formatRating } from '@/lib/utils';
import { useMovieStore } from '@/store/movieStore';
import { IMAGE_SIZES } from '@/lib/constants';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  rank?: number;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { toggleFavorite, isFavorite } = useMovieStore();
  const favorite = isFavorite(movie.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(movie);
    if (!favorite) {
      toast.success('Success Add to Favorites', { duration: 2000, icon: '✅' });
    } else {
      toast.error('Removed from Favorites', { duration: 2000 });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative group cursor-pointer w-full"
    >
      <Link to={`/movie/${movie.id}`}>
        {/* Poster — aspect ratio 2/3, width mengikuti grid */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-800 aspect-[2/3] w-full">
          {movie.poster_path ? (
            <img
              src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium)}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600 text-xs">
              No Image
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
        </div>

        {/* Info */}
        <div className="mt-3 px-0.5">
          <h3 className="text-white text-sm font-semibold truncate leading-tight">{movie.title}</h3>
          <div className="flex items-center gap-1 mt-1.5">
            <Star size={13} className="text-yellow-400 fill-yellow-400" />
            <span className="text-gray-400 text-sm">{formatRating(movie.vote_average)}/10</span>
          </div>
        </div>
      </Link>

      {/* Favorite button */}
      <button
        onClick={handleFavorite}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <Heart size={14} className={favorite ? 'fill-red-500 text-red-500' : 'text-white'} />
      </button>
    </motion.div>
  );
}
