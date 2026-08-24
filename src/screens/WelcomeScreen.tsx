import { Button, Logo } from '@/components/ui';
import { useApp } from '@/store/AppContext';
import { CalendarCheck, Wallet, ArrowRight } from 'lucide-react';

export function WelcomeScreen() {
  const { navigate } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="relative flex-1 flex flex-col items-center justify-center px-5 pt-16 pb-8 bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
          <div className="mb-8 animate-scale-in">
            <Logo size="xl" />
          </div>

          <h1 className="text-[1.75rem] font-bold text-ink-800 leading-tight mb-3 animate-slide-up-fade">
            Find catering work near you
          </h1>
          <p className="text-ink-500 text-[0.9375rem] leading-relaxed mb-10 animate-slide-up-fade">
            Discover catering jobs, apply in a few taps, and build your work
            profile with CaterLink.
          </p>

          <div className="flex flex-col gap-3 w-full mb-10">
            {[
              { icon: CalendarCheck, title: 'Browse local jobs', desc: 'Weddings, events & more near you' },
              { icon: Wallet, title: 'Clear daily pay', desc: 'Know your earnings upfront' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-center gap-3.5 bg-white rounded-card shadow-card p-3.5 animate-slide-up-fade"
              >
                <div className="h-11 w-11 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-brand-500" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-ink-800 text-sm">{title}</p>
                  <p className="text-xs text-ink-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 pb-8 safe-bottom space-y-3">
        <Button fullWidth size="lg" onClick={() => navigate('phoneLogin')} rightIcon={<ArrowRight size={20} />}>
          Get Started
        </Button>
        <p className="text-center text-sm text-ink-500">
          Already have an account?{' '}
          <button
            onClick={() => navigate('phoneLogin')}
            className="font-semibold text-brand-500 hover:text-brand-600"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
