interface Props {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, actionLabel, onAction }: Props) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-semibold text-ink-800 text-[1.25rem]">{title}</h2>
      {actionLabel && (
        <button
          onClick={onAction}
          className="text-sm font-semibold text-brand-500 hover:text-brand-500 active:scale-95 transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
