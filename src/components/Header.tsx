import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginModal from './LoginModal'; // Import the LoginModal

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false); // Add login modal state
  
  const handleNavClick = (label: string) => {
    if (label === 'Profile') {
      setLoginModalOpen(true); // Open login modal for Profile
    } else if (label === 'Docs') {
      // Add docs navigation logic here
      console.log('Navigate to docs');
    } else if (label === 'Speak with Tyler') {
      // Add contact/speak with Tyler logic here
      console.log('Navigate to contact Tyler');
    }
    setMenuOpen(false); // Close mobile menu if open
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
              {['Docs', 'Profile', 'Speak with Tyler'].map((label, i) => (
                <motion.button
                  key={label}
                  onClick={() => handleNavClick(label)}
                  className="bg-teal-500/10 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-xl text-white border border-teal-300/50 hover:bg-gray-900 backdrop-blur-sm transition-all duration-300"               
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 + i * 10 }}
                >
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
                {['Docs', 'Profile', 'Speak with Tyler'].map((label, index) => (
                  <motion.button
                    key={label}
                    onClick={() => handleNavClick(label)}
                    className="block w-full text-left bg-teal-500/10 px-4 py-2 text-sm rounded-xl text-white border border-teal-300/50 hover:bg-gray-900 backdrop-blur-sm transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.3
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
      />
    </>
  );
};

export default Header;