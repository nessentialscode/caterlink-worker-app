import { useState } from 'react';
import { AppHeader, Button } from '@/components/ui';
import { useApp } from '@/store/AppContext';
import { Check } from 'lucide-react';

export function PhoneLoginScreen() {
  const { navigate } = useApp();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const isValid = /^\d{10}$/.test(phone);
  const showError = touched && phone.length > 0 && !isValid;

  const handleContinue = () => {
    setTouched(true);
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('otp');
    }, 700);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AppHeader showBack onBack={() => navigate('welcome')} />
      <div className="flex-1 px-5 pt-6">
        <h1 className="text-[1.75rem] font-bold text-ink-800 mb-2">Welcome back</h1>
        <p className="text-ink-500 text-[0.9375rem] mb-8">
          Enter your mobile number to continue.
        </p>

        <label className="block text-sm font-semibold text-ink-700 mb-2">
          Mobile Number
        </label>
        <div
          className={`flex items-center h-14 bg-white border rounded-field transition-all ${
            showError
              ? 'border-error-500'
              : isValid
              ? 'border-success-500'
              : 'border-ink-200 focus-within:border-brand-500 focus-within:shadow-focus'
          }`}
        >
          <div className="flex items-center px-3.5 border-r border-ink-200">
            <span className="text-base font-semibold text-ink-800">+91</span>
          </div>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            onBlur={() => setTouched(true)}
            placeholder="XXXXX XXXXX"
            className="flex-1 h-full bg-transparent outline-none text-base text-ink-800 placeholder:text-ink-400 px-3.5 tracking-wider"
            aria-label="Mobile number"
          />
          {isValid && (
            <div className="pr-3.5 text-success-500 animate-check-pop">
              <Check size={20} />
            </div>
          )}
        </div>
        {showError && (
          <p className="text-error-600 text-xs font-medium mt-2">
            Please enter a valid 10-digit mobile number.
          </p>
        )}

        <Button
          fullWidth
          size="lg"
          className="mt-8"
          loading={loading}
          disabled={!isValid}
          onClick={handleContinue}
        >
          Continue
        </Button>

        <p className="text-center text-xs text-ink-400 mt-6 leading-relaxed px-4">
          By continuing, you agree to our{' '}
          <span className="font-semibold text-ink-600">Terms of Service</span> and{' '}
          <span className="font-semibold text-ink-600">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
