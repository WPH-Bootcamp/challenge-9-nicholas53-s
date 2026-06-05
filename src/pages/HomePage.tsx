import { useRef, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ChevronRight, ChevronLeft } from 'lucide-react';
import Layout from '@/components/Layout/Layout';
import TrendingCard from '@/components/TrendingCard';
import NewReleaseSection from '@/components/NewReleaseSection';
import { Button } from '@/components/ui/button';
import { usePopularMovies, useNowPlayingMovies, useSearchMovies } from '@/hooks/useMovies';
import { getImageUrl } from '@/lib/utils';
import { IMAGE_SIZES } from '@/lib/constants';
import SearchResults from '@/components/SearchResult';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const navigate = useNavigate();
  const trendingRef = useRef<HTMLDivElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const { data: popularData, isLoading: popularLoading } = usePopularMovies();
  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useNowPlayingMovies();
  const { data: searchData, isLoading: searchLoading } = useSearchMovies(searchQuery);

  const heroMovie = popularData?.results[0];

  const handleScroll = () => {
    const el = trendingRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 10);
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    setShowRightArrow(!isAtEnd);
  };

  useEffect(() => {
    const el = trendingRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, [popularData]);

  const scrollLeft = () => trendingRef.current?.scrollBy({ left: -500, behavior: 'smooth' });
  const scrollRight = () => trendingRef.current?.scrollBy({ left: 500, behavior: 'smooth' });

  return (
    <Layout>
      {/* ── SEARCH RESULTS ── */}
      {searchQuery ? (
        <SearchResults
          query={searchQuery}
          movies={searchData?.results || []}
          isLoading={searchLoading}
        />
      ) : (
        <>
          {/* ════════════════════════
              HERO SECTION
          ════════════════════════ */}
          {heroMovie && (
            <div className="relative w-full h-screen min-h-[600px] max-h-[810px] overflow-hidden">
              {/* Backdrop */}
              <img
                src={getImageUrl(heroMovie.backdrop_path, IMAGE_SIZES.backdrop.original)}
                alt={heroMovie.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 " />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Hero Content */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="absolute bottom-0 left-0 right-0 pb-16 px-[140px] max-md:px-6"
              >
                {/* ── DESKTOP layout ── */}
                <div className="hidden md:block max-w-145">
                  <h1 className="text-white text-5xl font-bold leading-tight mb-4">
                    {heroMovie.title}
                  </h1>
                  <p className="text-gray-400 text-base leading-relaxed mb-8 line-clamp-3">
                    {heroMovie.overview}
                  </p>
                  <div className="flex items-center gap-4">
                    {/* Watch Trailer desktop */}
                    <Button
                      variant="primary"
                      size="hero"
                      onClick={() => navigate(`/movie/${heroMovie.id}`)}
                    >
                      Watch Trailer
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center ml-1">
                        <Play size={12} fill="#dc2626" className="text-red-600 ml-0.5" />
                      </div>
                    </Button>

                    {/* See Detail desktop */}
                    <Button
                      variant="outlineWhite"
                      size="hero"
                      onClick={() => navigate(`/movie/${heroMovie.id}`)}
                      style={{
                        backgroundColor: 'rgba(24, 29, 39, 0.6)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: '1px solid rgba(24, 29, 39, 1)',
                      }}
                    >
                      See Detail
                    </Button>
                  </div>
                </div>

                {/* ── MOBILE layout — */}
                <div className="md:hidden w-full">
                  <h1 className="text-white text-3xl font-bold leading-tight mb-3">
                    {heroMovie.title}
                  </h1>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {heroMovie.overview}
                  </p>

                  {/* Buttons stack vertikal */}
                  <div className="flex flex-col gap-3 w-full">
                    {/* Watch Trailer mobile */}
                    <button
                      onClick={() => navigate(`/movie/${heroMovie.id}`)}
                      className="w-full h-13 bg-red-600 hover:bg-red-700 text-white font-semibold text-base rounded-full flex items-center justify-center gap-2 transition-colors"
                    >
                      Watch Trailer
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <Play size={12} fill="#dc2626" className="text-red-600 ml-0.5" />
                      </div>
                    </button>

                    {/* See Detail mobile —*/}
                    <button
                      onClick={() => navigate(`/movie/${heroMovie.id}`)}
                      className="w-full h-13 text-white font-semibold text-base rounded-full flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: 'rgba(24, 29, 39, 0.6)',
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      See Detail
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* CONTENT SECTIONS */}
          <div className="px-35 max-md:px-6 py-12 space-y-14">
            {/* TRENDING NOW */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-2xl font-bold">Trending Now</h2>
              </div>

              <div className="relative">
                <div
                  className={`absolute left-0 top-0 bottom-4 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showLeftArrow ? 'opacity-100' : 'opacity-0'}`}
                />
                <div
                  className={`absolute right-0 top-0 bottom-4 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0'}`}
                />

                {showLeftArrow && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={scrollLeft}
                    className="absolute left-4 top-1/2 -translate-y-8 w-10 h-10 rounded-full bg-gray-800/90 hover:bg-gray-700 border border-white/20 flex items-center justify-center text-white z-20 shadow-lg"
                  >
                    <ChevronLeft size={18} />
                  </motion.button>
                )}

                {showRightArrow && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={scrollRight}
                    className="absolute right-4 top-1/2 -translate-y-8 w-10 h-10 rounded-full bg-gray-800/90 hover:bg-gray-700 border border-white/20 flex items-center justify-center text-white z-20 shadow-lg"
                  >
                    <ChevronRight size={18} />
                  </motion.button>
                )}

                <div
                  ref={trendingRef}
                  onScroll={handleScroll}
                  className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
                >
                  {popularLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex-shrink-0 w-[220px] animate-pulse">
                          <div className="bg-gray-800 rounded-2xl aspect-2/3" />
                          <div className="mt-3 h-4 bg-gray-800 rounded w-3/4" />
                          <div className="mt-2 h-3 bg-gray-800 rounded w-1/3" />
                        </div>
                      ))
                    : popularData?.results
                        .slice(0, 10)
                        .map((movie, index) => (
                          <TrendingCard key={movie.id} movie={movie} rank={index + 1} />
                        ))}
                </div>
              </div>
            </section>

            {/* NEW RELEASE */}
            <NewReleaseSection
              movies={nowPlayingData?.results || []}
              isLoading={nowPlayingLoading}
            />
          </div>
        </>
      )}
    </Layout>
  );
}
