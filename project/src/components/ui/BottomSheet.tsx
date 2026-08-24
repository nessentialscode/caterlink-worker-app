import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function BottomSheet({ open, onClose, children }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="absolute inset-0 bg-ink-900/40 animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[430px] bg-white rounded-t-[1.5rem] shadow-sheet animate-slide-up safe-bottom">
        <div className="flex justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-ink-200" />
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full hover:bg-ink-100 active:scale-90 transition-all"
          aria-label="Close"
        >
          <X size={18} className="text-ink-500" />
        </button>
        <div className="px-5 pb-6">{children}</div>
      </div>
    </div>
  );
}
