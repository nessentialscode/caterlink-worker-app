import { useState } from 'react';
import { AppHeader, Button, SkillChip, ProfileAvatar } from '@/components/ui';
import { useApp } from '@/store/AppContext';
import { ALL_SKILLS, KERALA_LOCATIONS } from '@/data/mockData';
import type { Skill } from '@/types';
import { Camera, ChevronDown } from 'lucide-react';

export function ProfileSetupScreen() {
  const { navigate, updateProfile, pushToast } = useApp();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [district, setDistrict] = useState('');
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState(15);
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [availability, setAvailability] = useState('');
  const [workPref, setWorkPref] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleSkill = (s: Skill) => {
    setSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const fields = [
    name, dob, gender, district, location, experience,
    skills.length > 0, availability, workPref,
  ];
  const filled = fields.filter(Boolean).length;
  const progress = Math.round((filled / fields.length) * 100);

  const canSubmit = filled === fields.length;

  const handleSubmit = () => {
    if (!canSubmit) {
      pushToast('Please complete all fields', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      updateProfile({
        name,
        dob,
        gender,
        district,
        location: `${location}, ${district}`,
        radiusKm: radius,
        experience,
        skills,
        availability: availability as 'Weekdays' | 'Weekends' | 'Both',
        workPreference: workPref as 'One-day jobs' | 'Multiple-day jobs' | 'Both',
        completion: 100,
      });
      setLoading(false);
      navigate('dashboard');
    }, 700);
  };

  return (
    <div className="flex flex-col min-h-screen bg-ink-100">
      <AppHeader title="Profile Setup" showBack onBack={() => navigate('otp')} />

      <div className="px-5 pt-4 pb-4 bg-white border-b border-ink-200">
        <h1 className="text-xl font-bold text-ink-800 mb-1">
          Let's complete your profile
        </h1>
        <p className="text-sm text-ink-500 mb-3">
          A complete profile helps catering providers choose the right workers.
        </p>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-ink-200 overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm font-bold text-brand-500 tabular-nums">
            {progress}%
          </span>
        </div>
      </div>

      <div className="flex-1 px-5 py-5 space-y-5">
        <section className="flex flex-col items-center gap-3">
          <div className="relative">
            <ProfileAvatar name={name || 'Worker'} size="xl" />
            <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center shadow-md active:scale-90 transition-transform" aria-label="Add photo">
              <Camera size={16} className="text-white" />
            </button>
          </div>
          <p className="text-xs text-ink-500">Tap to add a profile photo</p>
        </section>

        <section className="bg-white rounded-card shadow-card p-4 space-y-4">
          <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide">
            Personal Information
          </h2>
          <Field label="Full Name">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="form-input" />
          </Field>
          <Field label="Date of Birth">
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="form-input" />
          </Field>
          <Field label="Gender">
            <div className="flex gap-2">
              {['Male', 'Female', 'Other'].map((g) => (
                <ChipToggle key={g} label={g} active={gender === g} onClick={() => setGender(g)} />
              ))}
            </div>
          </Field>
        </section>

        <section className="bg-white rounded-card shadow-card p-4 space-y-4">
          <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide">
            Work Information
          </h2>
          <Field label="District">
            <SelectInput value={district} onChange={setDistrict} options={KERALA_LOCATIONS} placeholder="Select district" />
          </Field>
          <Field label="Location">
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter your area" className="form-input" />
          </Field>
          <Field label={`Preferred Work Radius — ${radius} km`}>
            <input type="range" min={5} max={50} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full accent-brand-500" />
          </Field>
          <Field label="Experience Level">
            <div className="flex gap-2 flex-wrap">
              {['Less than 1 year', '1-3 years', '3+ years', '5+ years'].map((exp) => (
                <ChipToggle key={exp} label={exp} active={experience === exp} onClick={() => setExperience(exp)} />
              ))}
            </div>
          </Field>
        </section>

        <section className="bg-white rounded-card shadow-card p-4 space-y-3">
          <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide">Skills</h2>
          <p className="text-xs text-ink-500">Select all that apply</p>
          <div className="flex flex-wrap gap-2">
            {ALL_SKILLS.map((s) => (
              <SkillChip key={s} label={s} selected={skills.includes(s)} onClick={() => toggleSkill(s)} />
            ))}
          </div>
        </section>

        <section className="bg-white rounded-card shadow-card p-4 space-y-4">
          <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide">
            Availability & Preference
          </h2>
          <Field label="Availability">
            <div className="flex gap-2">
              {['Weekdays', 'Weekends', 'Both'].map((a) => (
                <ChipToggle key={a} label={a} active={availability === a} onClick={() => setAvailability(a)} />
              ))}
            </div>
          </Field>
          <Field label="Work Preference">
            <div className="flex gap-2 flex-wrap">
              {['One-day jobs', 'Multiple-day jobs', 'Both'].map((w) => (
                <ChipToggle key={w} label={w} active={workPref === w} onClick={() => setWorkPref(w)} />
              ))}
            </div>
          </Field>
        </section>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-ink-200 px-5 py-4 safe-bottom">
        <Button fullWidth size="lg" loading={loading} onClick={handleSubmit}>
          Complete Profile
        </Button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function ChipToggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-pill px-3.5 py-2 text-sm font-medium transition-all active:scale-95 ${
        active ? 'bg-brand-500 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'
      }`}
    >
      {label}
    </button>
  );
}

function SelectInput({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} className="form-input appearance-none cursor-pointer pr-10">
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
      <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
    </div>
  );
}
