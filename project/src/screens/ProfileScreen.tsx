import { useApp } from '@/store/AppContext';
import { ProfileAvatar, RatingDisplay, SkillChip, StatCard, ProfileSkeleton } from '@/components/ui';
import { BadgeCheck, Pencil, Bell, Shield, FileText, HelpCircle, LogOut, ChevronRight, Briefcase, ClipboardList, Percent, Star, MapPin, Phone, Calendar, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ProfileScreen() {
  const { profile, navigate, pushToast } = useApp();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <ProfileSkeleton />;

  const menuItems = [
    { icon: Pencil, label: 'Edit Profile', action: () => navigate('editProfile') },
    { icon: Bell, label: 'Notifications', action: () => navigate('notifications') },
    { icon: Shield, label: 'Privacy', action: () => pushToast('Privacy settings coming soon', 'info') },
    { icon: FileText, label: 'Terms', action: () => pushToast('Terms of Service', 'info') },
    { icon: HelpCircle, label: 'Help & Support', action: () => pushToast('Support: help@caterlink.in', 'info') },
  ];

  return (
    <div className="px-5 pb-4 space-y-5">
      <div className="flex flex-col items-center pt-4 text-center">
        <div className="relative">
          <ProfileAvatar name={profile.name} size="xl" imageUrl={profile.photoUrl} />
          {profile.verified && (
            <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-white flex items-center justify-center shadow-md">
              <BadgeCheck size={18} className="text-brand-500" />
            </div>
          )}
        </div>
        <h1 className="text-xl font-bold text-ink-800 mt-3">{profile.name}</h1>
        {profile.verified && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 mt-0.5">
            <BadgeCheck size={14} /> Verified Worker
          </span>
        )}
        <div className="flex items-center gap-2 mt-2">
          <RatingDisplay rating={profile.rating} size="sm" />
        </div>

        <div className="w-full max-w-xs mt-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-ink-500 font-medium">Profile completion</span>
            <span className="font-bold text-brand-500">{profile.completion}%</span>
          </div>
          <div className="h-2 rounded-full bg-ink-200 overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full transition-all duration-300" style={{ width: `${profile.completion}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={<Briefcase size={18} />} label="Jobs Completed" value={profile.jobsCompleted} accent="success" />
        <StatCard icon={<ClipboardList size={18} />} label="Applications" value={profile.applicationsCount} accent="brand" />
        <StatCard icon={<Percent size={18} />} label="Acceptance Rate" value={`${profile.acceptanceRate}%`} accent="warning" />
        <StatCard icon={<Star size={18} />} label="Rating" value={profile.rating.toFixed(1)} accent="ink" />
      </div>

      <Section title="Personal Information">
        <InfoRow icon={<Phone size={17} />} label="Phone" value={profile.phone} />
        <InfoRow icon={<MapPin size={17} />} label="Location" value={profile.location} />
        <InfoRow icon={<Calendar size={17} />} label="Date of Birth" value={profile.dob} />
      </Section>

      <Section title="Work Profile">
        <InfoRow icon={<Briefcase size={17} />} label="Experience" value={profile.experience} />
        <InfoRow icon={<MapPin size={17} />} label="Preferred Radius" value={`${profile.radiusKm} km`} />
        <InfoRow icon={<Calendar size={17} />} label="Availability" value={profile.availability} />
        <InfoRow icon={<CheckCircle2 size={17} />} label="Work Preference" value={profile.workPreference} />
      </Section>

      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((s) => (<SkillChip key={s} label={s} size="sm" />))}
        </div>
      </Section>

      <Section title="Account">
        {menuItems.map(({ icon: Icon, label, action }) => (
          <button key={label} onClick={action} className="w-full flex items-center gap-3 py-3 hover:bg-ink-50 rounded-lg px-2 -mx-2 transition-colors">
            <div className="h-9 w-9 rounded-xl bg-ink-100 flex items-center justify-center">
              <Icon size={17} className="text-ink-600" />
            </div>
            <span className="flex-1 text-left text-sm font-medium text-ink-800">{label}</span>
            <ChevronRight size={18} className="text-ink-400" />
          </button>
        ))}
        <button onClick={() => { pushToast('Logged out', 'info'); navigate('welcome'); }} className="w-full flex items-center gap-3 py-3 hover:bg-error-50 rounded-lg px-2 -mx-2 transition-colors mt-1">
          <div className="h-9 w-9 rounded-xl bg-error-50 flex items-center justify-center">
            <LogOut size={17} className="text-error-600" />
          </div>
          <span className="flex-1 text-left text-sm font-semibold text-error-600">Logout</span>
        </button>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-card shadow-card p-4">
      <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide mb-3">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-xl bg-ink-100 flex items-center justify-center shrink-0 text-ink-500">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-ink-500">{label}</p>
        <p className="text-sm font-semibold text-ink-800 truncate">{value}</p>
      </div>
    </div>
  );
}
