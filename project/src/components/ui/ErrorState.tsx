import { Button } from './Button';
import { CloudOff } from 'lucide-react';

interface Props {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  description = "We couldn't load this right now. Please try again.",
  onRetry,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="h-20 w-20 rounded-full bg-error-50 flex items-center justify-center mb-4 text-error-500">
        <CloudOff size={36} />
      </div>
      <h3 className="font-semibold text-ink-800 text-base mb-1">{title}</h3>
      <p className="text-sm text-ink-500 max-w-[260px] mb-5">{description}</p>
      {onRetry && (
        <Button size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
