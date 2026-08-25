import { useState, useEffect } from 'react';
import { useApp } from '@/store/AppContext';
import {
  SearchBar, FilterChip, JobCard, EmptyState, JobListSkeleton, ErrorState, BottomSheet, Button,
} from '@/components/ui';
import { QUICK_FILTERS, FILTER_CATEGORIES, KERALA_LOCATIONS } from '@/data/mockData';
import { Briefcase } from 'lucide-react';

export function JobsScreen() {
  const { jobs } = useApp();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set());
  const [payMin, setPayMin] = useState(0);
  const [maxDist, setMaxDist] = useState(50);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = jobs.filter((job) => {
    if (query) {
      const q = query.toLowerCase();
      if (!job.title.toLowerCase().includes(q) && !job.location.toLowerCase().includes(q) && !job.category.toLowerCase().includes(q))
        return false;
    }
    if (activeFilter === 'nearby' && job.distanceKm > 15) return false;
    if (activeFilter === 'highpay' && job.pay < 850) return false;
    if (activeFilter === 'weekend') {
      const day = new Date(job.date + ' 2026').getDay();
      if (day !== 0 && day !== 6) return false;
    }
    if (selectedLocations.size > 0 && !selectedLocations.has(job.location)) return false;
    if (job.pay < payMin) return false;
    if (job.distanceKm > maxDist) return false;
    return true;
  });

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) => {
      const next = new Set(prev);
      if (next.has(loc)) next.delete(loc);
      else next.add(loc);
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedLocations(new Set());
    setPayMin(0);
    setMaxDist(50);
    setActiveFilter(null);
  };

  if (loading) return <JobListSkeleton count={5} />;
  if (error)
    return (
      <ErrorState onRetry={() => { setError(false); setLoading(true); setTimeout(() => setLoading(false), 600); }} />
    );

  return (
    <div className="px-5 pb-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-[1.75rem] font-bold text-ink-800 mb-3">Find Jobs</h1>
        <SearchBar value={query} onChange={setQuery} onFilter={() => setFilterOpen(true)} />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">
        {QUICK_FILTERS.map((f) => (
          <FilterChip key={f.id} label={f.label} active={activeFilter === f.id} onClick={() => setActiveFilter((prev) => (prev === f.id ? null : f.id))} />
        ))}
      </div>

      <p className="text-sm text-ink-500">
        {filtered.length} job{filtered.length !== 1 ? 's' : ''} found
      </p>

      {filtered.length === 0 ? (
        <EmptyState icon={<Briefcase size={28} />} title="No jobs found nearby" description="Try increasing your search radius or clearing filters." actionLabel="Clear filters" onAction={clearFilters} />
      ) : (
        <div className="space-y-3">
          {filtered.map((job) => (<JobCard key={job.id} job={job} showStatus />))}
        </div>
      )}

      <BottomSheet open={filterOpen} onClose={() => setFilterOpen(false)}>
        <h3 className="font-bold text-ink-800 text-lg mb-4">Filters</h3>
        <div className="space-y-5 max-h-[60vh] overflow-y-auto no-scrollbar">
          <div>
            <p className="text-sm font-semibold text-ink-700 mb-2">Categories</p>
            <div className="flex flex-wrap gap-2">
              {FILTER_CATEGORIES.map((c) => (<FilterChip key={c} label={c} />))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-700 mb-2">Minimum Pay: ₹{payMin}</p>
            <input type="range" min={0} max={1000} step={50} value={payMin} onChange={(e) => setPayMin(Number(e.target.value))} className="w-full accent-brand-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-700 mb-2">Max Distance: {maxDist} km</p>
            <input type="range" min={5} max={50} value={maxDist} onChange={(e) => setMaxDist(Number(e.target.value))} className="w-full accent-brand-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-700 mb-2">Locations</p>
            <div className="flex flex-wrap gap-2">
              {KERALA_LOCATIONS.map((loc) => (
                <FilterChip key={loc} label={loc} active={selectedLocations.has(loc)} onClick={() => toggleLocation(loc)} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button variant="secondary" fullWidth onClick={clearFilters}>Clear All</Button>
          <Button fullWidth onClick={() => setFilterOpen(false)}>Apply Filters</Button>
        </div>
      </BottomSheet>
    </div>
  );
}
