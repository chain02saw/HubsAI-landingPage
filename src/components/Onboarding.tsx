
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Context (replace with your actual context imports)
const useAuth = () => ({
  signUp: async (email, password, name) => ({ success: true }),
  signIn: async (email, password) => ({ success: true }),
  createClaimWallet: async () => '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  claimWalletAddress: null,
  user: { name: 'John Doe', email: 'john@example.com' }
});

const useWallet = () => ({
  connected: false,
  publicKey: null,
  wallet: null
});

const useWalletModal = () => ({
  setVisible: (visible) => console.log('Wallet modal:', visible)
});

// Step 1: Enhanced Login Component
const LoginStep = ({ onNext, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const { signUp, signIn } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
      let result;
      if (isLogin) {
        result = await signIn(formData.email, formData.password);
      } else {
        result = await signUp(formData.email, formData.password, formData.name);
      }

      if (result.success) {
        onNext();
      } else {
        setError(result.error);
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
            className="ml-2 text-primary-400 hover:text-primary-300 font-medium"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

// Step 2: Claim Wallet
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

// Step 3: Connect External Wallet
const ConnectWalletStep = ({ onNext, onSkip }) => {
  const { connected, publicKey, wallet } = useWallet();
  const { setVisible } = useWalletModal();

  useEffect(() => {
    if (connected && publicKey) {
      setTimeout(onNext, 1000);
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

// Step 4: Profile Setup
const ProfileSetupStep = ({ onNext }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    country: '',
    avatar: null
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.username || !formData.country) {
      return;
    }
    
    setLoading(true);
    
    // Simulate profile creation
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

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Avatar (Optional)</label>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
              <span className="text-2xl">👤</span>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 transition-colors"
            >
              Upload Photo
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all duration-300"
        >
          {loading ? 'Creating Profile...' : 'Join Community'}
        </button>
      </div>
    </div>
  );
};

// Step 5: Community Summary
const CommunitySummaryStep = ({ onNext, profileData }) => {
  const mockNFTs = [
    { id: 1, name: 'HubsAI Genesis', image: '/assets/hubsai-logo.png', rarity: 'Rare' },
    { id: 2, name: 'Retail Token', image: '/assets/hubsai-logo.png', rarity: 'Common' }
  ];

  const topBrands = [
    { name: 'Nike', reward: '5% cashback', logo: '👟' },
    { name: 'Apple', reward: '3% rewards', logo: '🍎' },
    { name: 'Amazon', reward: '2% back', logo: '📦' },
    { name: 'Tesla', reward: '4% rewards', logo: '🚗' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome to HubsAI Community</h2>
        <p className="text-gray-300">Your rewards journey starts here</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* NFT Vault Preview */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Your NFT Collection
          </h3>
          <div className="space-y-3">
            {mockNFTs.map((nft) => (
              <div key={nft.id} className="flex items-center space-x-4 p-3 bg-white/5 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🎨</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{nft.name}</p>
                  <p className="text-sm text-gray-400">{nft.rarity}</p>
                </div>
                <span className="text-green-400 text-sm">✓ Staking Ready</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Brands */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
            Top Brand Rewards
          </h3>
          <div className="space-y-3">
            {topBrands.map((brand, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-xl">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl">{brand.logo}</span>
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

      <div className="text-center mt-8 space-y-4">
        <div className="p-4 bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-500/30 rounded-xl">
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

// Step 6: Dashboard
const DashboardStep = ({ onBackToLanding, profileData }) => {
  const [activeTab, setActiveTab] = useState('vault');

  const tabs = [
    { id: 'vault', label: 'NFT Vault', icon: '🎨' },
    { id: 'activity', label: 'Activity Feed', icon: '📊', comingSoon: true },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'referrals', label: 'Referrals', icon: '👥', comingSoon: true },
    { id: 'marketplace', label: 'Marketplace', icon: '🛍️', comingSoon: true }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'vault':
        return <NFTVaultContent />;
      case 'settings':
        return <SettingsContent profileData={profileData} />;
      default:
        return <ComingSoonContent />;
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, {profileData?.fullName || 'User'}!</h1>
          <p className="text-gray-400">Manage your NFTs and track your rewards</p>
        </div>
        <button
          onClick={onBackToLanding}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-colors"
        >
          ← Back to Landing
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-white/5 rounded-xl p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-primary-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.comingSoon && (
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                Soon
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass rounded-2xl p-6 min-h-96">
        {renderTabContent()}
      </div>
    </div>
  );
};

// NFT Vault Content
const NFTVaultContent = () => {
  const mockNFTs = [
    { 
      id: 1, 
      name: 'HubsAI Genesis #001', 
      image: '/assets/hubsai-logo.png', 
      rarity: 'Legendary',
      stakingRewards: '12.5 HUBS/day',
      isStaked: true
    },
    { 
      id: 2, 
      name: 'Retail Pioneer #156', 
      image: '/assets/hubsai-logo.png', 
      rarity: 'Rare',
      stakingRewards: '8.2 HUBS/day',
      isStaked: false
    },
    { 
      id: 3, 
      name: 'Commerce Token #892', 
      image: '/assets/hubsai-logo.png', 
      rarity: 'Common',
      stakingRewards: '5.1 HUBS/day',
      isStaked: true
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Your NFT Collection</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Total Staked: 2/3</span>
          <span className="text-sm text-green-400">Daily Rewards: ~17.6 HUBS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNFTs.map((nft) => (
          <div key={nft.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-primary-500/50 transition-all">
            <div className="aspect-square bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">🎨</span>
            </div>
            
            <h3 className="font-bold text-white mb-2">{nft.name}</h3>
            <p className="text-sm text-gray-400 mb-2">Rarity: {nft.rarity}</p>
            <p className="text-sm text-primary-400 mb-4">Rewards: {nft.stakingRewards}</p>
            
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded-full ${
                nft.isStaked 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {nft.isStaked ? 'Staking' : 'Not Staked'}
              </span>
              
              <button className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                nft.isStaked
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  : 'bg-primary-500/20 text-primary-400 hover:bg-primary-500/30'
              }`}>
                {nft.isStaked ? 'Unstake' : 'Stake'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-primary-500/10 border border-primary-500/20 rounded-xl">
        <h3 className="font-bold text-white mb-2">💡 Staking Tips</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Stake your NFTs to earn daily HUBS token rewards</li>
          <li>• Higher rarity NFTs generate more rewards</li>
          <li>• Rewards are automatically distributed every 24 hours</li>
          <li>• You can unstake anytime without penalties</li>
        </ul>
      </div>
    </div>
  );
};

// Settings Content
const SettingsContent = ({ profileData }) => {
  const { user, claimWalletAddress } = useAuth();
  const { connected, publicKey, wallet } = useWallet();

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
      
      <div className="space-y-6">
        {/* Profile Information */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <p className="text-white">{profileData?.fullName || user?.name || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Username</label>
              <p className="text-white">{profileData?.username || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <p className="text-white">{user?.email || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Country</label>
              <p className="text-white">{profileData?.country || 'Not set'}</p>
            </div>
          </div>
        </div>

        {/* Connected Wallets */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Connected Wallets</h3>
          <div className="space-y-3">
            {claimWalletAddress && (
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-sm">📧</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Claim Wallet</p>
                    <p className="text-xs text-gray-400 font-mono">
                      {claimWalletAddress.slice(0, 8)}...{claimWalletAddress.slice(-8)}
                    </p>
                  </div>
                </div>
                <span className="text-green-400 text-sm">Connected</span>
              </div>
            )}
            
            {connected && publicKey && (
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-sm">🦊</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{wallet?.adapter.name}</p>
                    <p className="text-xs text-gray-400 font-mono">
                      {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}
                    </p>
                  </div>
                </div>
                <span className="text-green-400 text-sm">Connected</span>
              </div>
            )}
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Account Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              <span className="text-white">Change Password</span>
              <p className="text-sm text-gray-400">Update your account password</p>
            </button>
            <button className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
              <span className="text-white">Export Wallet</span>
              <p className="text-sm text-gray-400">Download your wallet backup</p>
            </button>
            <button className="w-full text-left px-4 py-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
              <span className="text-red-400">Delete Account</span>
              <p className="text-sm text-gray-400">Permanently delete your account</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Coming Soon Content
const ComingSoonContent = () => (
  <div className="text-center py-20">
    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-full flex items-center justify-center">
      <span className="text-4xl">🚀</span>
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">Coming Soon</h3>
    <p className="text-gray-400 max-w-md mx-auto">
      We're working hard to bring you this feature. Stay tuned for updates!
    </p>
  </div>
);

// Main Onboarding Flow Component
const OnboardingFlow = ({ isOpen, onClose, onComplete }) => {
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
    setShowDashboard(false);
    onComplete();
    onClose();
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
        return <CommunitySummaryStep onNext={handleNext} profileData={profileData} />;
      case 6:
        return <DashboardStep onBackToLanding={handleBackToLanding} profileData={profileData} />;
      default:
        return <LoginStep onNext={handleNext} onClose={onClose} />;
    }
  };

  // If showing dashboard, render it fullscreen
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
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
            <motion.div
              className="glass rounded-3xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-600/5 rounded-3xl" />
              
              {/* Progress indicator */}
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

              {/* Close button */}
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

              {/* Step content */}
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

export default OnboardingFlow;