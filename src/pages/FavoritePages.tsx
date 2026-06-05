import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { useMovieStore } from '@/store/movieStore';
import { getImageUrl, formatRating } from '@/lib/utils';
import { IMAGE_SIZES } from '@/lib/constants';
import Frame55 from '@/Asset/Frame55.svg';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useMovieStore();
  const navigate = useNavigate();

  const handleRemove = (movie: (typeof favorites)[0]) => {
    toggleFavorite(movie);
    toast.error('Removed from Favorites', { duration: 2000 });
  };

  return (
    <Layout>
      <div className="px-[140px] max-md:px-6 pt-24 pb-10 max-md:pt-20 max-md:pb-6">
        {/* Title */}
        <h1 className="text-white text-3xl max-md:text-2xl font-bold mb-8 max-md:mb-6">
          Favorites
        </h1>

        {/* ── EMPTY STATE ── */}
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 max-md:py-20 text-center"
          >
            <img src={Frame55} alt="empty" className="w-32 h-32 mb-6 opacity-80" />
            <p className="text-white font-semibold text-lg mb-2">Data Empty</p>
            <p className="text-gray-500 text-sm mb-8">You don't have a favorite movie yet</p>
            <Button variant="primary" size="pill" onClick={() => navigate('/')}>
              Explore Movie
            </Button>
          </motion.div>
        ) : (
          /* ── FAVORITES LIST ── */
          <AnimatePresence mode="popLayout">
            <div className="flex flex-col">
              {favorites.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
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

                    {/* Heart remove button */}
                    <button
                      onClick={() => handleRemove(movie)}
                      className="shrink-0 w-10 h-10 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500/30 flex items-center justify-center transition-colors mt-1"
                    >
                      <Heart size={16} fill="currentColor" />
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
                        onClick={() => handleRemove(movie)}
                        className="shrink-0 w-11 h-11 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  {index < favorites.length - 1 && <div className="border-b border-white/10" />}
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </Layout>
  );
}
