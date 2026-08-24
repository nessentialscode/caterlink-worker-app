import { useState } from 'react';
import { useApp } from '@/store/AppContext';
import { AppHeader, Button, SkillChip, ProfileAvatar } from '@/components/ui';
import { ALL_SKILLS, KERALA_LOCATIONS } from '@/data/mockData';
import type { Skill } from '@/types';
import { Camera, ChevronDown } from 'lucide-react';

export function EditProfileScreen() {
  const { profile, updateProfile, goBack, pushToast } = useApp();
  const [name, setName] = useState(profile.name);
  const [location, setLocation] = useState(profile.location.split(',')[0]);
  const [district, setDistrict] = useState(profile.district);
  const [skills, setSkills] = useState<Skill[]>(profile.skills);
  const [availability, setAvailability] = useState(profile.availability);
  const [workPref, setWorkPref] = useState(profile.workPreference);
  const [loading, setLoading] = useState(false);

  const toggleSkill = (s: Skill) => {
    setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      updateProfile({ name, location: `${location}, ${district}`, district, skills, availability, workPreference: workPref });
      setLoading(false);
      pushToast('Profile updated successfully', 'success');
      goBack();
    }, 600);
  };

  return (
    <div className="flex flex-col min-h-screen bg-ink-100">
      <AppHeader title="Edit Profile" showBack onBack={goBack} />

      <div className="flex-1 px-5 py-5 space-y-5">
        <div className="flex flex-col items-center gap-3 bg-white rounded-card shadow-card p-5">
          <div className="relative">
            <ProfileAvatar name={name} size="xl" imageUrl={profile.photoUrl} />
            <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center shadow-md active:scale-90 transition-transform" aria-label="Change photo">
              <Camera size={16} className="text-white" />
            </button>
          </div>
          <p className="text-xs text-ink-500">Tap to change photo</p>
        </div>

        <section className="bg-white rounded-card shadow-card p-4 space-y-4">
          <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide">Basic Information</h2>
          <Field label="Full Name">
            <input value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
          </Field>
          <Field label="District">
            <SelectInput value={district} onChange={setDistrict} options={KERALA_LOCATIONS} />
          </Field>
          <Field label="Location / Area">
            <input value={location} onChange={(e) => setLocation(e.target.value)} className="form-input" />
          </Field>
        </section>

        <section className="bg-white rounded-card shadow-card p-4 space-y-3">
          <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {ALL_SKILLS.map((s) => (
              <SkillChip key={s} label={s} selected={skills.includes(s)} onClick={() => toggleSkill(s)} />
            ))}
          </div>
        </section>

        <section className="bg-white rounded-card shadow-card p-4 space-y-4">
          <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide">Availability & Preference</h2>
          <Field label="Availability">
            <div className="flex gap-2">
              {(['Weekdays', 'Weekends', 'Both'] as const).map((a) => (
                <ChipToggle key={a} label={a} active={availability === a} onClick={() => setAvailability(a)} />
              ))}
            </div>
          </Field>
          <Field label="Work Preference">
            <div className="flex gap-2 flex-wrap">
              {(['One-day jobs', 'Multiple-day jobs', 'Both'] as const).map((w) => (
                <ChipToggle key={w} label={w} active={workPref === w} onClick={() => setWorkPref(w)} />
              ))}
            </div>
          </Field>
        </section>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-ink-200 px-5 py-4 safe-bottom">
        <Button fullWidth size="lg" loading={loading} onClick={handleSave}>Save Changes</Button>
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
    <button onClick={onClick} className={`rounded-pill px-3.5 py-2 text-sm font-medium transition-all active:scale-95 ${active ? 'bg-brand-500 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}>
      {label}
    </button>
  );
}

function SelectInput({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} className="form-input appearance-none cursor-pointer pr-10">
        {options.map((o) => (<option key={o} value={o}>{o}</option>))}
      </select>
      <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
    </div>
  );
}
