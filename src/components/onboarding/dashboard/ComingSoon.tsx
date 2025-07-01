import React from 'react';
import { motion } from 'framer-motion';
interface ComingSoonProps {
tabName: string;
}
export const ComingSoon: React.FC<ComingSoonProps> = ({ tabName }) => {
const getFeatureDetails = (name: string) => {
switch (name.toLowerCase()) {
case 'activity feed':
return {
icon: '📊',
description: 'Track your staking history, rewards earned, and community activity in real-time.',
features: [
'Real-time staking updates',
'Reward history tracking',
'Community interactions',
'Performance analytics'
]
};
case 'referrals':
return {
icon: '👥',
description: 'Invite friends to HubsAI and earn bonus rewards for successful referrals.',
features: [
'Referral link generation',
'Bonus reward tracking',
'Friend activity feed',
'Leaderboard rankings'
]
};
case 'marketplace':
return {
icon: '🛍️',
description: 'Buy, sell, and trade NFTs with other community members securely.',
features: [
'NFT trading platform',
'Price discovery tools',
'Auction system',
'Secure escrow service'
]
};
default:
return {
icon: '🚀',
description: 'An exciting new feature is coming to enhance your HubsAI experience.',
features: [
'Enhanced functionality',
'Improved user experience',
'Advanced features',
'Community benefits'
]
};
}
};
const feature = getFeatureDetails(tabName);
return (
<div className="text-center py-16">
<motion.div
className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center border border-blue-500/30"
initial={{ scale: 0 }}
animate={{ scale: 1 }}
transition={{ type: "spring", stiffness: 260, damping: 20 }}
>
<span className="text-6xl">{feature.icon}</span>
</motion.div>
  <motion.h3
    className="text-3xl font-bold text-white mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    {tabName} Coming Soon
  </motion.h3>

  <motion.p
    className="text-slate-400 max-w-2xl mx-auto mb-8 text-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    {feature.description}
  </motion.p>

  <motion.div
    className="max-w-md mx-auto mb-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <h4 className="text-xl font-semibold text-white mb-4">What to Expect:</h4>
    <div className="grid grid-cols-1 gap-3">
      {feature.features.map((item, index) => (
        <motion.div
          key={index}
          className="flex items-center space-x-3 p-3 bg-slate-700 rounded-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-slate-300">{item}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>

  <motion.div
    className="space-y-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
  >
    <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl max-w-lg mx-auto">
      <h4 className="text-white font-semibold mb-2">🔔 Get Notified</h4>
      <p className="text-sm text-slate-300 mb-4">
        Be the first to know when {tabName.toLowerCase()} launches. We'll send you an email notification.
      </p>
      <div className="flex space-x-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 text-sm"
        />
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
          Notify Me
        </button>
      </div>
    </div>

    <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
        <span>In Development</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <span>Coming Q2 2025</span>
      </div>
    </div>
  </motion.div>

  {/* Feature Preview Cards */}
  <motion.div
    className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1 }}
  >
    <div className="p-6 bg-slate-700 border border-slate-600 rounded-xl">
      <h5 className="text-lg font-semibold text-white mb-3">📱 Mobile Ready</h5>
      <p className="text-sm text-slate-400">
        Full mobile optimization ensures you can access {tabName.toLowerCase()} features on any device, anywhere.
      </p>
    </div>
    
    <div className="p-6 bg-slate-700 border border-slate-600 rounded-xl">
      <h5 className="text-lg font-semibold text-white mb-3">⚡ Real-time Updates</h5>
      <p className="text-sm text-slate-400">
        Live notifications and instant updates keep you connected to all {tabName.toLowerCase()} activities.
      </p>
    </div>
  </motion.div>
</div>
);
};