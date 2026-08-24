import { useApp } from '@/store/AppContext';
import { AppHeader, EmptyState } from '@/components/ui';
import { Bell, ClipboardCheck, CalendarClock, Briefcase, UserCircle, CheckCheck } from 'lucide-react';
import type { NotificationItem } from '@/types';

const CATEGORY_META: Record<NotificationItem['category'], { icon: typeof Bell; color: string; bg: string }> = {
  application: { icon: ClipboardCheck, color: 'text-success-600', bg: 'bg-success-50' },
  reminder: { icon: CalendarClock, color: 'text-brand-500', bg: 'bg-brand-50' },
  job: { icon: Briefcase, color: 'text-warning-600', bg: 'bg-warning-50' },
  profile: { icon: UserCircle, color: 'text-ink-600', bg: 'bg-ink-100' },
};

export function NotificationsScreen() {
  const { notifications, markNotificationRead, markAllNotificationsRead, goBack } = useApp();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col min-h-screen bg-ink-100">
      <AppHeader
        title="Notifications"
        showBack
        onBack={goBack}
        rightAction={
          unreadCount > 0 ? (
            <button onClick={markAllNotificationsRead} className="flex items-center gap-1 text-sm font-semibold text-brand-500 px-2 py-1.5 rounded-lg hover:bg-brand-50 active:scale-95 transition-all" aria-label="Mark all as read">
              <CheckCheck size={16} /> Mark all
            </button>
          ) : undefined
        }
      />

      <div className="flex-1 px-5 py-4">
        {notifications.length === 0 ? (
          <EmptyState icon={<Bell size={28} />} title="No notifications yet" description="Updates about your applications and new jobs will appear here." />
        ) : (
          <div className="space-y-2.5">
            {notifications.map((n) => {
              const meta = CATEGORY_META[n.category];
              const Icon = meta.icon;
              return (
                <button
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`w-full text-left flex gap-3 p-3.5 rounded-card transition-all active:scale-[0.98] ${
                    n.read ? 'bg-white shadow-card' : 'bg-white shadow-card border-l-4 border-l-brand-500'
                  }`}
                >
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${meta.bg}`}>
                    <Icon size={19} className={meta.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${n.read ? 'font-semibold text-ink-800' : 'font-bold text-ink-800'}`}>{n.title}</p>
                      {!n.read && <span className="h-2 w-2 rounded-full bg-brand-500 shrink-0 mt-1.5" />}
                    </div>
                    <p className="text-xs text-ink-500 mt-1 leading-relaxed">{n.body}</p>
                    <p className="text-[0.7rem] text-ink-400 mt-1.5">{n.time}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
