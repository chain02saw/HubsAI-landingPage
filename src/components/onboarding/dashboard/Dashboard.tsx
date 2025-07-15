import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NFTVault } from "./NFTVault";
import { Settings } from "./Settings";
import { ComingSoon } from "./ComingSoon";
import { useAuth } from "../../AuthContext";
import { getUserNFTsWithBackend } from "../../../api/authAPI";

interface DashboardProps {
  onBackToLanding: () => void;
  profileData?: any;
}

interface Tab {
  id: string;
  label: string;
  icon: string;
  comingSoon?: boolean;
  description: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onBackToLanding,
  profileData,
}) => {
  const [activeTab, setActiveTab] = useState("vault");
  const { user, shopifyOrder, trackEvent } = useAuth();
  const [userNFTCounts, setUserNFTCounts] = useState(0);

  const tabs: Tab[] = [
    {
      id: "vault",
      label: "NFT Vault",
      icon: "🎨",
      description: "Manage your digital assets",
    },
    {
      id: "activity",
      label: "Activity Feed",
      icon: "📊",
      comingSoon: true,
      description: "Track your rewards history",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
      description: "Manage your profile",
    },
    {
      id: "rewards",
      label: "Rewards",
      icon: "💰",
      comingSoon: true,
      description: "Track and claim your rewards",
    },
    {
      id: "marketplace",
      label: "Marketplace",
      icon: "🛍️",
      comingSoon: true,
      description: "Trade NFTs with others",
    },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    trackEvent("dashboard_tab_changed", { tab: tabId });
  };

  const handleBackToLanding = () => {
    trackEvent("dashboard_back_to_landing");
    onBackToLanding();
  };


  const renderTabContent = () => {
    switch (activeTab) {
      case "vault":
        return <NFTVault onNFTCountChange={setUserNFTCounts} />;
      case "settings":
        return <Settings profileData={profileData} />;
      default:
        return (
          <ComingSoon
            tabName={tabs.find((t) => t.id === activeTab)?.label || "Feature"}
          />
        );
    }
  };

  const userDisplayName = profileData?.username || user?.name || "Gamer";

  useEffect(() => {
    try {
      const getUserNFTs = async () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}').email;
        if (!user) {
          return;
        }
        const nfts = await getUserNFTsWithBackend(user);
        setUserNFTCounts(nfts.result.length);
      };
      getUserNFTs();
    } catch (error) {
      console.error('Error fetching NFTs', error);
    }
  }, []);

  return (
    <div className="dashboard-container bg-slate-900 text-white">
      {/* Header */}
      <motion.div
        className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex-shrink-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎮</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome back, {userDisplayName}! 👋
              </h1>
              <p className="text-slate-400">
                {shopifyOrder
                  ? `Order ${shopifyOrder.orderNumber} • Ready to stake`
                  : "Your HubsAI command center"}
              </p>
            </div>
          </div>
          <motion.button
            onClick={handleBackToLanding}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-xl text-slate-300 hover:text-white transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>←</span>
            <span>Back to Landing</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content - Fixed Scrollable Container */}
      <div className="dashboard-content">
        {/* Quick Stats */}
        <motion.div
          className="max-w-7xl mx-auto px-6 py-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total NFTs</p>
                  <p className="text-2xl font-bold text-white">
                    {userNFTCounts}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center text-green-400 text-sm">
                  <span>↗</span>
                  <span className="ml-1">Active Collection</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Daily Rewards</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">0</span>
                    <span className="px-2 py-0.5 text-xs font-medium bg-yellow-500/20 text-yellow-500 rounded">Soon</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center text-green-400 text-sm">
                  <span>↗</span>
                  <span className="ml-1">HUBS/day</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Staked NFTs</p>
                  <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-white">0</p>
                    <span className="px-2 py-0.5 text-xs font-medium bg-yellow-500/20 text-yellow-500 rounded">Soon</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔒</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center text-yellow-400 text-sm">
                  <span>→</span>
                  <span className="ml-1">0% Staked</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Rewards</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">0</span>
                    <span className="px-2 py-0.5 text-xs font-medium bg-yellow-500/20 text-yellow-500 rounded">Soon</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎁</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center text-blue-400 text-sm">
                  <span>↗</span>
                  <span className="ml-1">HUBS Earned</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation and Content */}
        <div className="max-w-7xl mx-auto px-6 pb-6">
          {/* Tab Navigation */}
          <motion.div
            className="flex space-x-1 mb-6 bg-slate-800 border border-slate-700 rounded-xl p-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all relative group ${activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white hover:bg-slate-700"
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

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-700 text-slate-300 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {tab.description}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="bg-slate-800 border-t border-slate-700 px-6 py-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-slate-400 text-sm">
              © 2025 HubsAI. Built for the future of retail gaming.
              <span className="mx-2">•</span>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Support
              </a>
              <span className="mx-2">•</span>
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Community
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};