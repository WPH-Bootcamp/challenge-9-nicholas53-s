import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout/Layout';
import FavoriteCard from '@/components/FavoriteCard';
import { EmptyState } from '@/components/MovieGrid';
import { useMovieStore } from '@/store/movieStore';

export default function FavoritesPage() {
  const { favorites } = useMovieStore();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="px-[140px] max-md:px-6 py-10">
        <h1 className="text-white text-2xl font-bold mb-6">Favorites</h1>

        {favorites.length === 0 ? (
          <EmptyState type="favorites" onExplore={() => navigate('/')} />
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-4">
              {favorites.map((movie) => (
                <FavoriteCard key={movie.id} movie={movie} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </Layout>
  );
}
