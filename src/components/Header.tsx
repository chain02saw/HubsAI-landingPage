// src/components/Header.tsx - Fixed Double Modal Issue
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthContext';
import LoginModal from './LoginModal';
import WalletSelectionModal from './WalletSelectionModal';
import { OnboardingFlow } from './onboarding/OnboardingFlow';
import { Dashboard } from './onboarding/dashboard';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [walletSelectionOpen, setWalletSelectionOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  
  const { user, loading, hasCompletedWalletSetup, signOut } = useAuth();
  
  // Refs to track modal states and prevent conflicts
  const hasTriggeredOnboarding = useRef(false);
  const isProcessingAuth = useRef(false);
  const onboardingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Reset triggers when user logs out
  useEffect(() => {
    if (!user) {
      hasTriggeredOnboarding.current = false;
      isProcessingAuth.current = false;
      if (onboardingTimeout.current) {
        clearTimeout(onboardingTimeout.current);
      }
    }
  }, [user]);

  // Auto-open onboarding for new users - with proper timing control
  useEffect(() => {
    // Only trigger if:
    // 1. User exists
    // 2. Hasn't completed wallet setup
    // 3. No modals are currently open
    // 4. Haven't already triggered onboarding
    // 5. Not currently processing authentication
    if (
      user && 
      !hasCompletedWalletSetup && 
      !onboardingOpen && 
      !loginModalOpen && 
      !walletSelectionOpen &&
      !hasTriggeredOnboarding.current &&
      !isProcessingAuth.current
    ) {
      console.log('New user detected, scheduling onboarding flow...');
      hasTriggeredOnboarding.current = true;
      
      // Delay onboarding to ensure any other modals are fully closed
      onboardingTimeout.current = setTimeout(() => {
        console.log('Opening onboarding flow for new user');
        setOnboardingOpen(true);
        isProcessingAuth.current = false;
      }, 1000); // Longer delay to ensure clean transition
    }

    return () => {
      if (onboardingTimeout.current) {
        clearTimeout(onboardingTimeout.current);
      }
    };
  }, [user, hasCompletedWalletSetup, onboardingOpen, loginModalOpen, walletSelectionOpen]);

  const handleNavClick = (label: string) => {
    if (label === 'Profile') {
      if (user) {
        if (!hasCompletedWalletSetup) {
          // User manually clicked profile before auto-onboarding
          hasTriggeredOnboarding.current = true;
          if (onboardingTimeout.current) {
            clearTimeout(onboardingTimeout.current);
          }
          setOnboardingOpen(true);
        } else {
          setDashboardOpen(true);
        }
      } else {
        setLoginModalOpen(true);
      }
    } else if (label === 'Docs - coming soon') {
      console.log('Navigate to docs');
    } else if (label === 'AI Ty - coming soon') {
      console.log('Navigate to AI Ty');
    }
    setMenuOpen(false);
  };

  const getProfileButtonText = () => {
    if (loading) return 'Loading...';
    if (user) {
      if (!hasCompletedWalletSetup) {
        return 'Complete Setup';
      }
      return user.name || 'Dashboard';
    }
    return 'Profile';
  };

  const getProfileButtonStyle = () => {
    if (user && !hasCompletedWalletSetup) {
      return 'bg-yellow-500/20 border-yellow-400/50 hover:bg-yellow-500/30';
    }
    if (user && hasCompletedWalletSetup) {
      return 'bg-primary-500/20 border-primary-400/50 hover:bg-primary-500/30';
    }
    return 'bg-teal-500/10 border-teal-300/50 hover:bg-gray-900';
  };

  const handleLoginSuccess = () => {
    console.log('Login successful, setting processing flag');
    isProcessingAuth.current = true;
    
    // Close login modal first
    setLoginModalOpen(false);
    
    // Don't automatically trigger onboarding here - let the useEffect handle it
    // after a proper delay to avoid double modals
  };

  const handleOnboardingComplete = (data: any) => {
    console.log('Onboarding completed');
    setProfileData(data);
    setOnboardingOpen(false);
    setDashboardOpen(true);
    isProcessingAuth.current = false;
  };

  const handleOnboardingClose = () => {
    console.log('Onboarding closed');
    setOnboardingOpen(false);
    isProcessingAuth.current = false;
    // Reset trigger in case user wants to try again later
    hasTriggeredOnboarding.current = false;
  };

  const handleBackToLanding = () => {
    setDashboardOpen(false);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
    isProcessingAuth.current = false;
  };

  // Helper function to render button text with mixed styling
  const renderButtonText = (label: string) => {
    if (label === 'Docs - coming soon') {
      return (
        <>
          Docs - <span className="italic">coming soon</span>
        </>
      );
    }
    if (label === 'AI Ty - coming soon') {
      return (
        <>
          AI Ty - <span className="italic">coming soon</span>
        </>
      );
    }
    return label;
  };
  
  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-transparent"
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
              <img src="/assets/hubsai-logo.png" alt="HubsAI" className="h-8 sm:h-12" />
            </motion.div>

            {/* Navigation Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {['Docs - coming soon', getProfileButtonText(), 'AI Ty - coming soon'].map((label, i) => (
                <motion.button
                  key={`${label}-${i}`}
                  onClick={() => handleNavClick(label.includes('Dashboard') || label.includes('Complete') ? 'Profile' : label)}
                  disabled={loading}
                  className={`px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-xl text-white border transition-all duration-300 backdrop-blur-sm ${getProfileButtonStyle()} ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  whileHover={!loading ? { scale: 1.05 } : {}}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 + i * 10 }}
                >
                  {user && (label.includes('Dashboard') || label.includes('Complete')) && (
                    <span className={`w-2 h-2 rounded-full inline-block mr-2 ${
                      hasCompletedWalletSetup ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></span>
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
                className="md:hidden mt-4 space-y-2 overflow-hidden"
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ 
                  duration: 0.4, 
                  ease: 'easeInOut',
                  height: { duration: 0.4 }
                }}
              >
                {['Docs - coming soon', getProfileButtonText(), 'AI Ty - coming soon'].map((label, index) => (
                  <motion.button
                    key={`mobile-${label}-${index}`}
                    onClick={() => handleNavClick(label.includes('Dashboard') || label.includes('Complete') ? 'Profile' : label)}
                    disabled={loading}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-xl text-white border transition-all duration-300 backdrop-blur-sm ${getProfileButtonStyle()} ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
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
                    {user && (label.includes('Dashboard') || label.includes('Complete')) && (
                      <span className={`w-2 h-2 rounded-full inline-block mr-2 ${
                        hasCompletedWalletSetup ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></span>
                    )}
                    {renderButtonText(label)}
                  </motion.button>
                ))}

                {/* Sign out option for mobile when logged in */}
                {user && (
                  <motion.button
                    onClick={() => {
                      signOut();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm rounded-xl text-red-400 hover:text-red-300 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ 
                      delay: 0.3,
                      duration: 0.3
                    }}
                  >
                    Sign Out
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Modals and Flows - with proper state management */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={handleLoginModalClose}
        onLoginSuccess={handleLoginSuccess}
      />

      <WalletSelectionModal 
        isOpen={walletSelectionOpen} 
        onClose={() => setWalletSelectionOpen(false)} 
      />

      <OnboardingFlow 
        isOpen={onboardingOpen}
        onClose={handleOnboardingClose}
        onComplete={()=>handleOnboardingComplete}
      />

      {/* Dashboard as fullscreen overlay */}
      {dashboardOpen && (
        <Dashboard 
          onBackToLanding={handleBackToLanding}
          profileData={profileData}
        />
      )}
    </>
  );
};

export default Header;