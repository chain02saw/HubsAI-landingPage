// src/components/onboarding/OnboardingFlow.tsx - Enhanced Flow Management
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../AuthContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

// Step Components (import from your existing step files)
import { LoginStep } from './steps/LoginStep';
import { ClaimWalletStep } from './steps/ClaimWalletStep';
import { ConnectWalletStep } from './steps/ConnectWalletStep';
import { ProfileSetupStep } from './steps/ProfileSetupStep';
import { CommunitySummaryStep } from './steps/CommunitySummaryStep';
import { Dashboard } from './dashboard/Dashboard';

// Main OnboardingFlow component with enhanced flow management
interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const OnboardingFlow = ({ isOpen, onClose, onComplete }: OnboardingFlowProps) => {
  // All hooks must be called before any conditional logic
  const { setWalletSetupComplete } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [airdropClaimed, setAirdropClaimed] = useState(false);

  const handleNext = (data = null) => {
    if (data) setProfileData(data);
    
    if (currentStep === 5) {
      // After community summary, user chooses their path
      // This will be handled by the CommunitySummaryStep component
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
    setCurrentStep(6); // Set to dashboard step
  };

  const handleBackToLanding = () => {
    console.log('handleBackToLanding called');
    setWalletSetupComplete();
    setShowDashboard(false);
    setCurrentStep(1);
    setProfileData(null);
    setAirdropClaimed(false);
    
    if (onComplete) onComplete();
    if (onClose) onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: 
        return <LoginStep onNext={handleNext} onClose={onClose} />;
      case 2: 
        return <ClaimWalletStep onNext={handleNext} onSkip={handleSkip} />;
      case 3: 
        return <ConnectWalletStep onNext={handleNext} onSkip={handleSkip} />;
      case 4: 
        return <ProfileSetupStep onNext={handleNext} />;
      case 5: 
        return (
          <CommunitySummaryStep 
            onNext={handleGoToDashboard} 
            profileData={profileData || {}} 
          />
        );
      case 6: 
        return (
          <Dashboard 
            onBackToLanding={handleBackToLanding} 
            profileData={profileData || {}} 
          />
        );
      default: 
        return <LoginStep onNext={handleNext} onClose={onClose} />;
    }
  };

  // If showing dashboard, render it fullscreen
  if (showDashboard || currentStep === 6) {
    return (
      <div className="fixed inset-0 bg-dark-950 z-[100]">
        <Dashboard 
          onBackToLanding={handleBackToLanding} 
          profileData={profileData || {}} 
        />
      </div>
    );
  }

  // Conditional rendering AFTER all hooks are called
  if (!isOpen) {
    return null;
  }

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
            {/* Progress indicator - only show for steps 1-5 */}
            {currentStep <= 5 && (
              <div className="flex items-center justify-center mb-8 relative z-10 pt-6">
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <motion.div
                      key={step}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        step <= currentStep 
                          ? 'bg-primary-500 shadow-lg shadow-primary-500/50' 
                          : 'bg-white/20'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: step * 0.1 }}
                    />
                  ))}
                </div>
                <motion.span 
                  className="ml-4 text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Step {currentStep} of 5
                </motion.span>
              </div>
            )}

            {/* Close button - only show for steps 1-5 */}
            {currentStep <= 5 && (
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