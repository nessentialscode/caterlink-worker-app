import { useState, useEffect } from 'react';
import { useApp } from '@/store/AppContext';
import { EmptyState, JobListSkeleton, StatusBadge } from '@/components/ui';
import type { ApplicationStatus } from '@/types';
import { ClipboardList, MapPin, Calendar, IndianRupee, ChevronRight, CheckCircle2 } from 'lucide-react';

const TABS: { id: ApplicationStatus | 'all'; label: string }[] = [
  { id: 'applied', label: 'Active' },
  { id: 'accepted', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'rejected', label: 'Cancelled' },
];

export function ApplicationsScreen() {
  const { applications, getJobById, selectApplication, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<string>('applied');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const tabMap: Record<string, ApplicationStatus[]> = {
    applied: ['applied', 'under_review'],
    accepted: ['accepted'],
    completed: ['completed'],
    rejected: ['rejected', 'cancelled'],
  };

  const filtered = applications.filter((a) => tabMap[activeTab]?.includes(a.status));

  if (loading) return <JobListSkeleton count={4} />;

  return (
    <div className="px-5 pb-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-[1.75rem] font-bold text-ink-800 mb-3">My Applications</h1>
      </div>

      <div className="flex gap-1 bg-ink-100 rounded-btn p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 text-xs font-semibold rounded-field transition-all ${
              activeTab === tab.id ? 'bg-white text-ink-800 shadow-sm' : 'text-ink-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<ClipboardList size={28} />}
          title={activeTab === 'completed' ? 'No completed jobs yet' : "You haven't applied for any jobs yet"}
          description={activeTab === 'completed' ? 'Your finished jobs will appear here.' : 'Browse available jobs and apply to get started.'}
          actionLabel="Browse Jobs"
          onAction={() => navigate('jobs')}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => {
            const job = getJobById(app.jobId);
            if (!job) return null;
            const isAccepted = app.status === 'accepted';
            return (
              <button
                key={app.id}
                onClick={() => selectApplication(app.id)}
                className={`w-full text-left rounded-card p-4 transition-all active:scale-[0.98] ${
                  isAccepted
                    ? 'bg-gradient-to-br from-success-50 to-white border border-success-100 shadow-card'
                    : 'bg-white shadow-card hover:shadow-card-hover'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-ink-800 text-[1.0625rem] truncate">{job.title}</h3>
                    <p className="text-xs text-ink-500 mt-0.5">{job.provider.name}</p>
                  </div>
                  <StatusBadge status={app.status} size="sm" />
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-500 mb-2">
                  <span className="inline-flex items-center gap-1"><MapPin size={13} className="text-ink-400" />{job.location}</span>
                  <span className="inline-flex items-center gap-1"><Calendar size={13} className="text-ink-400" />{job.date}</span>
                  <span className="inline-flex items-center gap-1"><IndianRupee size={13} className="text-ink-400" />{job.pay}/day</span>
                </div>

                {isAccepted && (
                  <div className="flex items-center gap-1.5 text-success-700 text-xs font-semibold bg-success-50 rounded-chip px-2 py-1 mb-2 w-fit">
                    <CheckCircle2 size={13} />
                    You're booked! Arrive 15 min early.
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-ink-100">
                  <span className="text-xs text-ink-400">Applied on {app.appliedAt}</span>
                  <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-brand-500">
                    Details <ChevronRight size={15} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
