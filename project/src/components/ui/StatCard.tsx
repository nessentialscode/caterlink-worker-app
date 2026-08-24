import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  label: string;
  value: string | number;
  accent?: 'brand' | 'success' | 'warning' | 'ink';
}

export function StatCard({ icon, label, value, accent = 'brand' }: Props) {
  const accents = {
    brand: 'bg-brand-50 text-brand-500',
    success: 'bg-success-50 text-success-600',
    warning: 'bg-warning-50 text-warning-600',
    ink: 'bg-ink-100 text-ink-500',
  };
  return (
    <div className="bg-white rounded-card shadow-card p-4 flex flex-col gap-3">
      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${accents[accent]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold text-ink-800 leading-none">{value}</p>
        <p className="text-[0.75rem] text-ink-500 mt-1">{label}</p>
      </div>
    </div>
  );
}
