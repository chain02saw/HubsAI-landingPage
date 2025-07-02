import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../AuthContext';

interface ClaimWalletStepProps {
  onNext: () => void;
  onSkip: () => void;
}

export const ClaimWalletStep: React.FC<ClaimWalletStepProps> = ({ onNext, onSkip }) => {
  const { createClaimWallet, claimWalletAddress, lookupShopifyOrder, shopifyOrder } = useAuth();
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [created, setCreated] = useState(!!claimWalletAddress);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  const handleEmailVerification = async () => {
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailLoading(true);
    setEmailError('');

    try {
      const order = await lookupShopifyOrder(email);
      if (order) {
        setEmailVerified(true);
        setEmailError('');
      } else {
        setEmailError('No Shopify order found for this email. Please use the email from your purchase.');
      }
    } catch (error) {
      setEmailError('Error verifying email. Please try again.');
    } finally {
      setEmailLoading(false);
    }
  };

  const handleClaimWallet = async () => {
    if (!emailVerified) {
      setEmailError('Please verify your email first');
      return;
    }

    setLoading(true);
    try {
      const address = await createClaimWallet();
      if (address) {
        setCreated(true);
      }
    } catch (error) {
      console.error('Error claiming wallet:', error);
      setEmailError('Error creating wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <motion.div
        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <span className="text-3xl">📧</span>
      </motion.div>

      <motion.h2
        className="text-3xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Claim Your Wallet
      </motion.h2>
      
      <motion.p
        className="text-slate-400 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Enter your email address from your Shopify purchase to claim your secure wallet.
      </motion.p>

      {/* Shopify Order Display */}
      {shopifyOrder && emailVerified && (
        <motion.div
          className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="text-green-400">✓</span>
            </div>
            <div>
              <p className="text-green-400 font-medium">Shopify Order Verified!</p>
              <p className="text-sm text-slate-400">
                Order {shopifyOrder.orderNumber} - {shopifyOrder.totalPrice}
              </p>
              {shopifyOrder.lineItems.some(item => item.nftEligible) && (
                <p className="text-xs text-green-300">🎁 NFT Eligible</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {created && claimWalletAddress ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <p className="text-green-400 font-medium">✅ Wallet Claimed Successfully!</p>
            <div className="flex items-center justify-between p-2 bg-slate-800 rounded-lg mt-3">
              <span className="text-xs text-slate-400 font-mono">
                {claimWalletAddress.slice(0, 8)}...{claimWalletAddress.slice(-8)}
              </span>
              <button
                onClick={() => copyToClipboard(claimWalletAddress)}
                className="p-1 hover:bg-slate-700 rounded"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
          
          <motion.button
            onClick={onNext}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Continue to Next Step
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Email Input and Verification */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address (from your Shopify purchase)
              </label>
              <div className="flex space-x-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  disabled={emailVerified}
                />
                {!emailVerified && (
                  <button
                    onClick={handleEmailVerification}
                    disabled={emailLoading || !email}
                    className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 disabled:opacity-50 text-blue-400 rounded-xl transition-colors"
                  >
                    {emailLoading ? (
                      <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                    ) : (
                      'Verify'
                    )}
                  </button>
                )}
              </div>
              {emailError && (
                <p className="text-red-400 text-sm mt-2">{emailError}</p>
              )}
              {emailVerified && (
                <p className="text-green-400 text-sm mt-2">✓ Email verified successfully</p>
              )}
            </div>

            {/* Claim Wallet Button */}
            <motion.button
              onClick={handleClaimWallet}
              disabled={loading || !emailVerified}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all duration-300"
              whileHover={!loading && emailVerified ? { 
                scale: 1.02,
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)"
              } : {}}
              whileTap={!loading && emailVerified ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Claiming Wallet...
                </div>
              ) : (
                'Claim My Wallet'
              )}
            </motion.button>
            
            <motion.button
              onClick={onSkip}
              className="w-full py-2 text-slate-400 hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Skip for now
            </motion.button>
          </div>
        </motion.div>
      )}

      <motion.div
        className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-white font-semibold mb-2">🔐 Why Claim Your Wallet?</h4>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>• Secure storage for your NFTs and rewards</li>
          <li>• Easy access with your verified email</li>
          <li>• Built-in staking capabilities</li>
          <li>• Automatic reward distribution</li>
        </ul>
      </motion.div>
    </div>
  );
};