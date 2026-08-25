import { Star } from 'lucide-react';

export function RatingDisplay({
  rating,
  size = 'sm',
  showLabel = false,
}: {
  rating: number;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}) {
  const star = size === 'sm' ? 14 : 17;
  return (
    <span className="inline-flex items-center gap-1">
      <Star size={star} className="text-warning-500 fill-warning-500" />
      <span className={`font-semibold text-ink-800 ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
        {rating.toFixed(1)}
      </span>
      {showLabel && <span className="text-xs text-ink-500">rating</span>}
    </span>
  );
}
