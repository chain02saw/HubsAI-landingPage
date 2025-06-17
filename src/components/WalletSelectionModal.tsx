import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthContext';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

interface WalletSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletSelectionModal: React.FC<WalletSelectionModalProps> = ({ isOpen, onClose }) => {
  const { user, createClaimWallet, claimWalletAddress, setWalletSetupComplete } = useAuth();
  const { publicKey, connected, wallet, connect } = useWallet();
  const { setVisible } = useWalletModal();
  const [loading, setLoading] = useState(false);
  const [claimWalletCreated, setClaimWalletCreated] = useState(false);

  const connection = new Connection("https://twilight-dry-mountain.solana-mainnet.quiknode.pro/017a2f3e43e29982f440bbcf3b8b990f2757bbdf/");

  useEffect(() => {
    if (connected && publicKey) {
      console.log("Wallet connected:", publicKey.toBase58());
      // Auto-complete setup when extension wallet connects
      setTimeout(() => {
        setWalletSetupComplete();
        onClose();
      }, 1500);
    }
  }, [connected, publicKey, setWalletSetupComplete, onClose]);

  const handleCreateClaimWallet = async () => {
    setLoading(true);
    
    try {
      const address = await createClaimWallet();
      if (address) {
        setClaimWalletCreated(true);
        console.log("Claim wallet created:", address);
      }
    } catch (error) {
      console.error('Error creating claim wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectExtensionWallet = () => {
    setVisible(true);
  };

  const handleCompleteSetup = () => {
    setWalletSetupComplete();
    onClose();
  };

  const handleClaimAirdrop = () => {
    window.open('https://community.hubsai.io/', '_blank');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

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
              className="glass rounded-3xl p-8 w-full max-w-2xl relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/5 rounded-3xl" />

              {/* Header */}
              <div className="text-center mb-8 relative z-10">
                <motion.h2
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  🎉 Welcome to HubsAI!
                </motion.h2>
                <motion.p
                  className="text-gray-300 text-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Choose how you'd like to connect your wallet
                </motion.p>
              </div>

              {/* Wallet Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
                
                {/* Claim Wallet Option */}
                <motion.div
                  className="glass rounded-2xl p-6 border border-primary-500/30 hover:border-primary-500/50 transition-all"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📧</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Claim Wallet</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Create a new wallet linked to your email. Perfect for beginners!
                    </p>
                    
                    {claimWalletAddress || claimWalletCreated ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          <span className="text-green-400 text-sm">Wallet Created!</span>
                        </div>
                        {claimWalletAddress && (
                          <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                            <span className="text-xs text-gray-400 font-mono">
                              {claimWalletAddress.slice(0, 8)}...{claimWalletAddress.slice(-8)}
                            </span>
                            <button
                              onClick={() => copyToClipboard(claimWalletAddress)}
                              className="p-1 hover:bg-white/10 rounded"
                            >
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <motion.button
                        onClick={handleCreateClaimWallet}
                        disabled={loading}
                        className="w-full py-2 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white rounded-xl transition-all font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            Creating...
                          </div>
                        ) : (
                          'Create Claim Wallet'
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>

                {/* Browser Extension Option */}
                <motion.div
                  className="glass rounded-2xl p-6 border border-yellow-500/30 hover:border-yellow-500/50 transition-all"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🦊</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Browser Extension</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Connect Phantom, Backpack, Solflare, or other installed Solana wallets
                    </p>
                    
                    {connected && publicKey ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          <span className="text-green-400 text-sm">{wallet?.adapter.name} Connected!</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                          <span className="text-xs text-gray-400 font-mono">
                            {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}
                          </span>
                          <button
                            onClick={() => copyToClipboard(publicKey.toBase58())}
                            className="p-1 hover:bg-white/10 rounded"
                          >
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <motion.button
                        onClick={handleConnectExtensionWallet}
                        className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition-all font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Connect Wallet
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Success Actions */}
              <AnimatePresence>
                {(claimWalletAddress || claimWalletCreated || (connected && publicKey)) && (
                  <motion.div
                    className="text-center relative z-10 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <p className="text-green-400 font-medium">
                        🎉 Perfect! Your wallet is ready. You can now claim your HubsAI airdrop!
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <motion.button
                        onClick={handleClaimAirdrop}
                        className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold rounded-xl transition-all duration-300 border border-yellow-400/50 shadow-lg"
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: "0 0 30px rgba(255, 193, 7, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        🚀 Claim Your Airdrop Now
                      </motion.button>
                      
                      <motion.button
                        onClick={handleCompleteSetup}
                        className="w-full py-2 text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Continue to Dashboard
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Skip Option */}
              {!claimWalletAddress && !claimWalletCreated && !connected && (
                <motion.div
                  className="text-center relative z-10 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={handleCompleteSetup}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Skip for now (you can set this up later)
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WalletSelectionModal;