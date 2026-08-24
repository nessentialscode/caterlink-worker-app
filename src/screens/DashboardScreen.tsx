import { useState, useEffect } from 'react';
import { useApp } from '@/store/AppContext';
import {
  SearchBar, SectionHeader, JobCard, StatCard, ProfileAvatar,
  DashboardSkeleton, ErrorState, EmptyState,
} from '@/components/ui';
import { Bell, Briefcase, ClipboardList, CalendarCheck, CheckCircle2, Search } from 'lucide-react';

export function DashboardScreen() {
  const { profile, jobs, applications, navigate, setTab, savedJobs } = useApp();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const nearbyJobs = jobs.slice(0, 4);
  const recommended = jobs.filter((j) => j.recommended);

  const filtered = query
    ? nearbyJobs.filter(
        (j) =>
          j.title.toLowerCase().includes(query.toLowerCase()) ||
          j.location.toLowerCase().includes(query.toLowerCase())
      )
    : nearbyJobs;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  if (loading) return <DashboardSkeleton />;
  if (error)
    return (
      <ErrorState
        onRetry={() => {
          setError(false);
          setLoading(true);
          setTimeout(() => setLoading(false), 700);
        }}
      />
    );

  return (
    <div className="px-5 pb-4 space-y-6">
      <div className="flex items-center gap-3 pt-2">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-ink-800">
            {greeting}, {profile.name} 👋
          </h1>
          <p className="text-sm text-ink-500 mt-0.5">
            Ready to find your next catering job?
          </p>
        </div>
        <button
          onClick={() => navigate('notifications')}
          className="relative h-11 w-11 rounded-full bg-white shadow-card flex items-center justify-center active:scale-90 transition-transform"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-ink-700" />
          <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-error-500 ring-2 ring-white" />
        </button>
        <button onClick={() => setTab('profile')} aria-label="Profile">
          <ProfileAvatar name={profile.name} size="md" imageUrl={profile.photoUrl} />
        </button>
      </div>

      <SearchBar value={query} onChange={setQuery} onFilter={() => setTab('jobs')} />

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={<Briefcase size={18} />} label="Available Jobs" value={jobs.length} accent="brand" />
        <StatCard icon={<ClipboardList size={18} />} label="Applications" value={applications.length} accent="warning" />
        <StatCard icon={<CalendarCheck size={18} />} label="Upcoming Work" value={applications.filter((a) => a.status === 'accepted').length} accent="success" />
        <StatCard icon={<CheckCircle2 size={18} />} label="Completed Jobs" value={profile.jobsCompleted} accent="ink" />
      </div>

      <div>
        <SectionHeader title="Jobs near you" actionLabel="See all" onAction={() => setTab('jobs')} />
        {filtered.length === 0 ? (
          <EmptyState icon={<Search size={28} />} title="No jobs found" description="Try a different search term." />
        ) : (
          <div className="space-y-3">
            {filtered.map((job) => (<JobCard key={job.id} job={job} showStatus />))}
          </div>
        )}
      </div>

      {recommended.length > 0 && (
        <div>
          <SectionHeader title="Recommended for you" />
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
            {recommended.map((job) => (
              <div key={job.id} className="w-[260px] shrink-0">
                <JobCard job={job} compact />
              </div>
            ))}
          </div>
        </div>
      )}

      {savedJobs.size > 0 && (
        <div>
          <SectionHeader title="Saved Jobs" actionLabel="See all" onAction={() => setTab('jobs')} />
          <div className="space-y-3">
            {jobs.filter((j) => savedJobs.has(j.id)).map((job) => (
              <JobCard key={job.id} job={job} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
