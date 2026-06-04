import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod schema — validasi input search
const searchSchema = z.object({
  query: z.string().min(1, 'Search cannot be empty').max(100, 'Search too long').trim(),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = 'Search Movie',
  defaultValue = '',
  onSearch,
  className = '',
}: SearchBarProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: defaultValue },
  });

  // Watch nilai input untuk tampilkan tombol clear
  const queryValue = watch('query');

  const onSubmit = (data: SearchFormData) => {
    if (onSearch) {
      onSearch(data.query);
    } else {
      navigate(`/?q=${encodeURIComponent(data.query)}`);
    }
  };

  const handleClear = () => {
    reset({ query: '' });
    if (onSearch) {
      onSearch('');
    } else {
      navigate('/');
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3 text-gray-400 pointer-events-none" />
          <input
            {...register('query')}
            type="text"
            placeholder={placeholder}
            className="bg-white/10 text-white text-sm placeholder:text-gray-400 pl-9 pr-8 py-2 rounded-full w-48 focus:outline-none focus:ring-1 focus:ring-white/30 focus:w-64 transition-all"
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
        {/* Error message dari Zod */}
        {errors.query && <p className="text-red-400 text-xs mt-1 pl-3">{errors.query.message}</p>}
      </form>
    </div>
  );
}
