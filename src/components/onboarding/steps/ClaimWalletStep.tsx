import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../AuthContext';
interface ClaimWalletStepProps {
onNext: () => void;
onSkip: () => void;
}
export const ClaimWalletStep: React.FC<ClaimWalletStepProps> = ({ onNext, onSkip }) => {
const { createClaimWallet, claimWalletAddress } = useAuth();
const [loading, setLoading] = useState(false);
const [created, setCreated] = useState(!!claimWalletAddress);
const handleCreateWallet = async () => {
setLoading(true);
try {
const address = await createClaimWallet();
if (address) {
setCreated(true);
}
} catch (error) {
console.error('Error creating wallet:', error);
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
    We'll create a secure wallet tied to your email so you can access and stake your NFT anytime.
  </motion.p>

  {created ? (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
        <p className="text-green-400 font-medium">✅ Wallet Created Successfully!</p>
        {claimWalletAddress && (
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
        )}
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
        Continue
      </motion.button>
    </motion.div>
  ) : (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.button
        onClick={handleCreateWallet}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all duration-300"
        whileHover={!loading ? { 
          scale: 1.02,
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)"
        } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            Creating Wallet...
          </div>
        ) : (
          'Create Wallet'
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
    </motion.div>
  )}

  <motion.div
    className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-left"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <h4 className="text-white font-semibold mb-2">🔐 Wallet Benefits:</h4>
    <ul className="text-sm text-slate-300 space-y-1">
      <li>• Secure storage for your NFTs</li>
      <li>• Easy access with your email</li>
      <li>• Built-in staking capabilities</li>
      <li>• No seed phrases to remember</li>
    </ul>
  </motion.div>
</div>
);
};