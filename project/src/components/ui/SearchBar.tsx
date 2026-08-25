import { Search, SlidersHorizontal } from 'lucide-react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onFilter?: () => void;
  placeholder?: string;
  showFilter?: boolean;
}

export function SearchBar({
  value,
  onChange,
  onFilter,
  placeholder = 'Search jobs, locations...',
  showFilter = true,
}: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-1 flex items-center gap-2.5 h-12 px-4 bg-white border border-ink-200 rounded-field transition-all focus-within:border-brand-500 focus-within:shadow-focus">
        <Search size={18} className="text-ink-400 shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-[0.9375rem] text-ink-800 placeholder:text-ink-400"
          aria-label="Search"
        />
      </div>
      {showFilter && (
        <button
          onClick={onFilter}
          className="h-12 w-12 flex items-center justify-center bg-white border border-ink-200 rounded-field hover:bg-ink-50 active:scale-95 transition-all"
          aria-label="Filters"
        >
          <SlidersHorizontal size={18} className="text-ink-600" />
        </button>
      )}
    </div>
  );
}
