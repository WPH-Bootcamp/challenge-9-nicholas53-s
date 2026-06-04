import { Star, Tv, Clock, AlertCircle } from 'lucide-react';

type StatType = 'rating' | 'genre' | 'runtime' | 'ageLimit';

interface StatBadgeProps {
  type: StatType;
  value: string | number;
  label: string;
}

const iconMap: Record<StatType, React.ReactNode> = {
  rating: <Star size={20} className="text-yellow-400 fill-yellow-400" />,
  genre: <Tv size={20} className="text-white" />,
  runtime: <Clock size={20} className="text-white" />,
  ageLimit: <AlertCircle size={20} className="text-white" />,
};

export default function StatBadge({ type, value, label }: StatBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-2 bg-gray-900/60 rounded-2xl px-4 py-4 border border-white/5">
      {iconMap[type]}
      <span
        className={`font-bold text-base ${type === 'rating' ? 'text-yellow-400' : 'text-white'}`}
      >
        {value}
      </span>
      <span className="text-gray-500 text-xs">{label}</span>
    </div>
  );
}
