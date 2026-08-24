interface Props {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export function SkillChip({ label, selected = false, onClick, size = 'md' }: Props) {
  const padding = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm';
  return (
    <button
      onClick={onClick}
      className={`rounded-pill font-medium transition-all duration-150 active:scale-95 ${padding} ${
        selected
          ? 'bg-brand-500 text-white'
          : 'bg-ink-100 text-ink-600 hover:bg-ink-200'
      }`}
    >
      {label}
    </button>
  );
}

export function FilterChip({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-pill px-3.5 py-1.5 text-sm font-medium transition-all duration-150 active:scale-95 ${
        active
          ? 'bg-brand-500 text-white'
          : 'bg-white text-ink-600 border border-ink-200 hover:border-ink-300'
      }`}
    >
      {label}
    </button>
  );
}
