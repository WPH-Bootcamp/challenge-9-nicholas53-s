import { getImageUrl } from '@/lib/utils';
import { IMAGE_SIZES } from '@/lib/constants';
import type { CastMember } from '@/types/movie';

interface CastCardProps {
  member: CastMember;
}

export default function CastCard({ member }: CastCardProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Foto bulat */}
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800 shrink-0 ring-1 ring-white/10">
        {member.profile_path ? (
          <img
            src={getImageUrl(member.profile_path, IMAGE_SIZES.profile.small)}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
            N/A
          </div>
        )}
      </div>
      {/* Info */}
      <div className="min-w-0">
        <p className="text-white text-sm font-medium truncate">{member.name}</p>
        <p className="text-gray-500 text-xs truncate">{member.character}</p>
      </div>
    </div>
  );
}
