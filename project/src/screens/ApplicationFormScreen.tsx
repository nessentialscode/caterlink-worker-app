import { useState } from 'react';
import { useApp } from '@/store/AppContext';
import { AppHeader, Button, SkillChip, ProfileAvatar, BottomSheet } from '@/components/ui';
import { ALL_SKILLS } from '@/data/mockData';
import type { Skill, ApplicationFormData } from '@/types';
import { Check, PartyPopper, Phone, MapPin } from 'lucide-react';

export function ApplicationFormScreen() {
  const { selectedJobId, getJobById, goBack, profile, applyToJob, selectApplication, pushToast } = useApp();
  const job = selectedJobId ? getJobById(selectedJobId) : undefined;

  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState<Skill[]>(profile.skills);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [createdAppId, setCreatedAppId] = useState<string | null>(null);

  if (!job) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <AppHeader showBack onBack={goBack} />
        <div className="flex-1 flex items-center justify-center text-ink-500">Job not found.</div>
      </div>
    );
  }

  const toggleSkill = (s: Skill) => {
    setSkills((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const canSubmit = role.trim() !== '' && experience.trim() !== '' && skills.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) {
      pushToast('Please fill in all required fields', 'error');
      return;
    }
    setLoading(true);
    const formData: ApplicationFormData = {
      role: role.trim(),
      experience: experience.trim(),
      skills,
      message: message.trim(),
    };
    setTimeout(() => {
      const appId = applyToJob(job.id, formData);
      setLoading(false);
      setCreatedAppId(appId);
      setSuccessOpen(true);
    }, 700);
  };

  return (
    <div className="flex flex-col min-h-screen bg-ink-100">
      <AppHeader title="Apply for Job" showBack onBack={goBack} />

      <div className="flex-1 px-5 py-4 space-y-4 overflow-y-auto pb-24">
        <div className="bg-white rounded-card shadow-card p-4">
          <h1 className="text-lg font-bold text-ink-800">{job.title}</h1>
          <p className="text-sm text-ink-500 mt-0.5">{job.provider.name}</p>
          <p className="text-xs text-ink-400 mt-1">{job.location} · {job.date}</p>
        </div>

        <Section title="Your Information">
          <div className="flex items-center gap-3 mb-3">
            <ProfileAvatar name={profile.name} size="md" imageUrl={profile.photoUrl} />
            <div className="min-w-0">
              <p className="font-semibold text-ink-800 truncate">{profile.name}</p>
              <div className="flex items-center gap-1 text-xs text-ink-500 mt-0.5">
                <Phone size={12} /> {profile.phone}
              </div>
              <div className="flex items-center gap-1 text-xs text-ink-500 mt-0.5">
                <MapPin size={12} /> {profile.location}
              </div>
            </div>
          </div>
          <p className="text-xs text-ink-400">This information from your profile will be shared with the provider.</p>
        </Section>

        <Section title="Application Details">
          <Field label="Selected Role" required>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Server, Kitchen Assistant"
              className="form-input"
            />
          </Field>
          <Field label="Relevant Experience" required>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Describe your relevant experience..."
              rows={3}
              className="w-full p-3 border border-ink-200 rounded-field bg-white text-[0.9375rem] text-ink-800 outline-none transition-all focus:border-brand-500 focus:shadow-focus resize-none placeholder:text-ink-400"
            />
          </Field>
          <Field label="Skills" required>
            <div className="flex flex-wrap gap-2">
              {ALL_SKILLS.map((s) => (
                <SkillChip key={s} label={s} selected={skills.includes(s)} onClick={() => toggleSkill(s)} />
              ))}
            </div>
          </Field>
        </Section>

        <Section title="Message to Provider">
          <Field label="Short Message (optional)">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a note to the provider..."
              rows={3}
              className="w-full p-3 border border-ink-200 rounded-field bg-white text-[0.9375rem] text-ink-800 outline-none transition-all focus:border-brand-500 focus:shadow-focus resize-none placeholder:text-ink-400"
            />
          </Field>
        </Section>

        <div className="flex items-start gap-2 bg-brand-50 rounded-field p-3">
          <div className="h-7 w-7 rounded-full bg-brand-100 flex items-center justify-center shrink-0 mt-0.5">
            <Check size={15} className="text-brand-500" />
          </div>
          <p className="text-sm text-ink-600">
            By submitting, you confirm that you are available for this shift on {job.date} at {job.time}.
          </p>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-ink-200 px-5 py-3 safe-bottom">
        <Button fullWidth size="lg" loading={loading} disabled={!canSubmit} onClick={handleSubmit}>
          Submit Application
        </Button>
      </div>

      <BottomSheet open={successOpen} onClose={() => setSuccessOpen(false)}>
        <div className="flex flex-col items-center text-center py-4">
          <div className="h-20 w-20 rounded-full bg-success-50 flex items-center justify-center mb-4 animate-check-pop">
            <PartyPopper size={36} className="text-success-600" />
          </div>
          <h3 className="text-xl font-bold text-ink-800 mb-1">Application sent!</h3>
          <p className="text-sm text-ink-500 max-w-[260px] mb-6">
            Your application for {job.title} has been submitted. You'll be notified when the provider responds.
          </p>
          <div className="w-full space-y-2.5">
            <Button fullWidth onClick={() => {
              setSuccessOpen(false);
              if (createdAppId) {
                selectApplication(createdAppId);
              }
            }}>
              View Application
            </Button>
            <Button fullWidth variant="ghost" onClick={() => setSuccessOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-card shadow-card p-4 space-y-4">
      <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink-700 mb-1.5">
        {label}{required && <span className="text-error-500"> *</span>}
      </label>
      {children}
    </div>
  );
}
