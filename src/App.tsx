import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import MovieDetailPage from '@/pages/MovieDetailPage';
import FavoritesPage from '@/pages/FavoritePages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                <p className="text-gray-400 mb-6">Page not found</p>
                <a href="/" className="text-red-500 hover:underline">
                  Back to Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
