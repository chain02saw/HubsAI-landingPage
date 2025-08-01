import React from 'react';
import { motion } from 'framer-motion';

const CheckoutToWalletSection: React.FC = () => {
  return (
    <section className="relative py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          className="space-y-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            From Checkout to Wallet,<br />
            Then to the World
          </h2>
          <p className="text-xl text-teal-400">
            Every product becomes a token, a wallet, and a reward in $HUBS.
          </p>
        </motion.div>

        {/* Flow Visualization */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Step 1 - Shopping Cart */}
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
              <img src="/assets/png/shopify_icon-8.png" alt="Shopping Cart" className="w-10 h-10" />
            </div>
            <p className="text-gray-400 text-sm">Purchase</p>
          </motion.div>

          {/* Arrow 1 */}
          <motion.div
            className="text-teal-400 text-2xl"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            →
          </motion.div>

          {/* Step 2 - Wallet */}
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
              <img src="/assets/png/wallet_icon-8.png" alt="Wallet" className="w-10 h-10" />
            </div>
            <p className="text-gray-400 text-sm">Tokenize</p>
          </motion.div>

          {/* Arrow 2 */}
          <motion.div
            className="text-teal-400 text-2xl"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            →
          </motion.div>

          {/* Step 3 - Token Stack */}
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
              <img src="/assets/png/stake_tokens-8.png" alt="Token Stack" className="w-10 h-10" />
            </div>
            <p className="text-gray-400 text-sm">Stake & Earn</p>
          </motion.div>

          {/* Arrow 3 */}
          <motion.div
            className="text-teal-400 text-2xl"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            →
          </motion.div>

          {/* Step 4 - Rewards */}
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-20 h-20 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
              <img src="/assets/png/kiosk_rewards-8.png" alt="Rewards" className="w-10 h-10" />
            </div>
            <p className="text-gray-400 text-sm">Global Access</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CheckoutToWalletSection;