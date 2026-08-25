import { useApp } from '@/store/AppContext';
import { AppHeader, StatusBadge, ProfileAvatar, RatingDisplay, SkillChip, Button } from '@/components/ui';
import { MapPin, Calendar, Clock, IndianRupee, BadgeCheck, CircleCheck as CheckCircle2, Circle, User, Briefcase, MessageSquare } from 'lucide-react';

export function ApplicationDetailsScreen() {
  const { selectedApplicationId, getApplicationById, getJobById, goBack, setTab } = useApp();

  const app = selectedApplicationId ? getApplicationById(selectedApplicationId) : undefined;
  const job = app ? getJobById(app.jobId) : undefined;

  if (!app || !job) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <AppHeader showBack onBack={goBack} />
        <div className="flex-1 flex items-center justify-center text-ink-500">Application not found.</div>
      </div>
    );
  }

  const isAccepted = app.status === 'accepted';

  return (
    <div className="flex flex-col min-h-screen bg-ink-100">
      <AppHeader title="Application Details" showBack onBack={goBack} />

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <h1 className="text-lg font-bold text-ink-800">{job.title}</h1>
              <p className="text-xs text-ink-500 mt-0.5">{job.provider.name}</p>
            </div>
            <StatusBadge status={app.status} />
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <InfoRow icon={<Calendar size={15} />} label="Date" value={job.date} />
            <InfoRow icon={<Clock size={15} />} label="Time" value={job.time} />
            <InfoRow icon={<MapPin size={15} />} label="Location" value={job.location} />
            <InfoRow icon={<IndianRupee size={15} />} label="Pay" value={`₹${job.pay}/day`} />
          </div>
        </div>

        {isAccepted && (
          <div className="bg-success-500 rounded-card p-4 text-white shadow-md shadow-success-500/20 animate-scale-in">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 size={20} />
              <h3 className="font-bold text-base">You're booked!</h3>
            </div>
            <p className="text-sm text-success-50">Please arrive 15 minutes before the scheduled start time.</p>
          </div>
        )}

        <div className="bg-white rounded-card shadow-card p-4">
          <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide mb-3">Provider</h2>
          <div className="flex items-center gap-3">
            <ProfileAvatar name={job.provider.name} size="lg" />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-ink-800">{job.provider.name}</p>
                {job.provider.verified && <BadgeCheck size={16} className="text-brand-500" />}
              </div>
              <div className="flex items-center gap-3 mt-1">
                <RatingDisplay rating={job.provider.rating} size="sm" />
                <span className="text-xs text-ink-500">{job.provider.jobsPosted} jobs posted</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card p-4">
          <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide mb-3">Your Application</h2>
          <div className="space-y-3">
            {app.role && (
              <div className="flex items-start gap-2.5">
                <User size={16} className="text-ink-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-ink-500">Selected Role</p>
                  <p className="text-sm font-semibold text-ink-800">{app.role}</p>
                </div>
              </div>
            )}
            {app.experience && (
              <div className="flex items-start gap-2.5">
                <Briefcase size={16} className="text-ink-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-ink-500">Relevant Experience</p>
                  <p className="text-sm text-ink-700">{app.experience}</p>
                </div>
              </div>
            )}
            {app.skills && app.skills.length > 0 && (
              <div>
                <p className="text-xs text-ink-500 mb-1.5">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {app.skills.map((s) => (<SkillChip key={s} label={s} size="sm" />))}
                </div>
              </div>
            )}
            {app.message && (
              <div className="flex items-start gap-2.5">
                <MessageSquare size={16} className="text-ink-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-ink-500">Message to Provider</p>
                  <p className="text-sm text-ink-700">{app.message}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-card shadow-card p-4">
          <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide mb-4">Application Timeline</h2>
          <div className="relative pl-2">
            {app.timeline.map((step, i) => {
              const isLast = i === app.timeline.length - 1;
              return (
                <div key={i} className="flex gap-3 pb-6 relative">
                  {!isLast && <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-ink-200" />}
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 z-10 ${step.done ? 'bg-brand-500 text-white' : 'bg-ink-200 text-ink-400'}`}>
                    {step.done ? <CheckCircle2 size={14} /> : <Circle size={12} />}
                  </div>
                  <div className="pt-0.5">
                    <p className={`text-sm font-semibold ${step.done ? 'text-ink-800' : 'text-ink-400'}`}>{step.label}</p>
                    <p className="text-xs text-ink-500 mt-0.5">{step.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-ink-200 px-5 py-3 safe-bottom">
        <Button fullWidth variant="secondary" onClick={() => setTab('jobs')}>Back to Jobs</Button>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-ink-400 mb-0.5">{icon}<span className="text-xs">{label}</span></div>
      <p className="text-sm font-semibold text-ink-800">{value}</p>
    </div>
  );
}
