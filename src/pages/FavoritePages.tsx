import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Play, Clapperboard } from 'lucide-react';
import Layout from '@/components/Layout/Layout';
import { useMovieStore } from '@/store/movieStore';
import { getImageUrl, formatRating } from '@/lib/utils';
import { IMAGE_SIZES } from '@/lib/constants';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useMovieStore();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-white text-2xl font-bold mb-6">Favorites</h1>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-gray-500"
          >
            <Clapperboard size={64} className="mb-4 text-gray-700" />
            <p className="text-lg font-medium text-white mb-1">Data Empty</p>
            <p className="text-sm text-gray-500 mb-6">You don't have a favorite movie yet</p>
            <Link
              to="/"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
            >
              Explore Movie
            </Link>
          </motion.div>
        ) : (
          // Favorites List
          <AnimatePresence>
            <div className="flex flex-col gap-4">
              {favorites.map((movie) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-4 bg-gray-900 rounded-xl p-4 items-start"
                >
                  {/* Poster */}
                  <Link to={`/movie/${movie.id}`} className="shrink-0">
                    <img
                      src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.small)}
                      alt={movie.title}
                      className="w-24 h-36 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/movie/${movie.id}`}>
                      <h3 className="text-white font-semibold text-lg hover:text-red-400 transition-colors truncate">
                        {movie.title}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-1 mb-2">
                      <span className="text-yellow-400 text-sm">⭐</span>
                      <span className="text-yellow-400 text-sm font-medium">
                        {formatRating(movie.vote_average)}/10
                      </span>
                    </div>

                    {/* Overview */}
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">{movie.overview}</p>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/movie/${movie.id}`}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                      >
                        <Play size={14} fill="white" />
                        Watch Trailer
                      </Link>
                    </div>
                  </div>

                  {/* Remove favorite button */}
                  <button
                    onClick={() => toggleFavorite(movie)}
                    className="shrink-0 p-2 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors"
                  >
                    <Heart size={18} fill="currentColor" />
                  </button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </Layout>
  );
}
