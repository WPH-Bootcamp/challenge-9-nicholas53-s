import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { getImageUrl, formatRating } from '@/lib/utils';
import { useMovieStore } from '@/store/movieStore';
import { IMAGE_SIZES } from '@/lib/constants';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  rank?: number; // nomor ranking (untuk trending)
}

export default function MovieCard({ movie, rank }: MovieCardProps) {
  const { toggleFavorite, isFavorite } = useMovieStore();
  const favorite = isFavorite(movie.id);

  return (
    <motion.div
      // Animasi fade in + slide up saat muncul
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.03 }}
      className="relative group cursor-pointer"
    >
      {/* Nomor ranking untuk trending */}
      {rank && (
        <span className="absolute -top-3 -left-2 z-10 text-5xl font-black text-white/20 select-none">
          {rank}
        </span>
      )}

      <Link to={`/movie/${movie.id}`}>
        {/* Poster image */}
        <div className="relative rounded-lg overflow-hidden bg-gray-800 aspect-2/3">
          {movie.poster_path ? (
            <img
              src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium)}
              alt={movie.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            // Fallback kalau tidak ada poster
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
              No Image
            </div>
          )}

          {/* Overlay gelap saat hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
        </div>

        {/* Info film */}
        <div className="mt-2 px-1">
          <h3 className="text-white text-[18px] font-semibold truncate">{movie.title}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-gray-400 text-[16px]">{formatRating(movie.vote_average)}/10</span>
          </div>
        </div>
      </Link>

      {/* Tombol favorite — di luar Link agar tidak trigger navigate */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(movie);
        }}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart size={16} className={favorite ? 'fill-red-500 text-red-500' : 'text-white'} />
      </button>
    </motion.div>
  );
}
