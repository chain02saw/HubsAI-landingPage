import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../AuthContext';
import { useWallet } from '@solana/wallet-adapter-react';

interface SettingsProps {
  profileData?: any;
}

export const Settings: React.FC<SettingsProps> = ({ profileData }) => {
  const { user, claimWalletAddress, signOut, trackEvent } = useAuth();
  const { connected, publicKey, wallet, disconnect } = useWallet();

  const [activeSection, setActiveSection] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profileData?.fullName || user?.name || '',
    username: profileData?.username || '',
    email: user?.email || '',
    country: profileData?.country || '',
    interests: profileData?.interests || [],
    notifications: {
      email: true,
      staking: true,
      rewards: true,
      marketplace: false,
    },
    privacy: {
      showProfile: true,
      showNFTs: true,
      showActivity: false,
    },
  });

  const sections = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'wallets', label: 'Wallets', icon: '💳' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'security', label: 'Security', icon: '🛡️' },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [key]: value,
      },
    });
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setFormData({
      ...formData,
      privacy: {
        ...formData.privacy,
        [key]: value,
      },
    });
  };

  const handleSave = () => {
    trackEvent('profile_updated', formData);
    console.log('Saving settings:', formData);
    setEditMode(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    trackEvent('wallet_address_copied', { address: text });
  };

  const handleSignOut = () => {
    trackEvent('user_signed_out_from_settings');
    signOut();
  };

  // Render functions
  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Profile Information</h3>
        <button
          onClick={() => setEditMode(!editMode)}
          className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
        >
          {editMode ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Full Name</label>
          {editMode ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-700 border border-slate-600 text-white"
            />
          ) : (
            <p className="text-white bg-slate-700 px-4 py-3 rounded-xl">{formData.fullName || 'Not set'}</p>
          )}
        </div>
        {/* Username */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Username</label>
          {editMode ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-700 border border-slate-600 text-white"
            />
          ) : (
            <p className="text-white bg-slate-700 px-4 py-3 rounded-xl">{formData.username || 'Not set'}</p>
          )}
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Email</label>
          <p className="text-white bg-slate-700 px-4 py-3 rounded-xl">{formData.email}</p>
        </div>
        {/* Country */}
        <div>
          <label className="block text-sm text-slate-400 mb-2">Country</label>
          {editMode ? (
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-700 border border-slate-600 text-white"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="OTHER">Other</option>
            </select>
          ) : (
            <p className="text-white bg-slate-700 px-4 py-3 rounded-xl">{formData.country || 'Not set'}</p>
          )}
        </div>
      </div>
      {/* Save/Cancel buttons */}
      {editMode && (
        <div className="flex space-x-3 mt-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="px-6 py-3 bg-slate-600 hover:bg-slate-500 text-slate-300 rounded-xl transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );

  const renderWalletsSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Connected Wallets</h3>
      <div className="space-y-4">
        {/* Claim Wallet */}
        {claimWalletAddress && (
          <div className="flex items-center justify-between p-4 bg-slate-700 border border-slate-600 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-lg">📧</span>
              </div>
              <div>
                <p className="text-white font-medium">Claim Wallet</p>
                <p className="text-sm text-slate-400">Email-linked wallet</p>
                <p className="text-xs text-slate-500 font-mono">
                  {claimWalletAddress.slice(0, 8)}...{claimWalletAddress.slice(-8)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-sm">✓ Connected</span>
              <button
                onClick={() => copyToClipboard(claimWalletAddress)}
                className="p-2 hover:bg-slate-600 rounded-lg transition-colors"
              >
                {/* Clipboard Icon */}
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* External Wallet */}
        {connected && publicKey && (
          <div className="flex items-center justify-between p-4 bg-slate-700 border border-slate-600 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <span className="text-lg">🦊</span>
              </div>
              <div>
                <p className="text-white font-medium">{wallet?.adapter.name}</p>
                <p className="text-sm text-slate-400">External wallet</p>
                <p className="text-xs text-slate-500 font-mono">
                  {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-sm">✓ Connected</span>
              <button
                onClick={() => copyToClipboard(publicKey.toBase58())}
                className="p-2 hover:bg-slate-600 rounded-lg transition-colors"
              >
                {/* Copy Icon */}
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
              {/* Disconnect Button */}
              <button
                onClick={disconnect}
                className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                {/* Disconnect Icon */}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Wallet Tips */}
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl mt-4">
        <h4 className="text-white font-semibold mb-2">💡 Wallet Tips</h4>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>• Your claim wallet is automatically backed up to your email</li>
          <li>• External wallets give you full control over your private keys</li>
          <li>• You can use multiple wallets simultaneously</li>
          <li>• Always verify wallet addresses before transactions</li>
        </ul>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Notification Preferences</h3>
      <div className="space-y-4">
        {Object.entries(formData.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-slate-700 rounded-xl">
            <div>
              <p className="text-white font-medium capitalize">
                {key === 'email'
                  ? 'Email Notifications'
                  : key === 'staking'
                  ? 'Staking Updates'
                  : key === 'rewards'
                  ? 'Reward Notifications'
                  : 'Marketplace Activity'}
              </p>
              <p className="text-sm text-slate-400">
                {key === 'email'
                  ? 'Receive important updates via email'
                  : key === 'staking'
                  ? 'Get notified about staking status changes'
                  : key === 'rewards'
                  ? 'Daily reward summaries and milestones'
                  : 'New listings and marketplace updates'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleNotificationChange(key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Privacy Settings</h3>
      <div className="space-y-4">
        {Object.entries(formData.privacy).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-slate-700 rounded-xl">
            <div>
              <p className="text-white font-medium">
                {key === 'showProfile'
                  ? 'Public Profile'
                  : key === 'showNFTs'
                  ? 'Show NFT Collection'
                  : 'Show Activity History'}
              </p>
              <p className="text-sm text-slate-400">
                {key === 'showProfile'
                  ? 'Make your profile visible to other users'
                  : key === 'showNFTs'
                  ? 'Display your NFTs on your public profile'
                  : 'Show your staking and trading activity'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handlePrivacyChange(key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white">Security</h3>
      <div className="space-y-4">
        {/* Change Password */}
        <div className="p-4 bg-slate-700 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-medium">Password</h4>
            <button className="text-blue-400 hover:text-blue-300 text-sm">
              Change Password
            </button>
          </div>
          <p className="text-sm text-slate-400">Last changed: Never</p>
        </div>
        {/* Enable 2FA */}
        <div className="p-4 bg-slate-700 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-medium">Two-Factor Authentication</h4>
            <button className="text-blue-400 hover:text-blue-300 text-sm">
              Enable 2FA
            </button>
          </div>
          <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
        </div>
        {/* Export Wallet Data */}
        <div className="p-4 bg-slate-700 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-medium">Export Wallet Data</h4>
            <button className="text-blue-400 hover:text-blue-300 text-sm">
              Download Backup
            </button>
          </div>
          <p className="text-sm text-slate-400">Download encrypted backup of your wallet data</p>
        </div>
        {/* Danger Zone */}
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-red-400 font-medium">Danger Zone</h4>
          </div>
          <div className="space-y-2">
            <button className="w-full text-left p-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors">
              Delete Account
            </button>
            <button
              onClick={handleSignOut}
              className="w-full text-left p-3 bg-slate-600 hover:bg-slate-500 rounded-lg text-slate-300 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'wallets':
        return renderWalletsSection();
      case 'notifications':
        return renderNotificationsSection();
      case 'privacy':
        return renderPrivacySection();
      case 'security':
        return renderSecuritySection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="space-y-2">
          {sections.map((section, index) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                w-full flex items-center space-x-3 p-4 rounded-xl transition-all
                ${activeSection === section.id ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'}
              `}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-xl">{section.icon}</span>
              <span className="font-medium">{section.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="lg:col-span-3"
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};