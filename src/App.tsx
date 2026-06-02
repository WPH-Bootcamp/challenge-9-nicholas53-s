import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { usePopularMovies } from '@/hooks/useMovies';

// Komponen test sementara
function TestPage() {
  const { data, isLoading, isError } = usePopularMovies();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching movies!</div>;

  return (
    <div>
      <h1>✅ Foundation Test</h1>
      {data?.results.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/movie/:id" element={<div>Detail Page — Coming Soon</div>} />
        <Route path="/favorites" element={<div>Favorites Page — Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
