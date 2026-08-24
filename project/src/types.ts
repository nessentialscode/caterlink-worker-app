export type ScreenName =
  | 'splash'
  | 'welcome'
  | 'phoneLogin'
  | 'otp'
  | 'profileSetup'
  | 'dashboard'
  | 'jobs'
  | 'jobDetails'
  | 'applications'
  | 'applicationDetails'
  | 'profile'
  | 'editProfile'
  | 'notifications';

export type TabName = 'home' | 'jobs' | 'applications' | 'profile';

export type ApplicationStatus =
  | 'applied'
  | 'under_review'
  | 'accepted'
  | 'rejected'
  | 'completed'
  | 'cancelled';

export type Skill =
  | 'Serving'
  | 'Food Preparation'
  | 'Kitchen Assistant'
  | 'Cleaning'
  | 'Event Setup'
  | 'Dishwashing'
  | 'Packing'
  | 'Waiter'
  | 'General Catering';

export interface Provider {
  id: string;
  name: string;
  rating: number;
  jobsPosted: number;
  verified: boolean;
}

export interface Job {
  id: string;
  title: string;
  category: string;
  location: string;
  distanceKm: number;
  date: string;
  time: string;
  durationHours: number;
  workersRequired: number;
  pay: number;
  paymentTerms: string;
  description: string;
  skills: string[];
  provider: Provider;
  recommended?: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  status: ApplicationStatus;
  appliedAt: string;
  timeline: { status: ApplicationStatus; label: string; date: string; done: boolean }[];
}

export interface WorkerProfile {
  name: string;
  phone: string;
  photoUrl: string;
  dob: string;
  gender: string;
  district: string;
  location: string;
  radiusKm: number;
  experience: string;
  skills: Skill[];
  availability: 'Weekdays' | 'Weekends' | 'Both';
  workPreference: 'One-day jobs' | 'Multiple-day jobs' | 'Both';
  completion: number;
  verified: boolean;
  rating: number;
  jobsCompleted: number;
  applicationsCount: number;
  acceptanceRate: number;
}

export interface NotificationItem {
  id: string;
  category: 'application' | 'job' | 'profile' | 'reminder';
  title: string;
  body: string;
  time: string;
  read: boolean;
}
