import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Info, ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout/Layout';
import MovieGrid from '@/components/MovieGrid';
import MovieCard from '@/components/MovieCard';
import { usePopularMovies, useNowPlayingMovies, useSearchMovies } from '@/hooks/useMovies';
import { getImageUrl, formatRating } from '@/lib/utils';
import { IMAGE_SIZES } from '@/lib/constants';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const navigate = useNavigate();

  // Fetch data
  const { data: popularData, isLoading: popularLoading } = usePopularMovies();
  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useNowPlayingMovies();
  const { data: searchData, isLoading: searchLoading } = useSearchMovies(searchQuery);

  // Film pertama dari popular = hero
  const heroMovie = popularData?.results[0];

  return (
    <Layout>
      {/* Kalau ada search query, tampilkan hasil search */}
      {searchQuery ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-white text-xl font-bold mb-6">Search results for "{searchQuery}"</h2>
          <MovieGrid movies={searchData?.results || []} isLoading={searchLoading} />
        </div>
      ) : (
        <>
          {/* ===== HERO SECTION ===== */}
          {heroMovie && (
            <div className="relative w-full h-[70vh] overflow-hidden">
              {/* Background backdrop */}
              <img
                src={getImageUrl(heroMovie.backdrop_path, IMAGE_SIZES.backdrop.large)}
                alt={heroMovie.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {/* Hero content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute bottom-16 left-0 max-w-7xl mx-auto px-4 w-full"
              >
                <div className="max-w-lg">
                  <h1 className="text-white text-4xl font-bold mb-3">{heroMovie.title}</h1>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-white font-medium">
                      {formatRating(heroMovie.vote_average)}/10
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-3 mb-6">{heroMovie.overview}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => navigate(`/movie/${heroMovie.id}`)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                    >
                      <Play size={16} fill="white" />
                      Watch Trailer
                    </button>
                    <button
                      onClick={() => navigate(`/movie/${heroMovie.id}`)}
                      className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors backdrop-blur-sm"
                    >
                      <Info size={16} />
                      See Detail
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
            {/* ===== TRENDING NOW ===== */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-xl font-bold">Trending Now</h2>
                <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                  See all <ChevronRight size={16} />
                </button>
              </div>
              {/* Horizontal scroll untuk trending */}
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {popularLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex-shrink-0 w-36 animate-pulse">
                        <div className="bg-gray-800 rounded-lg aspect-[2/3]" />
                      </div>
                    ))
                  : popularData?.results.slice(0, 10).map((movie, index) => (
                      <div key={movie.id} className="flex-shrink-0 w-36">
                        <MovieCard movie={movie} rank={index + 1} />
                      </div>
                    ))}
              </div>
            </section>

            {/* ===== NEW RELEASE ===== */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-xl font-bold">New Release</h2>
              </div>
              <MovieGrid movies={nowPlayingData?.results || []} isLoading={nowPlayingLoading} />
            </section>
          </div>
        </>
      )}
    </Layout>
  );
}
