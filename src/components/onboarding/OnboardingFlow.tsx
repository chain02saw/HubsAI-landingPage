// src/components/onboarding/OnboardingFlow.tsx - Updated Flow Management
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../AuthContext';

// Step Components
import { LoginStep } from './steps/LoginStep';
import { ClaimWalletStep } from './steps/ClaimWalletStep';
import { ConnectWalletStep } from './steps/ConnectWalletStep';
import { ProfileSetupStep } from './steps/ProfileSetupStep';
import { CommunitySummaryStep } from './steps/CommunitySummaryStep';
import { Dashboard } from './dashboard/Dashboard';

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data?: any) => void;
  startFromProfile?: boolean;
  skipLoginStep?: boolean; // New prop to skip login step
}

export const OnboardingFlow = ({ 
  isOpen, 
  onClose, 
  onComplete, 
  startFromProfile = false,
  skipLoginStep = false 
}: OnboardingFlowProps) => {
  const { setWalletSetupComplete, user } = useAuth();
  
  // Improved initial step logic
  const getInitialStep = () => {
    // If user just signed up or logged in from profile, skip login step
    if (skipLoginStep && user) {
      return 1; // Start from Claim Wallet step
    }
    // If user exists and starting from profile, skip login
    if (user && startFromProfile) {
      return 1; // Start from Claim Wallet step
    }
    // If user clicked profile but not logged in, show login first
    if (startFromProfile && !user) {
      return 0; // Show login step
    }
    // Normal flow - if user exists, skip login
    return user ? 1 : 0;
  };
  
  const [currentStep, setCurrentStep] = useState(getInitialStep());
  const [profileData, setProfileData] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  // Handle step progression properly
  const handleNext = (data = null) => {
    if (data) setProfileData(data);
    
    console.log(`Advancing from step ${currentStep} to step ${currentStep + 1}`);
    
    if (currentStep === 4) {
      // After community summary, go to dashboard
      handleGoToDashboard();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleGoToDashboard = () => {
    console.log('Going to dashboard after onboarding');
    setWalletSetupComplete();
    setShowDashboard(true);
    setCurrentStep(5); // Set to dashboard step
  };

  const handleBackToLanding = () => {
    console.log('handleBackToLanding called');
    setWalletSetupComplete();
    setShowDashboard(false);
    setCurrentStep(getInitialStep()); // Reset to initial step
    setProfileData(null);
    
    if (onComplete) onComplete();
    if (onClose) onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Login/Signup step only
        return <LoginStep onNext={handleNext} onClose={onClose} />;
      case 1: // Claim Wallet step only
        return <ClaimWalletStep onNext={handleNext} onSkip={handleSkip} />;
      case 2: // Connect External Wallet
        return <ConnectWalletStep onNext={handleNext} onSkip={handleSkip} />;
      case 3: // Profile Setup
        return <ProfileSetupStep onNext={handleNext} />;
      case 4: // Community Summary
        return (
          <CommunitySummaryStep 
            onNext={handleGoToDashboard} 
            profileData={profileData || {}} 
          />
        );
      case 5: // Dashboard
        return (
          <Dashboard 
            onBackToLanding={handleBackToLanding} 
            profileData={profileData || {}} 
          />
        );
      default: 
        // Default fallback based on user authentication state
        if (user) {
          return <ClaimWalletStep onNext={handleNext} onSkip={handleSkip} />;
        }
        return <LoginStep onNext={handleNext} onClose={onClose} />;
    }
  };

  // If showing dashboard, render it fullscreen
  if (showDashboard || currentStep === 5) {
    return (
      <div className="fixed inset-0 bg-dark-950 z-[100]">
        <Dashboard 
          onBackToLanding={handleBackToLanding} 
          profileData={profileData || {}} 
        />
      </div>
    );
  }

  if (!isOpen) {
    return null;
  }

  // Calculate total steps and display step based on flow
  const getTotalSteps = () => {
    // If we started with a user or skipped login, we have 4 steps instead of 5
    if (skipLoginStep || (user && startFromProfile)) {
      return 4; // Claim Wallet, Connect Wallet, Profile Setup, Community Summary
    }
    return 5; // Login, Claim Wallet, Connect Wallet, Profile Setup, Community Summary
  };
  
  const getDisplayStep = () => {
    // If we skipped login, adjust the display
    if (skipLoginStep || (user && startFromProfile)) {
      // Current step is the display step (since we skipped step 0)
      return currentStep === 0 ? 1 : currentStep;
    }
    return currentStep + 1; // Normal flow with login step
  };

  const totalSteps = getTotalSteps();
  const displayStep = getDisplayStep();

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Container */}
        <div className="modal-container">
          <motion.div
            className="modal modal-large"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress indicator - show for setup steps only */}
            {currentStep < totalSteps && (
              <div className="flex items-center justify-center mb-8 relative z-10 pt-6">
                <div className="flex space-x-2">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <motion.div
                      key={i + 1}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i + 1 <= displayStep
                          ? 'bg-primary-500 shadow-lg shadow-primary-500/50' 
                          : 'bg-white/20'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </div>
                <motion.span 
                  className="ml-4 text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Step {displayStep} of {totalSteps}
                </motion.span>
              </div>
            )}

            {/* Close button - show for setup steps only */}
            {currentStep < totalSteps && (
              <motion.button
                onClick={onClose}
                className="modal-close"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.3 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}

            {/* Step content */}
            <div className="modal-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </>
    </AnimatePresence>
  );
};