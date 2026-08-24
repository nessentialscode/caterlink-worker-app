import type { ApplicationStatus } from '@/types';
import { STATUS_META } from '@/store/AppContext';

export function StatusBadge({
  status,
  size = 'md',
}: {
  status: ApplicationStatus;
  size?: 'sm' | 'md';
}) {
  const meta = STATUS_META[status];
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[0.6875rem]' : 'px-2.5 py-1 text-xs';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-chip font-semibold ${meta.bg} ${meta.text} ${padding}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}
