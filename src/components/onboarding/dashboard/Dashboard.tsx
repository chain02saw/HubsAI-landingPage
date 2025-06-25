// src/components/onboarding/dashboard/Dashboard.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NFTVault } from './NFTVault';
import { Settings } from './Settings';
import { ComingSoon } from './ComingSoon';
import { useAuth } from '../../AuthContext';

interface DashboardProps {
  onBackToLanding: () => void;
  profileData?: any;
}

interface Tab {
  id: string;
  label: string;
  icon: string;
  comingSoon?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ onBackToLanding, profileData }) => {
  const [activeTab, setActiveTab] = useState('vault');
  const { user } = useAuth();

  const tabs: Tab[] = [
    { id: 'vault', label: 'NFT Vault', icon: '🎨' },
    { id: 'activity', label: 'Activity Feed', icon: '📊', comingSoon: true },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'referrals', label: 'Referrals', icon: '👥', comingSoon: true },
    { id: 'marketplace', label: 'Marketplace', icon: '🛍️', comingSoon: true }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'vault':
        return <NFTVault />;
      case 'settings':
        return <Settings profileData={profileData} />;
      default:
        return <ComingSoon tabName={tabs.find(t => t.id === activeTab)?.label || 'Feature'} />;
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {profileData?.fullName || user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your NFTs, track rewards, and explore the HubsAI ecosystem
          </p>
        </div>
        <motion.button
          onClick={onBackToLanding}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>←</span>
          <span>Back to Landing</span>
        </motion.button>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total NFTs</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎨</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-green-400 text-sm">
              <span>↗</span>
              <span className="ml-1">Active Collection</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Daily Rewards</p>
              <p className="text-2xl font-bold text-white">25.8</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-green-400 text-sm">
              <span>↗</span>
              <span className="ml-1">HUBS/day</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Staked NFTs</p>
              <p className="text-2xl font-bold text-white">2/3</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-yellow-400 text-sm">
              <span>→</span>
              <span className="ml-1">67% Staked</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Brand Partners</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🤝</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-blue-400 text-sm">
              <span>↗</span>
              <span className="ml-1">Available</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="flex space-x-1 mb-8 bg-white/5 rounded-xl p-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-primary-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
            {tab.comingSoon && (
              <span className="text-xs bg-yellow-500/30 text-yellow-300 px-2 py-1 rounded-full">
                Soon
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <motion.div
        className="glass rounded-2xl p-8 min-h-96"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        key={activeTab} // This will trigger re-animation when tab changes
      >
        {renderTabContent()}
      </motion.div>

      {/* Footer */}
      <motion.div
        className="text-center mt-8 p-6 bg-dark-900/50 rounded-xl border border-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="text-gray-400 text-sm">
          © 2025 HubsAI. Built for the future of retail. 
          <span className="mx-2">•</span>
          <a href="#" className="text-primary-400 hover:text-primary-300">Support</a>
          <span className="mx-2">•</span>
          <a href="#" className="text-primary-400 hover:text-primary-300">Documentation</a>
        </p>
      </motion.div>
    </div>
  );
};