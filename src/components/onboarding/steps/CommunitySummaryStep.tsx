// src/components/onboarding/steps/CommunitySummaryStep.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../AuthContext';

interface CommunitySummaryStepProps {
  onNext: () => void;
  profileData: any;
}

interface NFT {
  id: number;
  name: string;
  image: string;
  rarity: string;
  stakingRewards: string;
  isStaked: boolean;
}

interface Brand {
  name: string;
  reward: string;
  logo: string; // This will be a URL to the actual brand logo
  category: string;
  tier: 'Gold' | 'Silver' | 'Bronze';
  description: string;
}

export const CommunitySummaryStep: React.FC<CommunitySummaryStepProps> = ({ onNext, profileData }) => {
  const { user } = useAuth();
  const [airdropClaimed, setAirdropClaimed] = useState(false);
  const [isClaimingAirdrop, setIsClaimingAirdrop] = useState(false);

  const mockNFTs: NFT[] = [
    { 
      id: 1, 
      name: 'HubsAI Genesis', 
      image: '/assets/hubsai-logo.png', 
      rarity: 'Legendary',
      stakingRewards: '12.5 HUBS/day',
      isStaked: false
    },
    { 
      id: 2, 
      name: 'Retail Pioneer', 
      image: '/assets/hubsai-logo.png', 
      rarity: 'Rare',
      stakingRewards: '8.2 HUBS/day',
      isStaked: false
    }
  ];

  // Updated with real brand partners and their logos
  const topBrands: Brand[] = [
    { 
      name: 'Nike', 
      reward: '5% cashback', 
      logo: 'https://1000logos.net/wp-content/uploads/2021/11/Nike-Logo-500x281.png',
      category: 'Fashion & Sports', 
      tier: 'Gold',
      description: 'Premium athletic wear and footwear'
    },
    { 
      name: 'Apple', 
      reward: '3% rewards', 
      logo: 'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo-500x281.png',
      category: 'Technology', 
      tier: 'Gold',
      description: 'Innovation in technology and design'
    },
    { 
      name: 'Amazon', 
      reward: '2% back', 
      logo: 'https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo-500x281.png',
      category: 'E-commerce', 
      tier: 'Silver',
      description: 'Everything from A to Z'
    },
    { 
      name: 'Starbucks', 
      reward: '4% rewards', 
      logo: 'https://1000logos.net/wp-content/uploads/2020/05/Starbucks-Logo-500x281.png',
      category: 'Food & Beverage', 
      tier: 'Gold',
      description: 'Premium coffee and beverages'
    },
    { 
      name: 'Tesla', 
      reward: '3% back', 
      logo: 'https://1000logos.net/wp-content/uploads/2018/03/Tesla-Logo-500x281.png',
      category: 'Automotive', 
      tier: 'Gold',
      description: 'Electric vehicles and clean energy'
    },
    { 
      name: 'Microsoft', 
      reward: '2.5% rewards', 
      logo: 'https://1000logos.net/wp-content/uploads/2020/08/Microsoft-Logo-500x281.png',
      category: 'Technology', 
      tier: 'Silver',
      description: 'Cloud computing and productivity tools'
    },
    { 
      name: 'Adidas', 
      reward: '4% cashback', 
      logo: 'https://1000logos.net/wp-content/uploads/2019/06/Adidas-Logo-500x281.png',
      category: 'Fashion & Sports', 
      tier: 'Gold',
      description: 'Sports apparel and lifestyle products'
    },
    { 
      name: 'Best Buy', 
      reward: '2% back', 
      logo: 'https://1000logos.net/wp-content/uploads/2016/10/Best-Buy-Logo-500x281.png',
      category: 'Electronics', 
      tier: 'Silver',
      description: 'Consumer electronics and technology'
    }
  ];

  const handleClaimAirdrop = async () => {
    setIsClaimingAirdrop(true);
    
    // Simulate claiming process
    setTimeout(() => {
      setAirdropClaimed(true);
      setIsClaimingAirdrop(false);
      
      // Open airdrop link in new tab so user doesn't lose their progress
      window.open('https://community.hubsai.io/', '_blank');
    }, 2000);
  };

  const handleStartStaking = () => {
    onNext();
  };

  const totalDailyRewards = mockNFTs.reduce((total, nft) => {
    return total + parseFloat(nft.stakingRewards.split(' ')[0]);
  }, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <motion.h2
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Welcome to HubsAI Community! 🎉
        </motion.h2>
        <motion.p
          className="text-xl text-gray-300 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hey {profileData?.username || user?.name || 'there'}! Your rewards journey starts here
        </motion.p>
        <motion.p
          className="text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Explore your NFTs, discover brand rewards, and start earning today
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* NFT Collection Preview */}
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
              Your NFT Collection
            </h3>
            <span className="text-sm text-primary-400 bg-primary-500/20 px-3 py-1 rounded-full">
              {mockNFTs.length} NFTs Ready
            </span>
          </div>

          <div className="space-y-4">
            {mockNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                className="flex items-center space-x-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-primary-500/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-xl flex items-center justify-center border border-primary-500/20">
                  <span className="text-2xl">🎨</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-semibold text-white">{nft.name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      nft.rarity === 'Legendary' ? 'bg-yellow-500/20 text-yellow-400' :
                      nft.rarity === 'Rare' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {nft.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-1">Daily Rewards: {nft.stakingRewards}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      ⚡ Ready to Stake
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
            <p className="text-green-400 text-sm font-medium">
              💰 Potential Daily Earnings: ~{totalDailyRewards.toFixed(1)} HUBS
            </p>
          </div>
        </motion.div>

        {/* Brand Partners with Real Logos */}
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3 animate-pulse"></span>
              Brand Partners
            </h3>
            <span className="text-sm text-yellow-400 bg-yellow-500/20 px-3 py-1 rounded-full">
              {topBrands.length} Partners
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
            {topBrands.map((brand, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:border-yellow-500/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1">
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('span');
                      fallback.textContent = brand.name.charAt(0);
                      fallback.className = 'text-black font-bold';
                      target.parentNode?.appendChild(fallback);
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium text-white truncate">{brand.name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                      brand.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                      brand.tier === 'Silver' ? 'bg-gray-400/20 text-gray-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {brand.tier}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-1">{brand.reward}</p>
                  <p className="text-xs text-gray-500 truncate">{brand.category}</p>
                </div>
                <span className="text-primary-400 text-sm flex-shrink-0">Available</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats Overview */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary-400">{mockNFTs.length}</div>
          <div className="text-sm text-gray-400">NFTs Ready</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{topBrands.length}</div>
          <div className="text-sm text-gray-400">Brand Partners</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{totalDailyRewards.toFixed(1)}</div>
          <div className="text-sm text-gray-400">Daily HUBS</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">∞</div>
          <div className="text-sm text-gray-400">Possibilities</div>
        </div>
      </motion.div>

      {/* Enhanced Action Buttons */}
      <motion.div
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="p-6 bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-500/30 rounded-2xl">
          <h4 className="text-xl font-bold text-white mb-4">🚀 Choose Your Next Step</h4>
          <p className="text-gray-300 mb-6">
            Welcome to the future of retail rewards. You can claim your community airdrop and start staking immediately!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            {/* Enhanced Airdrop Button */}
            <motion.button
              onClick={handleClaimAirdrop}
              disabled={isClaimingAirdrop}
              className="flex-1 relative overflow-hidden px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 disabled:opacity-70 text-white font-bold rounded-xl transition-all duration-300 border border-yellow-400/50 shadow-lg group"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 40px rgba(255, 193, 7, 0.6)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative flex items-center justify-center gap-2">
                {isClaimingAirdrop ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Claiming...</span>
                  </>
                ) : airdropClaimed ? (
                  <>
                    <span className="text-lg">✅</span>
                    <span>Airdrop Claimed!</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">🎁</span>
                    <span>Claim Community Airdrop</span>
                  </>
                )}
              </div>
            </motion.button>
            
            {/* Enhanced Staking Button */}
            <motion.button
              onClick={handleStartStaking}
              className="flex-1 relative overflow-hidden px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-bold rounded-xl transition-all duration-300 border border-primary-400/50 shadow-lg group"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 40px rgba(20, 184, 166, 0.6)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative flex items-center justify-center gap-2">
                <span className="text-lg">⚡</span>
                <span>Start Staking & Earning</span>
              </div>
            </motion.button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span>Airdrop opens in new tab - you won't lose progress</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span>Start earning immediately with your NFTs</span>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {airdropClaimed && (
          <motion.div
            className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-green-400 font-medium">
              🎉 Airdrop claimed successfully! The community page opened in a new tab. You can now start staking to maximize your rewards!
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};