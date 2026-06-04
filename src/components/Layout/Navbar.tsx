import { Link, useLocation } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';
import SearchBar from '@/components/SearchBar'; // ← pakai component

export default function Navbar() {
  const location = useLocation();
  const currentQuery = new URLSearchParams(location.search).get('q') || '';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <Clapperboard className="text-red-500" size={24} />
          <span>Movie</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/favorites' ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Favorites
          </Link>
        </div>

        {/* ✅ Pakai SearchBar component */}
        <SearchBar defaultValue={currentQuery} />
      </div>
    </nav>
  );
}
