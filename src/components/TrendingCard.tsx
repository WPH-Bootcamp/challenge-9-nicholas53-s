import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { getImageUrl, formatRating } from '@/lib/utils';
import { useMovieStore } from '@/store/movieStore';
import { IMAGE_SIZES } from '@/lib/constants';
import type { Movie } from '@/types/movie';

interface TrendingCardProps {
  movie: Movie;
  rank: number;
}

export default function TrendingCard({ movie, rank }: TrendingCardProps) {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: rank * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="relative group cursor-pointer shrink-0 w-[216px]"
    >
      <Link to={`/movie/${movie.id}`}>
        {/* Poster */}
        <div className="relative rounded-2xl overflow-hidden w-54 h-80.25">
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
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

          {/* Ranking badge — bulat abu-abu pojok kiri atas */}
          <div className="absolute top-3 left-3 w-12 h-12 rounded-full bg-[#0A0D1299] backdrop-blur-[34.29] flex items-center justify-center border border-none">
            <span className="text-white text- font-bold">{rank}</span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-3 px-0.5">
          <h3 className="text-white text-[18px] font-semibold truncate leading-tight">
            {movie.title}
          </h3>
          <div className="flex items-center gap-1 mt-1.5">
            <Star size={13} className="text-yellow-400 fill-yellow-400" />
            <span className="text-gray-400 text-[16px]">{formatRating(movie.vote_average)}/10</span>
          </div>
        </div>
      </Link>

      {/* Favorite button */}
      <button
        onClick={handleFavorite}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <Heart size={14} className={favorite ? 'fill-red-500 text-red-500' : 'text-white'} />
      </button>
    </motion.div>
  );
}
