import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Layout from '@/components/Layout/Layout';
import { useMovieDetails, useMovieCredits, useMovieVideos } from '@/hooks/useMovies';
import { getImageUrl, formatDate, formatRating } from '@/lib/utils';
import { IMAGE_SIZES } from '@/lib/constants';
import { useMovieStore } from '@/store/movieStore';
import type { Movie } from '@/types/movie';
import CalendarSvg from '@/Asset/Calendar.svg';
import StarSvg from '@/Asset/Star.svg';
import VideoSvg from '@/Asset/video.svg';
import EmojiSvg from '@/Asset/emoji-happy.svg';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = Number(id);

  const { toggleFavorite, isFavorite } = useMovieStore();
  const { data: movie, isLoading, isError } = useMovieDetails(movieId);
  const { data: credits } = useMovieCredits(movieId);
  const { data: videos } = useMovieVideos(movieId);

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
      toast.success('Success Add to Favorites', { duration: 2000, icon: '✅' });
    } else {
      toast.error('Removed from Favorites', { duration: 2000 });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Skeleton className="h-[55vh] w-full bg-gray-800" />
        <div className="px-[140px] max-md:px-6 py-8 space-y-4">
          <Skeleton className="h-8 w-1/3 bg-gray-800 rounded" />
          <Skeleton className="h-4 w-full bg-gray-800 rounded" />
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
      {/* ══════════════════════════════
          DESKTOP
      ══════════════════════════════ */}
      <div className="hidden md:block relative w-full" style={{ height: '620px' }}>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={getImageUrl(movie.backdrop_path, IMAGE_SIZES.backdrop.large)}
            alt={movie.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 left-0 right-0 px-[140px] pb-8"
        >
          <div className="flex gap-8">
            <div
              className="shrink-0 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
              style={{ width: '190px', height: '280px' }}
            >
              <img
                src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium)}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col justify-end gap-4">
              <h1 className="text-white text-3xl font-bold leading-tight">{movie.title}</h1>
              <div className="flex items-center gap-2 text-white text-sm">
                <img src={CalendarSvg} alt="calendar" className="w-4 h-4 opacity-70" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
              <div className="flex items-center gap-4">
                {trailer && (
                  <a
                    href={`https://youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6 h-11 text-sm font-semibold gap-2">
                      Watch Trailer
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <Play size={10} fill="#dc2626" className="text-red-600 ml-0.5" />
                      </div>
                    </Button>
                  </a>
                )}
                <button
                  onClick={handleFavorite}
                  className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${favorite ? 'bg-red-500/20 border-red-500 text-red-500' : 'border-white/40 text-white hover:border-white'}`}
                >
                  <Heart size={18} className={favorite ? 'fill-red-500' : ''} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {[
                  {
                    icon: StarSvg,
                    label: 'Rating',
                    value: `${formatRating(movie.vote_average)}/10`,
                  },
                  { icon: VideoSvg, label: 'Genre', value: movie.genres[0]?.name || 'N/A' },
                  { icon: EmojiSvg, label: 'Age Limit', value: movie.adult ? '18+' : '13' },
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 rounded-2xl py-4 px-4 border border-[#252B37]"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 1) ' }}
                  >
                    <img src={icon} alt={label} className="w-6 h-6" />
                    <span className="text-gray-400 text-xs">{label}</span>
                    <span className="text-white font-bold text-base">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════
          MOBILE 
      ══════════════════════════════ */}
      <div className="md:hidden">
        <div className="relative w-full h-65">
          <img
            src={getImageUrl(movie.backdrop_path, IMAGE_SIZES.backdrop.large)}
            alt={movie.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-6 py-5 bg-black"
        >
          {/* ROW: Poster + Title/Date  */}
          <div className="flex gap-4 items-start mb-5">
            <div className="shrink-0 w-[110px] h-[165px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <img
                src={getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium)}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 pt-1">
              <h1 className="text-white text-lg font-bold leading-snug mb-3">{movie.title}</h1>
              <div className="flex items-center gap-1.5 text-white text-xs">
                <img src={CalendarSvg} alt="calendar" className="w-3.5 h-3.5 opacity-70" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
            </div>
          </div>

          {/* Watch Trailer full width + Heart */}
          <div className="flex items-center gap-3 mb-4">
            {trailer && (
              <a
                href={`https://youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full h-11 text-sm font-semibold gap-2">
                  Watch Trailer
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <Play size={10} fill="#dc2626" className="text-red-600 ml-0.5" />
                  </div>
                </Button>
              </a>
            )}
            <button
              onClick={handleFavorite}
              className={`w-11 h-11 shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${favorite ? 'bg-red-500/20 border-red-500 text-red-500' : 'border-white/40 text-white'}`}
            >
              <Heart size={16} className={favorite ? 'fill-red-500' : ''} />
            </button>
          </div>

          {/* Stat boxes */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: StarSvg, label: 'Rating', value: `${formatRating(movie.vote_average)}/10` },
              { icon: VideoSvg, label: 'Genre', value: movie.genres[0]?.name || 'N/A' },
              { icon: EmojiSvg, label: 'Age Limit', value: movie.adult ? '18+' : '13' },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1.5 rounded-2xl py-3 px-2 border border-[#252B37]"
                style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}
              >
                <img src={icon} alt={label} className="w-5 h-5" />
                <span className="text-gray-400 text-[10px]">{label}</span>
                <span className="text-white font-bold text-sm">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* KONTEN BAWAH */}
      <div className="px-35 max-md:px-6 mt-10 max-md:mt-0 max-md:bg-black max-md:px-6 max-md:py-6">
        <div>
          <h2 className="text-white text-2xl max-md:text-xl font-bold mb-4">Overview</h2>
          <p className="text-gray-400 leading-relaxed max-w-4xl text-[16px] max-md:text-sm">
            {movie.overview}
          </p>
        </div>
        {credits && credits.cast.length > 0 && (
          <div className="mt-10 mb-38 max-md:mt-8 max-md:mb-12">
            <h2 className="text-white text-2xl max-md:text-xl font-bold mb-6">Cast & Crew</h2>
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-x-8 gap-y-6 max-md:gap-y-4">
              {credits.cast.slice(0, 6).map((member) => (
                <div key={member.id} className="flex items-center gap-4">
                  <div
                    className="rounded-[10px] overflow-hidden bg-gray-800 shrink-0 ring-1 ring-white/10"
                    style={{ width: '69px', height: '104px' }}
                  >
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
                  <div className="min-w-0">
                    <p className="text-white text-sm font-semibold">{member.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5 truncate">{member.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
