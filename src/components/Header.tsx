import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './AuthContext';
import { OnboardingFlow } from './onboarding/OnboardingFlow';

const Header: React.FC = () => {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const { user, hasCompletedWalletSetup } = useAuth();

  const handleCreateAccount = () => {
    if (user && hasCompletedWalletSetup) {
      // User is fully set up, redirect to community site
      window.open('https://community.hubsai.io/', '_blank');
    } else {
      // Show onboarding flow
      setOnboardingOpen(true);
    }
  };

  const handleOnboardingClose = () => {
    setOnboardingOpen(false);
  };

  const handleOnboardingComplete = () => {
    setOnboardingOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <img 
                src="/assets/svg/HubsAI_Logo.svg" 
                alt="HubsAI" 
                className="h-8"
              />
            </motion.div>

            {/* Right side - Social icons and CTA button */}
            <div className="flex items-center space-x-4">
              {/* Social Icons */}
              <div className="flex items-center space-x-3">
                <a 
                  href="#" 
                  className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <img src="/assets/svg/instagram_icon.svg" alt="Instagram" className="w-5 h-5" />
                </a>
                <a 
                  href="https://x.com/HubsaiOfficial" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <img src="/assets/svg/x_icon.svg" alt="X (Twitter)" className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <img src="/assets/svg/discord_icon.svg" alt="Discord" className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <img src="/assets/svg/telegram_icon.svg" alt="Telegram" className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <img src="/assets/svg/linkedin_icon.svg" alt="LinkedIn" className="w-5 h-5" />
                </a>
              </div>

              {/* Create Account Button */}
              <motion.button
                onClick={handleCreateAccount}
                className="bg-teal-500 hover:bg-teal-600 text-black font-semibold px-6 py-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create HUBs Rewards account
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Onboarding Flow */}
      <OnboardingFlow
        isOpen={onboardingOpen}
        onClose={handleOnboardingClose}
        onComplete={handleOnboardingComplete}
        skipLoginStep={false}
      />
    </>
  );
};

export default Header;