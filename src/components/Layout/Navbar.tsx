import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Logo from '@/Asset/Logo.svg';

const searchSchema = z.object({
  query: z.string().min(1).max(100).trim(),
});
type SearchFormData = z.infer<typeof searchSchema>;

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu saat route berubah
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname]);

  const { register, handleSubmit, watch, reset } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: '' },
  });

  const queryValue = watch('query');

  const onSubmit = (data: SearchFormData) => {
    navigate(`/?q=${encodeURIComponent(data.query)}`);
    setMobileSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const handleClear = () => {
    reset({ query: '' });
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Favorites', path: '/favorites' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ── NAVBAR BAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="px-[140px] max-md:px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img src={Logo} alt="Movie" className="h-8 w-auto" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10 ml-16">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm transition-colors ${
                  isActive(link.path) ? 'text-white font-medium' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex-1" />

          {/* Desktop Search */}
          <form onSubmit={handleSubmit(onSubmit)} className="hidden md:flex items-center">
            <div className="relative flex items-center">
              <Search
                size={15}
                className="absolute left-4 text-gray-400 pointer-events-none z-10"
              />
              <input
                {...register('query')}
                type="text"
                placeholder="Search Movie"
                className="bg-white/10 backdrop-blur-sm text-white text-sm placeholder:text-gray-400 pl-11 pr-10 py-3 rounded-2xl w-56 border border-white/10 focus:outline-none focus:border-white/30 transition-all duration-300"
              />
              {queryValue && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-3 text-gray-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </form>

          {/* Mobile Right Icons */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => {
                setMobileSearchOpen(!mobileSearchOpen);
                setMobileMenuOpen(false);
              }}
              className="text-white"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setMobileSearchOpen(false);
              }}
              className="text-white"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {mobileSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-black/95 overflow-hidden"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-3">
                <div className="relative flex items-center">
                  <Search
                    size={15}
                    className="absolute left-4 text-gray-400 pointer-events-none z-10"
                  />
                  <input
                    {...register('query')}
                    type="text"
                    placeholder="Search Movie"
                    autoFocus
                    className="w-full bg-white/10 text-white text-sm placeholder:text-gray-400 pl-11 pr-10 py-3 rounded-2xl border border-white/10 focus:outline-none"
                  />
                  {queryValue && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="absolute right-3 text-gray-400 hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── MOBILE FULLSCREEN MENU — */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-black md:hidden flex flex-col"
          >
            {/* Header menu — Logo + X button */}
            <div className="px-6 h-[72px] flex items-center justify-between border-b border-white/5">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="shrink-0">
                <img src={Logo} alt="Movie" className="h-8 w-auto" />
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white p-1">
                <X size={24} />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col px-6 pt-8 gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-4 text-lg border-b border-white/5 transition-colors ${
                      isActive(link.path)
                        ? 'text-white font-semibold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
