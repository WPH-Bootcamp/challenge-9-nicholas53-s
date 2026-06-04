import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Heart, ArrowLeft, Star, Clock, Calendar } from 'lucide-react';
import Layout from '@/components/Layout/Layout';
import MovieGrid from '@/components/MovieGrid';
import {
  useMovieDetails,
  useMovieCredits,
  useMovieVideos,
  useSimilarMovies,
} from '@/hooks/useMovies';
import { getImageUrl, formatDate, formatRuntime, formatRating } from '@/lib/utils';
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

  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="h-[60vh] bg-gray-800" />
          <div className="max-w-7xl mx-auto px-4 py-8 space-y-4">
            <div className="h-8 bg-gray-800 rounded w-1/3" />
            <div className="h-4 bg-gray-800 rounded w-full" />
            <div className="h-4 bg-gray-800 rounded w-2/3" />
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
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* MOVIE INFO */}
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-6"
        >
          {/* Poster */}
          <div className="shrink-0 w-32 md:w-48 rounded-lg overflow-hidden shadow-2xl">
            <img
              src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium)}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 pt-8">
            <h1 className="text-white text-2xl md:text-3xl font-bold mb-2">{movie.title}</h1>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <Calendar size={14} />
              <span>{formatDate(movie.release_date)}</span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 mb-6">
              {trailer && (
                <a
                  href={`https://youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                >
                  <Play size={16} fill="white" />
                  Watch Trailer
                </a>
              )}
              <button
                onClick={() => movieAsMovie && toggleFavorite(movieAsMovie)}
                className={`p-2.5 rounded-full border transition-colors ${
                  favorite
                    ? 'bg-red-500/20 border-red-500 text-red-500'
                    : 'border-white/30 text-white hover:border-white'
                }`}
              >
                <Heart size={18} className={favorite ? 'fill-red-500' : ''} />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold">{formatRating(movie.vote_average)}</span>
                </div>
                <p className="text-gray-500 text-xs">Rating</p>
              </div>
              <div className="text-center">
                <p className="text-white font-bold mb-1">{movie.genres[0]?.name || 'N/A'}</p>
                <p className="text-gray-500 text-xs">Genre</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-white mb-1">
                  <Clock size={14} />
                  <span className="font-bold">{formatRuntime(movie.runtime ?? 0)}</span>
                </div>
                <p className="text-gray-500 text-xs">Runtime</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* OVERVIEW */}
        <div className="mt-8">
          <h2 className="text-white text-xl font-bold mb-3">Overview</h2>
          <p className="text-gray-400 leading-relaxed">{movie.overview}</p>
        </div>

        {/* CAST & CREW */}
        {credits && credits.cast.length > 0 && (
          <div className="mt-8">
            <h2 className="text-white text-xl font-bold mb-4">Cast & Crew</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {credits.cast.slice(0, 6).map((member) => (
                <div key={member.id} className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full overflow-hidden bg-gray-800 mb-2">
                    {member.profile_path ? (
                      <img
                        src={getImageUrl(member.profile_path, IMAGE_SIZES.profile.medium)}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                        N/A
                      </div>
                    )}
                  </div>
                  <p className="text-white text-xs font-medium truncate">{member.name}</p>
                  <p className="text-gray-500 text-xs truncate">{member.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SIMILAR MOVIES */}
        {similar && similar.results.length > 0 && (
          <div className="mt-8 mb-12">
            <h2 className="text-white text-xl font-bold mb-4">Similar Movies</h2>
            <MovieGrid movies={similar.results.slice(0, 5)} />
          </div>
        )}
      </div>
    </Layout>
  );
}
