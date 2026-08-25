import type { Job } from '@/types';
import { MapPin, Calendar, Clock, Users, IndianRupee, ChevronRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { useApp } from '@/store/AppContext';

export function JobCard({
  job,
  compact = false,
  showStatus = false,
}: {
  job: Job;
  compact?: boolean;
  showStatus?: boolean;
}) {
  const { selectJob, getApplicationByJobId } = useApp();
  const app = getApplicationByJobId(job.id);

  return (
    <button
      onClick={() => selectJob(job.id)}
      className="w-full text-left bg-white rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-200 active:scale-[0.98] overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-ink-800 text-[1.0625rem] leading-snug truncate">
              {job.title}
            </h3>
            <p className="text-[0.8125rem] text-ink-500 mt-0.5">{job.category}</p>
          </div>
          <span className="shrink-0 inline-flex items-center gap-0.5 rounded-chip bg-brand-50 text-brand-600 px-2.5 py-1 text-xs font-bold">
            <IndianRupee size={12} strokeWidth={2.5} />
            {job.pay}
            <span className="font-medium text-brand-500">/day</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-ink-500 mb-2.5">
          <span className="inline-flex items-center gap-1">
            <MapPin size={13} className="text-ink-400" />
            {job.location} · {job.distanceKm} km
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar size={13} className="text-ink-400" />
            {job.date}
          </span>
        </div>

        {!compact && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] text-ink-500 mb-2.5">
            <span className="inline-flex items-center gap-1">
              <Clock size={13} className="text-ink-400" />
              {job.time}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users size={13} className="text-ink-400" />
              {job.workersRequired} workers needed
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-ink-100">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[0.8125rem] text-ink-500 truncate">{job.provider.name}</span>
            {job.provider.verified && (
              <span className="inline-flex items-center gap-0.5 text-[0.6875rem] font-semibold text-success-600 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {showStatus && app && <StatusBadge status={app.status} size="sm" />}
            <span className="inline-flex items-center gap-0.5 text-sm font-semibold text-brand-500">
              View
              <ChevronRight size={15} />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
