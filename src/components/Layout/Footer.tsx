import { Clapperboard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold">
          <Clapperboard size={20} className="text-red-500" />
          <span>Movie</span>
        </div>
        <p className="text-gray-500 text-sm">Copyright ©2025 Movie Explorer</p>
      </div>
    </footer>
  );
}
