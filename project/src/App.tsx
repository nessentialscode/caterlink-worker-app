import { AppProvider, useApp } from '@/store/AppContext';
import { BottomNavigation, ToastStack } from '@/components/ui';
import { SplashScreen } from '@/screens/SplashScreen';
import { WelcomeScreen } from '@/screens/WelcomeScreen';
import { PhoneLoginScreen } from '@/screens/PhoneLoginScreen';
import { OtpScreen } from '@/screens/OtpScreen';
import { ProfileSetupScreen } from '@/screens/ProfileSetupScreen';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { JobsScreen } from '@/screens/JobsScreen';
import { JobDetailsScreen } from '@/screens/JobDetailsScreen';
import { ApplicationsScreen } from '@/screens/ApplicationsScreen';
import { ApplicationDetailsScreen } from '@/screens/ApplicationDetailsScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { EditProfileScreen } from '@/screens/EditProfileScreen';
import { NotificationsScreen } from '@/screens/NotificationsScreen';
import type { ScreenName } from '@/types';

const ONBOARDING_SCREENS: ScreenName[] = [
  'splash',
  'welcome',
  'phoneLogin',
  'otp',
  'profileSetup',
];

const TAB_SCREENS: ScreenName[] = ['dashboard', 'jobs', 'applications', 'profile'];

const DETAIL_SCREENS: ScreenName[] = [
  'jobDetails',
  'applicationDetails',
  'editProfile',
  'notifications',
];

function ScreenRouter() {
  const { screen } = useApp();

  const isOnboarding = ONBOARDING_SCREENS.includes(screen);
  const isTabScreen = TAB_SCREENS.includes(screen);
  const isDetailScreen = DETAIL_SCREENS.includes(screen);
  const showBottomNav = isTabScreen;

  let content: React.ReactNode;
  let animClass = 'animate-fade-in';

  switch (screen) {
    case 'splash':
      content = <SplashScreen />;
      break;
    case 'welcome':
      content = <WelcomeScreen />;
      animClass = 'animate-slide-up-fade';
      break;
    case 'phoneLogin':
      content = <PhoneLoginScreen />;
      animClass = 'animate-slide-in-right';
      break;
    case 'otp':
      content = <OtpScreen />;
      animClass = 'animate-slide-in-right';
      break;
    case 'profileSetup':
      content = <ProfileSetupScreen />;
      animClass = 'animate-slide-in-right';
      break;
    case 'dashboard':
      content = <DashboardScreen />;
      break;
    case 'jobs':
      content = <JobsScreen />;
      break;
    case 'jobDetails':
      content = <JobDetailsScreen />;
      animClass = 'animate-slide-in-right';
      break;
    case 'applications':
      content = <ApplicationsScreen />;
      break;
    case 'applicationDetails':
      content = <ApplicationDetailsScreen />;
      animClass = 'animate-slide-in-right';
      break;
    case 'profile':
      content = <ProfileScreen />;
      break;
    case 'editProfile':
      content = <EditProfileScreen />;
      animClass = 'animate-slide-in-right';
      break;
    case 'notifications':
      content = <NotificationsScreen />;
      animClass = 'animate-slide-in-right';
      break;
    default:
      content = <SplashScreen />;
  }

  if (isOnboarding) {
    return (
      <div className="min-h-screen bg-white">
        <div className={animClass}>{content}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-100 flex flex-col">
      <main className={`flex-1 flex flex-col max-w-[430px] w-full mx-auto ${animClass}`}>
        <div className="flex-1 pt-3">
          {content}
        </div>
      </main>
      {showBottomNav && (
        <div className="max-w-[430px] w-full mx-auto">
          <BottomNavigation />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-ink-100">
        <div className="max-w-[430px] mx-auto min-h-screen bg-ink-100 relative">
          <ScreenRouter />
        </div>
        <ToastStack />
      </div>
    </AppProvider>
  );
}

export default App;
