import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../AuthContext';

interface NFT {
  id: number;
  name: string;
  image: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  stakingRewards: string;
  isStaked: boolean;
  mintDate: string;
  attributes: Array<{ trait_type: string; value: string }>;
  value: string;
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
  const rarityStyle = RARITY_STYLES[nft.rarity];

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
        <span className="text-6xl">🎨</span>
        <div className="absolute top-2 right-2">
          <span className={`text-xs px-2 py-1 rounded-full bg-black/30 text-white border ${rarityStyle.border}`}>
            {nft.rarity}
          </span>
        </div>
      </div>

      {/* NFT Info */}
      <h3 className="font-bold text-white mb-2 text-lg truncate">{nft.name}</h3>
      <p className="text-sm text-slate-400 mb-2">Value: {nft.value}</p>
      <p className="text-sm text-green-400 mb-3">Rewards: {nft.stakingRewards}</p>

      {/* Staking Status */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            nft.isStaked
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
          }`}
        >
          {nft.isStaked ? '🔒 Staking' : '⭕ Available'}
        </span>

        <div className="text-xs text-slate-500">
          {new Date(nft.mintDate).toLocaleDateString()}
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        onClick={handleStakeClick}
        className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${
          nft.isStaked
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
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          filter === filterOption.id
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
  const { shopifyOrder, trackEvent } = useAuth();
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const MOCK_NFTS: NFT[] = useMemo(() => {
    if (shopifyOrder?.lineItems.some((item) => item.nftEligible)) {
      return shopifyOrder.lineItems
        .filter((item) => item.nftEligible)
        .map((item, index) => ({
          id: index + 1,
          name: item.name,
          image: '/assets/hubsai-logo.png',
          rarity: (index === 0 ? 'Legendary' : index === 1 ? 'Epic' : 'Rare') as NFT['rarity'],
          stakingRewards: `${(25 - index * 5).toFixed(1)} HUBS/day`,
          isStaked: index % 2 === 0,
          mintDate: new Date(Date.now() - index * 86400000).toISOString(),
          value: `$${(300 - index * 50).toFixed(2)}`,
          attributes: [
            { trait_type: 'Tier', value: index === 0 ? 'Genesis' : index === 1 ? 'Pioneer' : 'Standard' },
            { trait_type: 'Power', value: `${95 - index * 10}` },
            { trait_type: 'Rarity Score', value: `${900 - index * 100}` },
          ],
        }));
    }
    // fallback static NFTs
    return [
      {
        id: 1,
        name: 'HubsAI Genesis #001',
        image: '/assets/hubsai-logo.png',
        rarity: 'Legendary',
        stakingRewards: '25.0 HUBS/day',
        isStaked: true,
        mintDate: '2024-01-15',
        value: '$299.99',
        attributes: [
          { trait_type: 'Tier', value: 'Genesis' },
          { trait_type: 'Power', value: '95' },
          { trait_type: 'Rarity Score', value: '890' },
        ],
      },
      {
        id: 2,
        name: 'Retail Pioneer #156',
        image: '/assets/hubsai-logo.png',
        rarity: 'Epic',
        stakingRewards: '18.2 HUBS/day',
        isStaked: false,
        mintDate: '2024-02-10',
        value: '$199.99',
        attributes: [
          { trait_type: 'Tier', value: 'Pioneer' },
          { trait_type: 'Power', value: '78' },
          { trait_type: 'Rarity Score', value: '650' },
        ],
      },
      {
        id: 3,
        name: 'Commerce Token #892',
        image: '/assets/hubsai-logo.png',
        rarity: 'Rare',
        stakingRewards: '12.1 HUBS/day',
        isStaked: true,
        mintDate: '2024-03-05',
        value: '$149.99',
        attributes: [
          { trait_type: 'Tier', value: 'Commerce' },
          { trait_type: 'Power', value: '62' },
          { trait_type: 'Rarity Score', value: '420' },
        ],
      },
    ];
  }, [shopifyOrder]);

  const filteredNFTs = useMemo(() => {
    switch (filter) {
      case 'staked':
        return MOCK_NFTS.filter((nft) => nft.isStaked);
      case 'unstaked':
        return MOCK_NFTS.filter((nft) => !nft.isStaked);
      default:
        return MOCK_NFTS;
    }
  }, [filter, MOCK_NFTS]);

  // const stats = useMemo(() => {
  //   const stakedNFTs = MOCK_NFTS.filter((nft) => nft.isStaked);
  //   const totalStakedRewards = stakedNFTs.reduce(
  //     (total, nft) => total + parseFloat(nft.stakingRewards.split(' ')[0]),
  //     0
  //   );
  //   const totalValue = MOCK_NFTS.reduce(
  //     (total, nft) => total + parseFloat(nft.value.replace('$', '')),
  //     0
  //   );
  //   return {
  //     totalStaked: stakedNFTs.length,
  //     totalNFTs: MOCK_NFTS.length,
  //     dailyRewards: totalStakedRewards.toFixed(1),
  //     totalValue: totalValue.toFixed(2),
  //   };
  // }, [MOCK_NFTS]);

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
      trackEvent('nft_details_viewed', { nftId: nft.id, nftName: nft.name });
    },
    [trackEvent]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedNFT(null);
  }, []);

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
          {filteredNFTs.map((nft, index) => (
            <NFTCard
              key={nft.id}
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
                <h2 className="text-2xl font-bold text-white">{selectedNFT.name}</h2>
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
                  className={`aspect-square bg-gradient-to-br ${RARITY_STYLES[selectedNFT.rarity].gradient} rounded-xl flex items-center justify-center`}
                >
                  <span className="text-8xl">🎨</span>
                </div>

                {/* NFT Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Rarity:</span>
                        <span className={RARITY_STYLES[selectedNFT.rarity].text}>{selectedNFT.rarity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Value:</span>
                        <span className="text-green-400">{selectedNFT.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Daily Rewards:</span>
                        <span className="text-yellow-400">{selectedNFT.stakingRewards}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status:</span>
                        <span className={selectedNFT.isStaked ? 'text-green-400' : 'text-slate-400'}>
                          {selectedNFT.isStaked ? 'Staking' : 'Available'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Mint Date:</span>
                        <span className="text-white">{new Date(selectedNFT.mintDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Attributes</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedNFT.attributes.map((attr, index) => (
                        <div key={index} className="flex justify-between p-2 bg-slate-700 rounded-lg">
                          <span className="text-slate-400 text-sm">{attr.trait_type}:</span>
                          <span className="text-white text-sm font-medium">{attr.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    onClick={() => {
                      handleStakeToggle(selectedNFT.id);
                      handleCloseModal();
                    }}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                      selectedNFT.isStaked
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
