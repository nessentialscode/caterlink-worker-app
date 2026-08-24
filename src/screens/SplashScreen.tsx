import { useEffect } from 'react';
import { Logo } from '@/components/ui';
import { useApp } from '@/store/AppContext';

export function SplashScreen() {
  const { navigate } = useApp();

  useEffect(() => {
    const t = setTimeout(() => navigate('welcome'), 2000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-700 animate-fade-in">
      <div className="flex flex-col items-center gap-5 animate-scale-in">
        <div className="h-20 w-20 rounded-[1.5rem] bg-white/10 flex items-center justify-center shadow-xl">
          <Logo size="xl" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Cater<span className="text-brand-200">Link</span>
          </h1>
          <p className="text-brand-200 text-sm mt-2 font-medium">
            Connect. Work. Earn.
          </p>
        </div>
      </div>
      <div className="absolute bottom-12 flex flex-col items-center gap-3">
        <div className="h-1 w-10 rounded-full bg-white/20 overflow-hidden">
          <div className="h-full w-1/2 bg-white rounded-full animate-[shimmer_1.5s_infinite]" />
        </div>
        <p className="text-brand-200/60 text-xs">Loading...</p>
      </div>
    </div>
  );
}
