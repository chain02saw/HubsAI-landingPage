import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../AuthContext';
import { getUserNFTsWithBackend } from '../../../api/authAPI';

interface NFT {
  id: number;
  title: string;
  image: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  price: string;
  mintAddress: string;
  isStaked: boolean;
  quantity: number;
  symbol: string;
  description: string;
}

const RARITY_STYLES = {
  Legendary: {
    gradient: 'from-yellow-500 to-orange-500',
    border: 'border-yellow-500/50',
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
  },
  Epic: {
    gradient: 'from-purple-500 to-pink-500',
    border: 'border-purple-500/50',
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
  },
  Rare: {
    gradient: 'from-blue-500 to-cyan-500',
    border: 'border-blue-500/50',
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
  },
  Common: {
    gradient: 'from-gray-500 to-gray-600',
    border: 'border-gray-500/50',
    bg: 'bg-gray-500/20',
    text: 'text-gray-400',
  },
  default: {
    gradient: 'from-gray-500 to-gray-600',
    border: 'border-gray-500/50',
    bg: 'bg-gray-500/20',
    text: 'text-gray-400',
  }
} as const;

const FILTER_OPTIONS = [
  { id: 'all', label: 'All NFTs' },
  { id: 'staked', label: 'Staked' },
  { id: 'unstaked', label: 'Available' },
] as const;

