import { useApp } from '@/store/AppContext';
import {
  AppHeader, Button, SkillChip, ProfileAvatar, RatingDisplay,
  StatusBadge,
} from '@/components/ui';
import {
  MapPin, Calendar, Clock, Users, IndianRupee, Share2, Bookmark,
  BadgeCheck,
} from 'lucide-react';

export function JobDetailsScreen() {
  const {
    selectedJobId, getJobById, goBack, navigate, toggleSaveJob, savedJobs,
    getApplicationByJobId, pushToast, selectApplication,
  } = useApp();
  const job = selectedJobId ? getJobById(selectedJobId) : undefined;

  if (!job) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <AppHeader showBack onBack={goBack} />
        <div className="flex-1 flex items-center justify-center text-ink-500">Job not found.</div>
      </div>
    );
  }

  const isSaved = savedJobs.has(job.id);
  const existingApp = getApplicationByJobId(job.id);

  return (
    <div className="flex flex-col min-h-screen bg-ink-100">
      <AppHeader
        showBack
        onBack={goBack}
        rightAction={
          <div className="flex items-center gap-1">
            <button onClick={() => pushToast('Link copied', 'info')} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-ink-100 active:scale-90 transition-all" aria-label="Share">
              <Share2 size={19} className="text-ink-700" />
            </button>
            <button onClick={() => { toggleSaveJob(job.id); pushToast(isSaved ? 'Job removed from saved' : 'Job saved', 'info'); }} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-ink-100 active:scale-90 transition-all" aria-label="Save">
              {isSaved ? <Bookmark size={19} className="text-brand-500 fill-brand-500" /> : <Bookmark size={19} className="text-ink-700" />}
            </button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-5 pt-4">
          <div className="bg-brand-500 rounded-card p-5 text-white shadow-md shadow-brand-500/20">
            <span className="inline-block text-xs font-semibold bg-white/20 rounded-chip px-2.5 py-1 mb-3">{job.category}</span>
            <h1 className="text-2xl font-bold leading-tight mb-2">{job.title}</h1>
            <div className="flex items-center gap-1.5 text-brand-100 text-sm">
              <MapPin size={16} />
              {job.location}, Kerala
            </div>
          </div>
        </div>

        <div className="px-5 mt-4">
          <div className="bg-white rounded-card shadow-card p-4">
            <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide mb-3">Event Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <DetailItem icon={<Calendar size={17} />} label="Date" value={job.date} />
              <DetailItem icon={<Clock size={17} />} label="Time" value={job.time} />
              <DetailItem icon={<Clock size={17} />} label="Duration" value={`${job.durationHours} hours`} />
              <DetailItem icon={<Users size={17} />} label="Workers" value={`${job.workersRequired} needed`} />
              <DetailItem icon={<IndianRupee size={17} />} label="Pay" value={`₹${job.pay}/day`} highlight />
              <DetailItem icon={<IndianRupee size={17} />} label="Payment" value={job.paymentTerms} />
            </div>
          </div>
        </div>

        <div className="px-5 mt-4">
          <div className="bg-white rounded-card shadow-card p-4">
            <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide mb-3">Location</h2>
            <div className="h-32 rounded-field bg-gradient-to-br from-brand-50 to-ink-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #687386 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              <div className="relative flex flex-col items-center gap-1">
                <MapPin size={28} className="text-brand-500" />
                <span className="text-xs font-semibold text-ink-600">{job.location}, Kerala</span>
              </div>
            </div>
            <p className="text-xs text-ink-500 mt-2 flex items-center gap-1">
              <MapPin size={13} className="text-ink-400" />
              {job.distanceKm} km from you
            </p>
          </div>
        </div>

        <div className="px-5 mt-4">
          <div className="bg-white rounded-card shadow-card p-4">
            <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide mb-3">Work Description</h2>
            <p className="text-sm text-ink-700 leading-relaxed">{job.description}</p>
          </div>
        </div>

        <div className="px-5 mt-4">
          <div className="bg-white rounded-card shadow-card p-4">
            <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide mb-3">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((s) => (<SkillChip key={s} label={s} size="sm" />))}
            </div>
          </div>
        </div>

        <div className="px-5 mt-4">
          <div className="bg-white rounded-card shadow-card p-4">
            <h2 className="font-semibold text-ink-500 text-xs uppercase tracking-wide mb-3">Provider</h2>
            <div className="flex items-center gap-3">
              <ProfileAvatar name={job.provider.name} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-semibold text-ink-800 truncate">{job.provider.name}</p>
                  {job.provider.verified && <BadgeCheck size={16} className="text-brand-500 shrink-0" />}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <RatingDisplay rating={job.provider.rating} size="sm" />
                  <span className="text-xs text-ink-500">{job.provider.jobsPosted} jobs posted</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {existingApp && (
          <div className="px-5 mt-4">
            <div className="bg-white rounded-card shadow-card p-4 flex items-center justify-between">
              <span className="text-sm font-medium text-ink-700">Your application status</span>
              <StatusBadge status={existingApp.status} />
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-ink-200 px-5 py-3 safe-bottom">
        {existingApp ? (
          <Button fullWidth size="lg" variant="secondary" onClick={() => existingApp && selectApplication(existingApp.id)}>
            View Application
          </Button>
        ) : (
          <Button fullWidth size="lg" onClick={() => navigate('applicationForm')}>
            Apply for Job
          </Button>
        )}
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value, highlight = false }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-ink-400 mb-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className={`text-sm font-semibold ${highlight ? 'text-brand-600' : 'text-ink-800'}`}>{value}</p>
    </div>
  );
}
