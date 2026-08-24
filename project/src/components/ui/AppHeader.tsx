import type { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';

interface Props {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: ReactNode;
  showBack?: boolean;
  transparent?: boolean;
}

export function AppHeader({
  title,
  subtitle,
  onBack,
  rightAction,
  showBack = false,
  transparent = false,
}: Props) {
  return (
    <header
      className={`sticky top-0 z-30 safe-top ${
        transparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-lg border-b border-ink-200'
      }`}
    >
      <div className="flex items-center gap-2 px-5 h-14">
        {showBack && (
          <button
            onClick={onBack}
            className="flex items-center justify-center h-10 w-10 -ml-2 rounded-full hover:bg-ink-100 active:scale-90 transition-transform shrink-0"
            aria-label="Go back"
          >
            <ChevronLeft size={22} className="text-ink-800" />
          </button>
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <h1 className="font-bold text-ink-800 text-[1.0625rem] leading-tight truncate">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-xs text-ink-500 truncate">{subtitle}</p>
          )}
        </div>
        {rightAction}
      </div>
    </header>
  );
}