const NFTCard: React.FC<{
  nft: NFT;
  index: number;
  onSelect: (nft: NFT) => void;
  onStakeToggle: (nftId: number) => void;
}> = React.memo(({ nft, index, onSelect, onStakeToggle }) => {
  const rarityStyle = RARITY_STYLES[nft.rarity as keyof typeof RARITY_STYLES] || RARITY_STYLES.default;

  const handleStakeClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onStakeToggle(nft.id);
    },
    [nft.id, onStakeToggle]
  );

  const handleCardClick = useCallback(() => {
    onSelect(nft);
  }, [nft, onSelect]);

  return (
    <motion.div
      className={`bg-slate-700 border-2 rounded-xl p-6 hover:border-blue-500/50 transition-all cursor-pointer ${rarityStyle.border}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={handleCardClick}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* NFT Image */}
      <div
        className={`aspect-square bg-gradient-to-br ${rarityStyle.gradient} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}
      >
        <img src={nft.image} alt={nft.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <span className={`text-xs px-2 py-1 rounded-full bg-black/30 text-white border ${rarityStyle.border}`}>
            {nft.rarity}
          </span>
        </div>
      </div>

      {/* NFT Info */}
      <h3 className="font-bold text-white mb-2 text-lg truncate">{nft.title}</h3>
      <p className="text-sm text-slate-400 mb-2">Value: {nft.price}</p>

      {/* Staking Status */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs px-3 py-1 rounded-full ${nft.isStaked
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
            }`}
        >
          {nft.isStaked ? '🔒 Staking' : '⭕ Available'}
        </span>

      </div>

      {/* Action Button */}
      <motion.button
        onClick={handleStakeClick}
        className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${nft.isStaked
          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
          : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30'
          }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {nft.isStaked ? 'Unstake NFT' : 'Stake NFT'}
      </motion.button>
    </motion.div>
  );
});
NFTCard.displayName = 'NFTCard';

const FilterButtons: React.FC<{
  filter: string;
  onFilterChange: (filter: string) => void;
}> = React.memo(({ filter, onFilterChange }) => (
  <div className="flex items-center space-x-4 mb-6">
    <span className="text-sm text-slate-400">Filter:</span>
    {FILTER_OPTIONS.map((filterOption) => (
      <motion.button
        key={filterOption.id}
        onClick={() => onFilterChange(filterOption.id)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === filterOption.id
          ? 'bg-blue-500 text-white'
          : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
          }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {filterOption.label}
      </motion.button>
    ))}
  </div>
));
FilterButtons.displayName = 'FilterButtons';

export const NFTVault: React.FC = React.memo(() => {
  const { trackEvent } = useAuth();
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [userNFTs, setUserNFTs] = useState<any[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    try {
      const getUserNFTs = async () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}').email;
        if (!user) {
          return;
        }
        const nfts = await getUserNFTsWithBackend(user);
        console.log("🧟🧟‍♂️🧟‍♀️", nfts.result);
        setUserNFTs(nfts.result);
      };
      getUserNFTs();
    } catch (error) {
      console.error('Error fetching NFTs', error);
    }
  }, []);

  const handleStakeToggle = useCallback(
    (nftId: number) => {
      trackEvent('nft_stake_toggle', { nftId });
      console.log(`Toggle stake for NFT ${nftId}`);
    },
    [trackEvent]
  );

  const handleNFTSelect = useCallback(
    (nft: NFT) => {
      setSelectedNFT(nft);
      trackEvent('nft_details_viewed', { nftId: nft.id, nftName: nft.title });
    },
    [trackEvent]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedNFT(null);
  }, []);

  const handleCopyAddress = useCallback(async () => {
    if (selectedNFT?.mintAddress) {
      try {
        await navigator.clipboard.writeText(selectedNFT.mintAddress);
        setCopySuccess(true);
        trackEvent('nft_address_copied', { nftId: selectedNFT.id });
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('Failed to copy address', err);
      }
    }
  }, [selectedNFT, trackEvent]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Your NFT Collection</h2>
          <p className="text-slate-400">Manage, stake, and earn rewards from your digital assets</p>
        </div>
        {/* ...your other header content if any */}
      </div>

      {/* Filters */}
      <FilterButtons filter={filter} onFilterChange={setFilter} />

      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <AnimatePresence mode="popLayout">
          {userNFTs && userNFTs.length > 0 && userNFTs.map((nft, index) => (
            <NFTCard
              key={index}
              nft={nft}
              index={index}
              onSelect={handleNFTSelect}
              onStakeToggle={handleStakeToggle}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Staking Tips */}
      <motion.div
        className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-bold text-white mb-3 flex items-center">
          <span className="text-2xl mr-2">💡</span>
          Staking Tips & Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <ul className="space-y-2">
            <li>• Stake your NFTs to earn daily HUBS token rewards</li>
            <li>• Higher rarity NFTs generate more rewards per day</li>
            <li>• Rewards are automatically distributed every 24 hours</li>
          </ul>
          <ul className="space-y-2">
            <li>• You can unstake anytime without penalties</li>
            <li>• Staked NFTs can still be traded (coming soon)</li>
            <li>• Combine multiple NFTs for bonus rewards (coming soon)</li>
          </ul>
        </div>
      </motion.div>

      {/* NFT Detail Modal */}
      <AnimatePresence>
        {selectedNFT && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">{selectedNFT.title}</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NFT Image */}
                <div
                  className={`aspect-square bg-gradient-to-br ${
                    RARITY_STYLES[selectedNFT.rarity as keyof typeof RARITY_STYLES]?.gradient || RARITY_STYLES.default.gradient
                  } rounded-xl flex items-center justify-center`}
                >
                  <img 
                    src={selectedNFT.image} 
                    alt={selectedNFT.title} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = ''; // Clear the broken image
                      e.currentTarget.parentElement?.classList.add('fallback-content');
                    }}
                  />
                  <span className="text-8xl fallback-content hidden">🎨</span>
                </div>

                {/* NFT Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Description:</span>
                        <span className={RARITY_STYLES[selectedNFT.rarity as keyof typeof RARITY_STYLES]?.text || RARITY_STYLES.default.text}>
                          {selectedNFT.description || 'Unknown'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Price:</span>
                        <span className="text-green-400">{selectedNFT.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Quantity:</span>
                        <span className="text-yellow-400">{selectedNFT.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <span className={selectedNFT.isStaked ? 'text-green-400' : 'text-slate-400'}>
                          {selectedNFT.isStaked ? 'Staking' : 'Available'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Mint Address:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-white">{selectedNFT.mintAddress.slice(0, 6)}...{selectedNFT.mintAddress.slice(-4)}</span>
                          <motion.button
                            onClick={handleCopyAddress}
                            className="p-1.5 rounded-lg bg-slate-600 hover:bg-slate-500 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            title="Copy full address"
                          >
                            {copySuccess ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                              </svg>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Attributes</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex justify-between p-2 bg-slate-700 rounded-lg">
                        <span className="text-slate-400 text-sm">Description:</span>
                        <span className="text-white text-sm font-medium">{selectedNFT.description}</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => {
                      handleStakeToggle(selectedNFT.id);
                      handleCloseModal();
                    }}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${selectedNFT.isStaked
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                      : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30'
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {selectedNFT.isStaked ? 'Unstake NFT' : 'Stake NFT'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
NFTVault.displayName = 'NFTVault';
