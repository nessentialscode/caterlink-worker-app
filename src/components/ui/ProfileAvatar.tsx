import { User } from 'lucide-react';

export function ProfileAvatar({
  name,
  size = 'md',
  imageUrl,
}: {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  imageUrl?: string;
}) {
  const dims = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-14 w-14 text-lg',
    xl: 'h-20 w-20 text-2xl',
  };
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div
      className={`${dims[size]} rounded-full flex items-center justify-center font-bold text-white bg-brand-500 overflow-hidden shrink-0`}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span>{initials || <User size={size === 'xl' ? 28 : 18} />}</span>
      )}
    </div>
  );
}
