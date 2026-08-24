import { UtensilsCrossed } from 'lucide-react';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const dims = {
    sm: 'h-9 w-9 rounded-xl',
    md: 'h-12 w-12 rounded-2xl',
    lg: 'h-16 w-16 rounded-2xl',
    xl: 'h-20 w-20 rounded-[1.5rem]',
  };
  const icon = {
    sm: 18,
    md: 24,
    lg: 32,
    xl: 40,
  };
  return (
    <div
      className={`${dims[size]} flex items-center justify-center bg-brand-500 shadow-md shadow-brand-500/20`}
    >
      <UtensilsCrossed size={icon[size]} className="text-white" strokeWidth={2.2} />
    </div>
  );
}

export function LogoWordmark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const text = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };
  return (
    <div className="flex items-center gap-2">
      <Logo size={size === 'lg' ? 'md' : 'sm'} />
      <span className={`${text[size]} font-bold tracking-tight text-ink-800`}>
        Cater<span className="text-brand-500">Link</span>
      </span>
    </div>
  );
}
