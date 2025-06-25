// src/components/onboarding/steps/CommunitySummaryStep.tsx
import React from 'react';
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
  logo: string;
  category: string;
  tier: 'Gold' | 'Silver' | 'Bronze';
}

export const CommunitySummaryStep: React.FC<CommunitySummaryStepProps> = ({ onNext, profileData }) => {
  const { user } = useAuth();

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

  const topBrands: Brand[] = [
    { name: 'Nike', reward: '5% cashback', logo: '👟', category: 'Fashion', tier: 'Gold' },
    { name: 'Apple', reward: '3% rewards', logo: '🍎', category: 'Technology', tier: 'Gold' },
    { name: 'Amazon', reward: '2% back', logo: '📦', category: 'Shopping', tier: 'Silver' },
    { name: 'Starbucks', reward: '4% rewards', logo: '☕', category: 'Food', tier: 'Gold' },
    { name: 'Uber', reward: '3% back', logo: '🚗', category: 'Transport', tier: 'Silver' },
    { name: 'Spotify', reward: '2% rewards', logo: '🎵', category: 'Entertainment', tier: 'Bronze' }
  ];

  const handleClaimAirdrop = () => {
    window.open('https://community.hubsai.io/', '_blank');
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
          Hey {profileData?.fullName || user?.name || 'there'}! Your rewards journey starts here
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
              {mockNFTs.length} NFTs
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
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-400">
                      Ready to Stake
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

        {/* Top Brand Rewards */}
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3 animate-pulse"></span>
              Brand Rewards
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
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl">{brand.logo}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium text-white">{brand.name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      brand.tier === 'Gold' ? 'bg-yellow-500/20 text-yellow-400' :
                      brand.tier === 'Silver' ? 'bg-gray-400/20 text-gray-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {brand.tier}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-1">{brand.reward}</p>
                  <p className="text-xs text-gray-500">{brand.category}</p>
                </div>
                <span className="text-primary-400 text-sm">Available</span>
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

      {/* Action Buttons */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="p-6 bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-500/30 rounded-2xl">
          <h4 className="text-xl font-bold text-white mb-2">🚀 You're All Set!</h4>
          <p className="text-gray-300 mb-4">
            Welcome to the future of retail rewards. Start staking your NFTs and earning from your favorite brands.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              onClick={handleClaimAirdrop}
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold rounded-xl transition-all duration-300 border border-yellow-400/50 shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 193, 7, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              🎁 Claim Your Airdrop
            </motion.button>
            
            <motion.button
              onClick={onNext}
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-bold rounded-xl transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(20, 184, 166, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Enter Dashboard
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};