import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MovieGrid from '@/components/MovieGrid';
import type { Movie } from '@/types/movie';

interface NewReleaseSectionProps {
  movies: Movie[];
  isLoading: boolean;
}

const INITIAL_COUNT = 10;
const LOAD_MORE_COUNT = 10;

export default function NewReleaseSection({ movies, isLoading }: NewReleaseSectionProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const displayedMovies = movies.slice(0, visibleCount);
  const hasMore = visibleCount < movies.length;

  return (
    <section className="pb-12">
      <h2 className="text-white text-2xl font-bold mb-5">New Release</h2>

      {/* Container dengan relative */}
      <div className="relative">
        <MovieGrid movies={displayedMovies} isLoading={isLoading} />

        {/* Fade gradient + Load More */}
        {!isLoading && hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-0 left-0 right-0 h-80 flex flex-col items-center justify-end pb-6"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.85) 70%, #000000 100%)',
            }}
          >
            <Button
              variant="outlineWhite"
              size="hero"
              onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_COUNT)}
              className="relative z-10"
              style={{
                backgroundColor: 'rgba(10, 13, 18, 0.6)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(24, 29, 39, 1)',
              }}
            >
              Load More
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
