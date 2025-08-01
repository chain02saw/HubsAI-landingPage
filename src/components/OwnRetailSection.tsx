import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './AuthContext';
import { OnboardingFlow } from './onboarding/OnboardingFlow';

const OwnRetailSection: React.FC = () => {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const { user, hasCompletedWalletSetup } = useAuth();

  const handleJoinAirdrop = () => {
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
      <section className="relative py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-10 left-10 w-20 h-20 bg-yellow-500/20 rounded-full"
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-20 right-20 w-16 h-16 bg-teal-500/20 rounded-full"
              animate={{ 
                y: [0, 20, 0],
                x: [0, -10, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-500/20 rounded-full"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 0.8, 1]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Content */}
          <motion.div
            className="relative z-10 space-y-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Own the Retail Platform<br />
              of the Future.
            </h2>

            <motion.button
              onClick={handleJoinAirdrop}
              className="bg-teal-500 hover:bg-teal-600 text-black font-bold px-8 py-4 rounded-lg text-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join the Airdrop
            </motion.button>

            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Access the exclusive airdrop | Create an account built for platform features.
            </p>
          </motion.div>
        </div>
      </section>

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

export default OwnRetailSection;