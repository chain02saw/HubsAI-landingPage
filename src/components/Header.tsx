// src/components/Header.tsx - Fixed Navigation Flow
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthContext';
import WalletSelectionModal from './WalletSelectionModal';
import { OnboardingFlow } from './onboarding/OnboardingFlow';
import { Dashboard } from './onboarding/dashboard';
import { SolanaWalletProvider } from './WalletProvider';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletSelectionOpen, setWalletSelectionOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [startFromProfile, setStartFromProfile] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [userExplicitlyClosed, setUserExplicitlyClosed] = useState(false); // Track explicit close

  const { user, loading, hasCompletedWalletSetup, signOut } = useAuth();

  // Refs to track modal states and prevent conflicts
  const hasTriggeredOnboarding = useRef(false);
  const isProcessingAuth = useRef(false);
  const onboardingTimeout = useRef<NodeJS.Timeout | null>(null);
  const justSignedUp = useRef(false); // Track if user just signed up

  // Reset triggers when user logs out
  useEffect(() => {
    if (!user) {
      hasTriggeredOnboarding.current = false;
      isProcessingAuth.current = false;
      justSignedUp.current = false;
      setUserExplicitlyClosed(false);
      if (onboardingTimeout.current) {
        clearTimeout(onboardingTimeout.current);
      }
    }
  }, [user]);

  // Auto-open onboarding for new users - with improved logic
  useEffect(() => {
    // Only trigger if:
    // 1. User exists
    // 2. Hasn't completed wallet setup
    // 3. No modals are currently open
    // 4. Haven't already triggered onboarding
    // 5. Not currently processing authentication
    // 6. User hasn't explicitly closed the modal
    // 7. Not manually triggered from profile button
    if (
      user &&
      !hasCompletedWalletSetup &&
      !onboardingOpen &&
      !walletSelectionOpen &&
      !dashboardOpen &&
      !hasTriggeredOnboarding.current &&
      !isProcessingAuth.current &&
      !userExplicitlyClosed &&
      !startFromProfile
    ) {
      console.log('New user detected, scheduling onboarding flow...');
      hasTriggeredOnboarding.current = true;

      // Delay onboarding to ensure any other modals are fully closed
      onboardingTimeout.current = setTimeout(() => {
        console.log('Opening onboarding flow for new user');
        setOnboardingOpen(true);
        isProcessingAuth.current = false;
      }, 1000);
    }

    return () => {
      if (onboardingTimeout.current) {
        clearTimeout(onboardingTimeout.current);
      }
    };
  }, [user, hasCompletedWalletSetup, onboardingOpen, walletSelectionOpen, dashboardOpen, startFromProfile, userExplicitlyClosed]);

  const handleNavClick = (label: string) => {
    if (label === 'Profile' || label === 'Login') {
      if (user) {
        if (!hasCompletedWalletSetup) {
          // User manually clicked profile before auto-onboarding
          // Start from claim wallet step (STEP 1) since they're already logged in
          hasTriggeredOnboarding.current = true;
          if (onboardingTimeout.current) {
            clearTimeout(onboardingTimeout.current);
          }
          setStartFromProfile(true);
          setUserExplicitlyClosed(false); // Reset explicit close flag
          setOnboardingOpen(true);
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        // User not logged in, show onboarding flow directly
        setStartFromProfile(true);
        setOnboardingOpen(true);
      }
    } else if (label === 'Dashboard') {
      window.location.href = '/dashboard';
    } else if (label === 'Docs - coming soon') {
      window.open('https://hubsai.gitbook.io/hubsai-docs/', '_blank');
    } else if (label === 'AI Ty - coming soon') {
      console.log('Navigate to AI Ty');
    }
    setMenuOpen(false);
  };

  const getProfileButtonStyle = () => {
    if (user && !hasCompletedWalletSetup) {
      return 'btn btn-secondary btn-sm bg-yellow-500/20 border-yellow-400/50 hover:bg-yellow-500/30';
    }
    if (user && hasCompletedWalletSetup) {
      return 'btn btn-primary btn-sm';
    }
    return 'btn btn-secondary btn-sm';
  };

  const handleOnboardingComplete = (data: any) => {
    console.log('Onboarding completed');
    setProfileData(data);
    setOnboardingOpen(false);
    setStartFromProfile(false);
    setUserExplicitlyClosed(false);
    setDashboardOpen(true);
    isProcessingAuth.current = false;
    justSignedUp.current = false;
  };

  const handleOnboardingClose = () => {
    console.log('Onboarding closed by user');
    setOnboardingOpen(false);
    setStartFromProfile(false);
    setUserExplicitlyClosed(true); // Mark that user explicitly closed
    isProcessingAuth.current = false;
    justSignedUp.current = false;
    // Reset trigger so user can manually open later if needed
    hasTriggeredOnboarding.current = false;
  };

  const handleBackToLanding = () => {
    setDashboardOpen(false);
    setProfileData(null);
  };

  const handleSignOut = () => {
    signOut();
    setDashboardOpen(false);
    setProfileData(null);
    setMenuOpen(false);
    hasTriggeredOnboarding.current = false;
    setStartFromProfile(false);
    setUserExplicitlyClosed(false);
    justSignedUp.current = false;
  };

  // Helper function to render button text with mixed styling
  const renderButtonText = (label: string) => {
    if (label === 'Docs - coming soon') {
      return (
        <>
          Docs - <span className="italic opacity-70">coming soon</span>
        </>
      );
    }
    if (label === 'AI Ty - coming soon') {
      return (
        <>
          AI Ty - <span className="italic opacity-70">coming soon</span>
        </>
      );
    }
    return label;
  };

  // Get navigation items based on user state
  const getNavItems = () => {
    const items = ['Docs - coming soon'];

    if (user && hasCompletedWalletSetup) {
      items.push('Dashboard');
    } else {
      // Convert the profile button text to string, removing any JSX
      const profileText = loading ? 'Loading...' :
        user ? (!hasCompletedWalletSetup ? 'Complete Setup' : 'Dashboard') :
          (localStorage.getItem('user') && localStorage.getItem('user') !== 'null' ? <a className="text-white" href="/dashboard">Dashboard</a> : 'Login');
      items.push(profileText as string);
    }

    items.push('AI Ty - coming soon');
    return items;
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-transparent app-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-28 py-8">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              onClick={handleBackToLanding}
              style={{ cursor: 'pointer' }}
            >
              <img src="/assets/hubsai-logo.png" alt="HubsAI" className="h-8 sm:h-12 logo" />
            </motion.div>

            {/* Navigation Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {getNavItems().map((label, i) => (
                <motion.button
                  key={`${label}-${i}`}
                  onClick={() => handleNavClick(label.includes('Dashboard') || label.includes('Complete') ? 'Profile' : label === 'Dashboard' ? 'Dashboard' : label)}
                  disabled={loading}
                  className={`${getProfileButtonStyle()} ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  whileHover={!loading ? { scale: 1.05 } : {}}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 + i * 10 }}
                >
                  {/* Status indicator for user buttons */}
                  {user && (label.includes('Dashboard') || label.includes('Complete')) && (
                    <span className={`status-dot ${hasCompletedWalletSetup ? 'green' : 'yellow'
                      } mr-2`}></span>
                  )}
                  {renderButtonText(label)}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </nav>

          {/* Mobile Menu with Animation */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="mobile-menu md:hidden"
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: 'easeInOut',
                  height: { duration: 0.4 }
                }}
              >
                {getNavItems().map((label, index) => (
                  <motion.button
                    key={`mobile-${label}-${index}`}
                    onClick={() => handleNavClick(label.includes('Dashboard') || label.includes('Complete') ? 'Profile' : label === 'Dashboard' ? 'Dashboard' : label)}
                    disabled={loading}
                    className={`mobile-menu-item w-full text-left ${getProfileButtonStyle().replace('btn-sm', '')} ${loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.3
                    }}
                    whileHover={!loading ? { scale: 1.02 } : {}}
                    whileTap={!loading ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center">
                      {user && (label.includes('Dashboard') || label.includes('Complete')) && (
                        <span className={`status-dot ${hasCompletedWalletSetup ? 'green' : 'yellow'
                          } mr-3`}></span>
                      )}
                      {renderButtonText(label)}
                    </div>
                  </motion.button>
                ))}

                {/* Sign out option for mobile when logged in */}
                {user && (
                  <motion.button
                    onClick={handleSignOut}
                    className="mobile-menu-item w-full text-left text-red-400 hover:text-red-300 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      delay: 0.3,
                      duration: 0.3
                    }}
                  >
                    <div className="flex items-center">
                      <span className="status-dot red mr-3"></span>
                      Sign Out
                    </div>
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Modals and Flows - with proper state management */}
      <WalletSelectionModal
        isOpen={walletSelectionOpen}
        onClose={() => setWalletSelectionOpen(false)}
      />

      <OnboardingFlow
        isOpen={onboardingOpen}
        onClose={handleOnboardingClose}
        onComplete={handleOnboardingComplete}
        startFromProfile={startFromProfile}
        skipLoginStep={false}
      />

      {/* Dashboard as fullscreen overlay */}
      <AnimatePresence>
        {dashboardOpen && (
          <motion.div
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SolanaWalletProvider>
              <Dashboard
                onBackToLanding={handleBackToLanding}
                profileData={profileData}
              />
            </SolanaWalletProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;