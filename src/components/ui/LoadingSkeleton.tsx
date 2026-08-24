export function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`shimmer-bg rounded-lg ${className}`} />;
}

export function JobCardSkeleton() {
  return (
    <div className="bg-white rounded-card shadow-card p-4">
      <div className="flex justify-between mb-3">
        <div className="flex-1">
          <SkeletonBlock className="h-4 w-3/4 mb-2" />
          <SkeletonBlock className="h-3 w-1/3" />
        </div>
        <SkeletonBlock className="h-6 w-16" />
      </div>
      <SkeletonBlock className="h-3 w-2/3 mb-3" />
      <SkeletonBlock className="h-3 w-1/2 mb-3" />
      <div className="flex justify-between">
        <SkeletonBlock className="h-3 w-20" />
        <SkeletonBlock className="h-3 w-16" />
      </div>
    </div>
  );
}

export function JobListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-card shadow-card p-3.5">
      <SkeletonBlock className="h-9 w-9 rounded-xl mb-3" />
      <SkeletonBlock className="h-5 w-12 mb-2" />
      <SkeletonBlock className="h-3 w-16" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="px-5 space-y-5 animate-fade-in">
      <div className="flex items-center gap-3 pt-2">
        <SkeletonBlock className="h-12 w-12 rounded-full" />
        <div className="flex-1">
          <SkeletonBlock className="h-5 w-32 mb-2" />
          <SkeletonBlock className="h-3 w-40" />
        </div>
      </div>
      <SkeletonBlock className="h-12 w-full rounded-field" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
      <SkeletonBlock className="h-5 w-32 mb-2" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="px-5 space-y-5 animate-fade-in">
      <div className="flex flex-col items-center pt-4">
        <SkeletonBlock className="h-20 w-20 rounded-full mb-3" />
        <SkeletonBlock className="h-5 w-28 mb-2" />
        <SkeletonBlock className="h-3 w-20" />
      </div>
      <SkeletonBlock className="h-24 w-full rounded-card" />
      <SkeletonBlock className="h-40 w-full rounded-card" />
    </div>
  );
}
