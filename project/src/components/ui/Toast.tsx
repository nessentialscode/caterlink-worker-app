import { CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { useApp } from '@/store/AppContext';

export function ToastStack() {
  const { toasts, dismissToast } = useApp();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-[60] w-full max-w-[430px] px-4 pt-3 safe-top pointer-events-none">
      <div className="space-y-2">
        {toasts.map((t) => {
          const Icon =
            t.type === 'success' ? CheckCircle2 : t.type === 'error' ? AlertCircle : Info;
          const color =
            t.type === 'success'
              ? 'text-success-500'
              : t.type === 'error'
              ? 'text-error-500'
              : 'text-brand-400';
          return (
            <div
              key={t.id}
              onClick={() => dismissToast(t.id)}
              className="flex items-center gap-3 bg-ink-900 text-white rounded-btn shadow-lg px-4 py-3 animate-toast-in cursor-pointer pointer-events-auto"
            >
              <Icon size={20} className={color} />
              <span className="text-sm font-medium flex-1">{t.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
