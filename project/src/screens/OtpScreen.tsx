import { useState, useRef, useEffect } from 'react';
import { AppHeader, Button } from '@/components/ui';
import { useApp } from '@/store/AppContext';

const MOCK_OTP = '123456';

export function OtpScreen() {
  const { navigate, pushToast } = useApp();
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendCount, setResendCount] = useState(42);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendCount <= 0) return;
    const t = setInterval(() => setResendCount((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [resendCount]);

  const handleChange = (i: number, val: string) => {
    const v = val.replace(/\D/g, '');
    if (!v) {
      const next = [...digits];
      next[i] = '';
      setDigits(next);
      return;
    }
    const next = [...digits];
    if (v.length > 1) {
      const chars = v.slice(0, 6 - i).split('');
      chars.forEach((c, idx) => {
        if (i + idx < 6) next[i + idx] = c;
      });
      setDigits(next);
      const last = Math.min(i + chars.length, 5);
      inputs.current[last]?.focus();
    } else {
      next[i] = v;
      setDigits(next);
      if (i < 5) inputs.current[i + 1]?.focus();
    }
    setError(false);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = digits.join('');
    if (code.length !== 6) {
      setError(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (code === MOCK_OTP) {
        setLoading(false);
        navigate('profileSetup');
      } else {
        setLoading(false);
        setError(true);
        pushToast('Incorrect verification code. Try 123456.', 'error');
      }
    }, 600);
  };

  const filled = digits.filter(Boolean).length;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AppHeader showBack onBack={() => navigate('phoneLogin')} />
      <div className="flex-1 px-5 pt-6">
        <h1 className="text-[1.75rem] font-bold text-ink-800 mb-2">Verify your number</h1>
        <p className="text-ink-500 text-[0.9375rem] mb-8">
          We sent a 6-digit verification code to{' '}
          <span className="font-semibold text-ink-700">+91 98765 43210</span>.
        </p>

        <div className="flex gap-2.5 mb-3">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              aria-label={`OTP digit ${i + 1}`}
              className={`h-14 w-12 text-center text-xl font-bold rounded-field border-2 outline-none transition-all ${
                error
                  ? 'border-error-500 bg-error-50'
                  : d
                  ? 'border-brand-500 bg-brand-50 text-brand-600'
                  : 'border-ink-200 bg-white text-ink-800 focus:border-brand-500 focus:shadow-focus'
              }`}
            />
          ))}
        </div>
        {error && (
          <p className="text-error-600 text-xs font-medium mb-4">
            Incorrect code. Use 123456 for this prototype.
          </p>
        )}

        <p className="text-xs text-ink-400 mb-8">
          Demo code: <span className="font-bold text-brand-500">123456</span>
        </p>

        <Button
          fullWidth
          size="lg"
          loading={loading}
          disabled={filled !== 6}
          onClick={handleVerify}
        >
          Verify & Continue
        </Button>

        <div className="mt-8 text-center">
          <p className="text-sm text-ink-500 mb-2">Didn't receive the code?</p>
          {resendCount > 0 ? (
            <p className="text-sm font-semibold text-ink-400">
              Resend in {resendCount}s
            </p>
          ) : (
            <button
              onClick={() => {
                setResendCount(42);
                pushToast('OTP resent successfully', 'success');
              }}
              className="text-sm font-semibold text-brand-500 hover:text-brand-600"
            >
              Resend OTP
            </button>
          )}
          <button
            onClick={() => navigate('phoneLogin')}
            className="block mx-auto mt-4 text-sm font-medium text-ink-500 hover:text-ink-700"
          >
            Change phone number
          </button>
        </div>
      </div>
    </div>
  );
}
