import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

interface ConnectWalletStepProps {
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export const ConnectWalletStep: React.FC<ConnectWalletStepProps> = ({ onNext, onSkip, onBack }) => {
  const { connected, publicKey, wallet } = useWallet();
  const { setVisible } = useWalletModal();

  useEffect(() => {
    if (connected && publicKey) {
      setTimeout(onNext, 1500);
    }
  }, [connected, publicKey, onNext]);

  const handleConnect = () => {
    setVisible(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const walletOptions = [
    { name: 'Phantom', icon: '👻', description: 'Most popular Solana wallet' },
    { name: 'Backpack', icon: '🎒', description: 'Feature-rich crypto wallet' },
    { name: 'Solflare', icon: '☀️', description: 'Secure Solana wallet' },
    { name: 'Ledger', icon: '🔐', description: 'Hardware wallet support' }
  ];

  return (
    <div className="max-w-lg mx-auto text-center">
      <motion.button
        onClick={onBack}
        className="absolute left-4 top-4 p-4 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-slate-700/50 flex items-center justify-center min-w-[48px] min-h-[48px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>

      <motion.div
        className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <span className="text-3xl">🦊</span>
      </motion.div>

      <motion.h2
        className="text-3xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Connect External Wallet
      </motion.h2>
      
      <motion.p
        className="text-slate-400 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Connect your existing Solana wallet for enhanced features and easier management.
      </motion.p>

      {connected && publicKey ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <p className="text-green-400 font-medium">✅ {wallet?.adapter.name} Connected!</p>
            <div className="flex items-center justify-between p-2 bg-slate-800 rounded-lg mt-3">
              <span className="text-xs text-slate-400 font-mono">
                {publicKey.toBase58().slice(0, 8)}...{publicKey.toBase58().slice(-8)}
              </span>
              <button
                onClick={() => copyToClipboard(publicKey.toBase58())}
                className="p-1 hover:bg-slate-700 rounded"
              >
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-slate-400 mt-2">Automatically proceeding to next step...</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-2 gap-3 mb-6">
            {walletOptions.map((walletOption, index) => (
              <motion.div
                key={walletOption.name}
                className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="text-2xl mb-1">{walletOption.icon}</div>
                <p className="text-sm font-medium text-white">{walletOption.name}</p>
                <p className="text-xs text-slate-400">{walletOption.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={handleConnect}
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 30px rgba(245, 158, 11, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            Connect Wallet
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
        className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="text-white font-semibold mb-2">🔗 External Wallet Benefits:</h4>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>• Use your existing wallet and funds</li>
          <li>• Enhanced security features</li>
          <li>• Access to broader DeFi ecosystem</li>
          <li>• Keep full control of your assets</li>
        </ul>
      </motion.div>
    </div>
  );
};