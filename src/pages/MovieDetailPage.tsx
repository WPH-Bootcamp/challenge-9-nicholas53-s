import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Heart, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Layout from '@/components/Layout/Layout';
import MovieGrid from '@/components/MovieGrid';
import CastCard from '@/components/CastCard';
import StatBadge from '@/components/StateBadge';
import {
  useMovieDetails,
  useMovieCredits,
  useMovieVideos,
  useSimilarMovies,
} from '@/hooks/useMovies';
import { getImageUrl, formatDate, formatRating } from '@/lib/utils';
import { IMAGE_SIZES } from '@/lib/constants';
import { useMovieStore } from '@/store/movieStore';
import type { Movie } from '@/types/movie';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = Number(id);

  const { toggleFavorite, isFavorite } = useMovieStore();
  const { data: movie, isLoading, isError } = useMovieDetails(movieId);
  const { data: credits } = useMovieCredits(movieId);
  const { data: videos } = useMovieVideos(movieId);
  const { data: similar } = useSimilarMovies(movieId);

  const trailer = videos?.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  const favorite = isFavorite(movieId);

  const movieAsMovie: Movie | undefined = movie
    ? {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        genre_ids: movie.genres.map((g) => g.id),
        popularity: movie.popularity,
        adult: movie.adult,
        original_language: movie.original_language,
        original_title: movie.original_title,
      }
    : undefined;

  const handleFavorite = () => {
    if (!movieAsMovie) return;
    toggleFavorite(movieAsMovie);
    if (!favorite) {
      toast.success('Success Add to Favorites', {
        duration: 2000,
        icon: '✅',
      });
    } else {
      toast.error('Removed from Favorites', {
        duration: 2000,
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div>
          <Skeleton className="h-[55vh] w-full bg-gray-800" />
          <div className="px-[140px] max-md:px-6 py-8 space-y-4">
            <Skeleton className="h-8 w-1/3 bg-gray-800 rounded" />
            <Skeleton className="h-4 w-full bg-gray-800 rounded" />
            <Skeleton className="h-4 w-2/3 bg-gray-800 rounded" />
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !movie) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
          <p className="text-xl mb-4">Movie not found</p>
          <button onClick={() => navigate('/')} className="text-red-500 hover:underline">
            Back to Home
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* BACKDROP */}
      <div className="relative w-full h-[55vh] overflow-hidden">
        <img
          src={getImageUrl(movie.backdrop_path, IMAGE_SIZES.backdrop.large)}
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* MOVIE INFO */}
      <div className="px-[140px] max-md:px-6 -mt-36 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-6 items-end"
        >
          {/* Poster */}
          <div className="shrink-0 w-32 md:w-44 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <img
              src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium)}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 pb-2">
            <p className="text-gray-400 text-sm mb-2 flex items-center gap-1.5">
              📅 {formatDate(movie.release_date)}
            </p>
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-tight">
              {movie.title}
            </h1>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {trailer ? (
                <a
                  href={`https://youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 h-10 text-sm font-medium gap-2">
                    Watch Trailer
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <Play size={10} fill="#dc2626" className="text-red-600 ml-0.5" />
                    </div>
                  </Button>
                </a>
              ) : (
                <Button
                  disabled
                  className="bg-gray-700 text-gray-400 rounded-full px-6 h-10 text-sm font-medium gap-2 cursor-not-allowed"
                >
                  No Trailer Available
                </Button>
              )}

              {/* Favorite button */}
              <button
                onClick={handleFavorite}
                className={`p-2.5 rounded-full border transition-all duration-200 ${
                  favorite
                    ? 'bg-red-500/20 border-red-500 text-red-500'
                    : 'border-white/30 text-white hover:border-white hover:bg-white/10'
                }`}
              >
                <Heart size={18} className={favorite ? 'fill-red-500' : ''} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* STAT BADGES */}
        <div className="grid grid-cols-3 gap-4 mt-8 max-w-md">
          <StatBadge type="rating" value={formatRating(movie.vote_average)} label="Rating" />
          <StatBadge type="genre" value={movie.genres[0]?.name || 'N/A'} label="Genre" />
          <StatBadge type="ageLimit" value={movie.adult ? '18+' : '13'} label="Age Limit" />
        </div>

        {/* OVERVIEW */}
        <div className="mt-8">
          <h2 className="text-white text-xl font-bold mb-3">Overview</h2>
          <p className="text-gray-400 leading-relaxed max-w-3xl">{movie.overview}</p>
        </div>

        {/* CAST & CREW */}
        {credits && credits.cast.length > 0 && (
          <div className="mt-8">
            <h2 className="text-white text-xl font-bold mb-4">Cast & Crew</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {credits.cast.slice(0, 6).map((member) => (
                <CastCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* SIMILAR MOVIES */}
        {similar && similar.results.length > 0 && (
          <div className="mt-10 mb-12">
            <h2 className="text-white text-xl font-bold mb-4">Similar Movies</h2>
            <MovieGrid movies={similar.results.slice(0, 5)} />
          </div>
        )}
      </div>
    </Layout>
  );
}
