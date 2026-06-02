import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Construct full TMDB image URL dari relative path
export function getImageUrl(path: string | null, size: string = 'original'): string {
  if (!path) return '/placeholder-poster.png'; // fallback kalau path kosong
  const baseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  return `${baseUrl}/${size}${path}`;
}

// Format tanggal: "2024-03-15" → "15 March 2024"
export function formatDate(dateString: string): string {
  if (!dateString) return 'Unknown';
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Format runtime: 142 → "2h 22m"
export function formatRuntime(minutes: number): string {
  if (!minutes) return 'Unknown';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

// Format rating: 7.5432 → "7.5"
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
