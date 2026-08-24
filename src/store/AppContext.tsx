import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  ScreenName,
  TabName,
  Job,
  Application,
  ApplicationFormData,
  WorkerProfile,
  NotificationItem,
  ApplicationStatus,
} from '@/types';
import {
  mockJobs,
  mockApplications,
  defaultProfile,
  mockNotifications,
} from '@/data/mockData';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppState {
  screen: ScreenName;
  tab: TabName;
  history: ScreenName[];
  selectedJobId: string | null;
  selectedApplicationId: string | null;
  profile: WorkerProfile;
  jobs: Job[];
  applications: Application[];
  notifications: NotificationItem[];
  savedJobs: Set<string>;
  toasts: Toast[];
  loading: boolean;
  navigate: (screen: ScreenName) => void;
  goBack: () => void;
  setTab: (tab: TabName) => void;
  selectJob: (jobId: string) => void;
  selectApplication: (appId: string) => void;
  toggleSaveJob: (jobId: string) => void;
  applyToJob: (jobId: string, formData: ApplicationFormData) => string;
  updateProfile: (patch: Partial<WorkerProfile>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  pushToast: (message: string, type?: Toast['type']) => void;
  dismissToast: (id: number) => void;
  setLoading: (v: boolean) => void;
  getJobById: (id: string) => Job | undefined;
  getApplicationById: (id: string) => Application | undefined;
  getApplicationByJobId: (jobId: string) => Application | undefined;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<ScreenName>('splash');
  const [tab, setTabState] = useState<TabName>('home');
  const [history, setHistory] = useState<ScreenName[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [profile, setProfile] = useState<WorkerProfile>(defaultProfile);
  const [jobs] = useState<Job[]>(mockJobs);
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useCallback((next: ScreenName) => {
    setScreen((prev) => {
      setHistory((h) => [...h, prev]);
      return next;
    });
  }, []);

  const goBack = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setScreen(prev);
      return h.slice(0, -1);
    });
  }, []);

  const setTab = useCallback((next: TabName) => {
    setTabState(next);
    const screenMap: Record<TabName, ScreenName> = {
      home: 'dashboard',
      jobs: 'jobs',
      applications: 'applications',
      profile: 'profile',
    };
    setScreen(screenMap[next]);
    setHistory([]);
  }, []);

  const selectJob = useCallback((jobId: string) => {
    setSelectedJobId(jobId);
    navigate('jobDetails');
  }, [navigate]);

  const selectApplication = useCallback((appId: string) => {
    setSelectedApplicationId(appId);
    navigate('applicationDetails');
  }, [navigate]);

  const toggleSaveJob = useCallback((jobId: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
  }, []);

  const pushToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const applyToJob = useCallback((jobId: string, formData: ApplicationFormData) => {
    const existing = applications.find((a) => a.jobId === jobId);
    if (existing) return existing.id;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId,
      status: 'applied',
      appliedAt: dateStr,
      role: formData.role,
      experience: formData.experience,
      skills: formData.skills,
      message: formData.message,
      timeline: [
        { status: 'applied', label: 'Applied', date: `${dateStr}, ${timeStr}`, done: true },
        { status: 'under_review', label: 'Under Review', date: 'Pending', done: false },
        { status: 'accepted', label: 'Accepted', date: 'Pending', done: false },
        { status: 'completed', label: 'Work Completed', date: 'Pending', done: false },
      ],
    };
    setApplications((prev) => [newApp, ...prev]);
    return newApp.id;
  }, [applications]);

  const updateProfile = useCallback((patch: Partial<WorkerProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const getJobById = useCallback((id: string) => jobs.find((j) => j.id === id), [jobs]);
  const getApplicationById = useCallback(
    (id: string) => applications.find((a) => a.id === id),
    [applications]
  );
  const getApplicationByJobId = useCallback(
    (jobId: string) => applications.find((a) => a.jobId === jobId),
    [applications]
  );

  return (
    <AppContext.Provider
      value={{
        screen,
        tab,
        history,
        selectedJobId,
        selectedApplicationId,
        profile,
        jobs,
        applications,
        notifications,
        savedJobs,
        toasts,
        loading,
        navigate,
        goBack,
        setTab,
        selectJob,
        selectApplication,
        toggleSaveJob,
        applyToJob,
        updateProfile,
        markNotificationRead,
        markAllNotificationsRead,
        pushToast,
        dismissToast,
        setLoading,
        getJobById,
        getApplicationById,
        getApplicationByJobId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export const STATUS_META: Record<
  ApplicationStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  applied: { label: 'Applied', bg: 'bg-brand-50', text: 'text-brand-700', dot: 'bg-brand-500' },
  under_review: {
    label: 'Under Review',
    bg: 'bg-warning-50',
    text: 'text-warning-700',
    dot: 'bg-warning-500',
  },
  accepted: {
    label: 'Accepted',
    bg: 'bg-success-50',
    text: 'text-success-700',
    dot: 'bg-success-500',
  },
  rejected: {
    label: 'Rejected',
    bg: 'bg-error-50',
    text: 'text-error-600',
    dot: 'bg-error-500',
  },
  completed: {
    label: 'Completed',
    bg: 'bg-ink-100',
    text: 'text-ink-600',
    dot: 'bg-ink-400',
  },
  cancelled: {
    label: 'Cancelled',
    bg: 'bg-ink-100',
    text: 'text-ink-500',
    dot: 'bg-ink-300',
  },
};
