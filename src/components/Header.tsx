import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthContext';
import LoginModal from './LoginModal';
import WalletSelectionModal from './WalletSelectionModal';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [walletSelectionOpen, setWalletSelectionOpen] = useState(false);
  const { user, loading, hasCompletedWalletSetup, signOut } = useAuth();
  
  // Auto-open wallet selection for new users who haven't completed setup
  useEffect(() => {
    if (user && !hasCompletedWalletSetup && !walletSelectionOpen && !loginModalOpen) {
      console.log('New user detected, opening wallet selection...');
      setTimeout(() => {
        setWalletSelectionOpen(true);
      }, 500);
    }
  }, [user, hasCompletedWalletSetup, walletSelectionOpen, loginModalOpen]);
  
  const handleNavClick = (label: string) => {
    if (label === 'Profile') {
      if (user) {
        // If user is logged in but hasn't completed wallet setup, show wallet selection
        if (!hasCompletedWalletSetup) {
          setWalletSelectionOpen(true);
        } else {
          // Show dashboard/profile (you can implement this later)
          console.log('Show user dashboard');
        }
      } else {
        setLoginModalOpen(true);
      }
    } else if (label === 'coming soon') {
      console.log('Navigate to coming soon');
    } else if (label === 'coming soon') {
      console.log('Navigate to contact Tyler');
    }
    setMenuOpen(false);
  };

  const getProfileButtonText = () => {
    if (loading) return 'Loading...';
    if (user) {
      if (!hasCompletedWalletSetup) {
        return 'Connect Wallet';
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

  // ✅ Helper function to get button text style
  const getButtonTextStyle = (label: string) => {
    return label === 'coming soon' ? 'italic' : '';
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
            >
              <img src="/assets/hubsai-logo.png" alt="HubsAI" className="h-8 sm:h-12" />
            </motion.div>

            {/* Navigation Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {['coming soon', getProfileButtonText(), 'coming soon'].map((label, i) => (
                <motion.button
                  key={`${label}-${i}`}
                  onClick={() => handleNavClick(label.includes('Dashboard') || label.includes('Connect') ? 'Profile' : label)}
                  disabled={loading}
                  className={`px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-xl text-white border transition-all duration-300 backdrop-blur-sm ${getProfileButtonStyle()} ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  } ${getButtonTextStyle(label)}`} // ✅ Added italic style
                  whileHover={!loading ? { scale: 1.05 } : {}}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 + i * 10 }}
                >
                  {user && (label.includes('Dashboard') || label.includes('Connect')) && (
                    <span className={`w-2 h-2 rounded-full inline-block mr-2 ${
                      hasCompletedWalletSetup ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></span>
                  )}
                  {label}
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
                {['coming soon', getProfileButtonText(), 'coming soon'].map((label, index) => (
                  <motion.button
                    key={`mobile-${label}-${index}`}
                    onClick={() => handleNavClick(label.includes('Dashboard') || label.includes('Connect') ? 'Profile' : label)}
                    disabled={loading}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-xl text-white border transition-all duration-300 backdrop-blur-sm ${getProfileButtonStyle()} ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    } ${getButtonTextStyle(label)}`} // ✅ Added italic style for mobile too
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
                    {user && (label.includes('Dashboard') || label.includes('Connect')) && (
                      <span className={`w-2 h-2 rounded-full inline-block mr-2 ${
                        hasCompletedWalletSetup ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></span>
                    )}
                    {label}
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

      {/* Login Modal - No callback needed */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)}
      />

      {/* Wallet Selection Modal */}
      <WalletSelectionModal 
        isOpen={walletSelectionOpen} 
        onClose={() => setWalletSelectionOpen(false)} 
      />
    </>
  );
};

export default Header;