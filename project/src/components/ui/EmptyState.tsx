import type { ReactNode } from 'react';
import { Button } from './Button';

interface Props {
  icon: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="h-20 w-20 rounded-full bg-ink-100 flex items-center justify-center mb-4 text-ink-400">
        {icon}
      </div>
      <h3 className="font-semibold text-ink-800 text-base mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-ink-500 max-w-[260px] mb-5">{description}</p>
      )}
      {actionLabel && (
        <Button size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
