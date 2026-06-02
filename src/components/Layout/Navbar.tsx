import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, X, Clapperboard } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const currentQuery = new URLSearchParams(location.search).get('q') || '';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <Clapperboard className="text-red-500" size={24} />
          <span>Movie</span>
        </Link>

        {/* Nav Links */}
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

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative flex items-center">
            <Search size={16} className="absolute left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search Movie"
              value={searchQuery || currentQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 text-white text-sm placeholder:text-gray-400 pl-9 pr-8 py-2 rounded-full w-48 focus:outline-none focus:ring-1 focus:ring-white/30 focus:w-64 transition-all"
            />
            {(searchQuery || currentQuery) && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 text-gray-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </form>
      </div>
    </nav>
  );
}
