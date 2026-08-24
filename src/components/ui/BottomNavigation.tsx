import { Home, Briefcase, ClipboardList, User } from 'lucide-react';
import type { TabName } from '@/types';
import { useApp } from '@/store/AppContext';

const TABS: { id: TabName; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'jobs', label: 'Jobs', icon: Briefcase },
  { id: 'applications', label: 'Applications', icon: ClipboardList },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNavigation() {
  const { tab, setTab } = useApp();
  return (
    <nav className="sticky bottom-0 z-30 bg-white border-t border-ink-200 shadow-nav safe-bottom">
      <div className="flex items-center justify-around px-2 h-[3.75rem]">
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full min-w-[44px] transition-transform active:scale-90"
              aria-label={label}
              aria-current={active ? 'page' : undefined}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.3 : 1.8}
                className={`transition-colors duration-200 ${active ? 'text-brand-500' : 'text-ink-400'}`}
              />
              <span
                className={`text-[0.6875rem] font-semibold transition-colors duration-200 ${
                  active ? 'text-brand-500' : 'text-ink-400'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
