// src/components/onboarding/OnboardingFlow.tsx - COMPLETE FIXED VERSION
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../AuthContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

// Step Components (same as before)
const LoginStep = ({ onNext, onClose }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '', password: '', confirmPassword: '', name: ''
  });
  const { signUp, signIn } = useAuth();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    if (!isLogin) {
      if (!formData.name) {
        setError('Name is required');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    setLoading(true);
    try {
      const result = isLogin 
        ? await signIn(formData.email, formData.password)
        : await signUp(formData.email, formData.password, formData.name);
      
      if (result.success) {
        onNext();
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          {isLogin ? 'Welcome Back' : 'Join HubsAI'}
        </h2>
        <p className="text-gray-300">
          {isLogin ? 'Sign in to claim your NFT + rewards' : 'Create account to start your journey'}
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter your full name"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your password"
          />
        </div>

        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Confirm your password"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all duration-300"
        >
          {loading ? 'Processing...' : 'Continue'}
        </button>
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            disabled={loading}
            className="ml-2 text-primary-400 hover:text-primary-300 disabled:opacity-50 font-medium transition-colors"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

const ClaimWalletStep = ({ onNext, onSkip }) => {
  const { createClaimWallet, claimWalletAddress } = useAuth();
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(!!claimWalletAddress);

  const handleCreateWallet = async () => {
    setLoading(true);
    try {
      const address = await createClaimWallet();
      if (address) {
        setCreated(true);
      }
    } catch (error) {
      console.error('Error creating wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
        <span className="text-3xl">📧</span>
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">Claim Your Wallet</h2>
      <p className="text-gray-300 mb-8">
        We'll create a secure wallet tied to your email so you can access and stake your NFT anytime.
      </p>

      {created ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <p className="text-green-400 font-medium">✅ Wallet Created Successfully!</p>
            {claimWalletAddress && (
              <p className="text-xs text-gray-400 mt-2 font-mono">
                {claimWalletAddress.slice(0, 8)}...{claimWalletAddress.slice(-8)}
              </p>
            )}
          </div>
          <button
            onClick={onNext}
            className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-bold rounded-xl transition-all duration-300"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleCreateWallet}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all duration-300"
          >
            {loading ? 'Creating Wallet...' : 'Create Wallet'}
          </button>
          <button
            onClick={onSkip}
            className="w-full py-2 text-gray-400 hover:text-white transition-colors"
          >
            Skip for now
          </button>
        </div>
      )}
    </div>
  );
};

const ConnectWalletStep = ({ onNext, onSkip }) => {
  const { connected, publicKey, wallet } = useWallet();
  const { setVisible } = useWalletModal();

  React.useEffect(() => {
    if (connected && publicKey) {
      setTimeout(onNext, 1500);
    }
  }, [connected, publicKey, onNext]);

  const handleConnect = () => {
    setVisible(true);
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
        <span className="text-3xl">🦊</span>
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">Connect External Wallet</h2>
      <p className="text-gray-300 mb-8">
        Connect your Phantom, Backpack, Solflare, or other Solana wallet for enhanced features.
      </p>

      {connected && publicKey ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <p className="text-green-400 font-medium">✅ {wallet?.adapter.name} Connected!</p>
            <p className="text-xs text-gray-400 mt-2 font-mono">
              {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={handleConnect}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold rounded-xl transition-all duration-300"
          >
            Connect Wallet
          </button>
          <button
            onClick={onSkip}
            className="w-full py-2 text-gray-400 hover:text-white transition-colors"
          >
            Skip for now
          </button>
        </div>
      )}
    </div>
  );
};

const ProfileSetupStep = ({ onNext }) => {
  const [formData, setFormData] = useState({
    fullName: '', username: '', country: '', avatar: null
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.username || !formData.country) {
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNext(formData);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Create Your Profile</h2>
        <p className="text-gray-300">Tell us about yourself to personalize your experience</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Username / Handle</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Choose a username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select your country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="JP">Japan</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !formData.fullName || !formData.username || !formData.country}
          className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300"
        >
          {loading ? 'Creating Profile...' : 'Join Community'}
        </button>
      </div>
    </div>
  );
};

const CommunitySummaryStep = ({ onNext, profileData }) => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome to HubsAI Community! 🎉</h2>
        <p className="text-gray-300">
          Hey {profileData?.fullName || user?.name || 'there'}! Your rewards journey starts here
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Your NFT Collection
          </h3>
          <div className="space-y-3">
            {[
              { name: 'HubsAI Genesis', rarity: 'Legendary', rewards: '12.5 HUBS/day' },
              { name: 'Retail Pioneer', rarity: 'Rare', rewards: '8.2 HUBS/day' }
            ].map((nft, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎨</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{nft.name}</p>
                  <p className="text-sm text-gray-400">{nft.rarity} • {nft.rewards}</p>
                </div>
                <span className="text-green-400 text-sm">✓ Ready</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            Brand Rewards
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Nike', reward: '5% cashback', logo: '👟' },
              { name: 'Apple', reward: '3% rewards', logo: '🍎' },
              { name: 'Amazon', reward: '2% back', logo: '📦' },
              { name: 'Starbucks', reward: '4% rewards', logo: '☕' }
            ].map((brand, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-lg">{brand.logo}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{brand.name}</p>
                  <p className="text-sm text-gray-400">{brand.reward}</p>
                </div>
                <span className="text-primary-400 text-sm">Available</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <div className="p-4 bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-500/30 rounded-xl mb-6">
          <p className="text-primary-300 font-medium">
            🎉 Congratulations! You're now part of the HubsAI community
          </p>
        </div>
        
        <button
          onClick={onNext}
          className="w-full max-w-md mx-auto block py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-bold rounded-xl transition-all duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

// CORRECTED OnboardingFlow.tsx - Move useAuth to top level


// Step 6: Fixed Dashboard Component
const DashboardStep = ({ onBackToLanding, profileData }) => {
  // ✅ CORRECT: useAuth called at component top level
  const { setWalletSetupComplete } = useAuth();

  const handleEmergencyClose = () => {
    // ✅ Now use the function from hook called above
    setWalletSetupComplete();
    if (onBackToLanding) {
      onBackToLanding();
    }
    // Force close any remaining modals
    const modals = document.querySelectorAll('[class*="z-[60]"], [class*="z-[70]"], [class*="z-[100]"]');
    modals.forEach(modal => modal.remove());
  };

  const handleBackClick = () => {
    // ✅ Use the function from hook called above
    setWalletSetupComplete();
    if (onBackToLanding) {
      onBackToLanding();
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6">
      {/* Emergency close button at the top */}
      <div className="fixed top-4 right-4 z-[200]">
        <button
          onClick={handleEmergencyClose}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg"
        >
          🔴 Force Close
        </button>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome, {profileData?.fullName || 'User'}! 👋</h1>
          <p className="text-gray-400">Your HubsAI dashboard is ready</p>
        </div>
        <button
          onClick={handleBackClick}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-colors"
        >
          ← Back to Landing
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-2">🎨 NFT Vault</h3>
          <p className="text-gray-400 text-sm">View and manage your NFT collection</p>
        </div>
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-2">💰 Rewards</h3>
          <p className="text-gray-400 text-sm">Track your daily HUBS earnings</p>
        </div>
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-2">🤝 Brands</h3>
          <p className="text-gray-400 text-sm">Discover partner rewards</p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-green-400 font-medium">🎉 Dashboard Coming Soon - Full experience in development!</p>
      </div>
    </div>
  );
};

// Main OnboardingFlow component
export const OnboardingFlow = ({ isOpen, onClose, onComplete }) => {
  // ✅ CORRECT: All hooks called at top level of component
  const { setWalletSetupComplete } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleNext = (data = null) => {
    if (data) setProfileData(data);
    
    if (currentStep === 6) {
      setShowDashboard(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBackToLanding = () => {
    console.log('handleBackToLanding called');
    
    // ✅ Use the hook function from top level
    setWalletSetupComplete();
    
    setShowDashboard(false);
    setCurrentStep(1);
    setProfileData(null);
    
    if (onComplete) onComplete();
    if (onClose) onClose();
  };

  // Rest of your step components (LoginStep, ClaimWalletStep, etc.) here...
  // [Keep all your existing step components - just the main logic above is fixed]

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <LoginStep onNext={handleNext} onClose={onClose} />;
      case 2: return <ClaimWalletStep onNext={handleNext} onSkip={handleSkip} />;
      case 3: return <ConnectWalletStep onNext={handleNext} onSkip={handleSkip} />;
      case 4: return <ProfileSetupStep onNext={handleNext} />;
      case 5: return <CommunitySummaryStep onNext={handleNext} profileData={profileData} />;
      case 6: return <DashboardStep onBackToLanding={handleBackToLanding} profileData={profileData} />;
      default: return <LoginStep onNext={handleNext} onClose={onClose} />;
    }
  };

  if (showDashboard) {
    return (
      <div className="fixed inset-0 bg-dark-950 z-[100]">
        <DashboardStep onBackToLanding={handleBackToLanding} profileData={profileData} />
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
            <motion.div
              className="glass rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-600/5 rounded-3xl" />
              
              {currentStep < 6 && (
                <div className="flex items-center justify-center mb-8 relative z-10">
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div
                        key={step}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          step <= currentStep ? 'bg-primary-500' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-4 text-sm text-gray-400">
                    Step {currentStep} of 5
                  </span>
                </div>
              )}

              {currentStep < 6 && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              <div className="relative z-10">
                {renderStep()}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};