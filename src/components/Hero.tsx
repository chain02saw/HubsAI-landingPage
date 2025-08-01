import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Every Product,<br />
              <span className="text-teal-400">Tokenized.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-lg">
              Every purchase becomes a token.<br />
              Rewarded with Yields on everything.<br />
              Own the Retail Platform of the Future.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="bg-teal-500 hover:bg-teal-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/assets/svg/solana_icon.svg" alt="Solana" className="w-5 h-5" />
              Bridge coming soon on Solana
            </motion.button>
            
            <motion.button
              className="border border-gray-600 hover:border-teal-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create HUBs
            </motion.button>
            
            <motion.button
              className="border border-gray-600 hover:border-teal-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read the Documents
            </motion.button>
          </div>
        </motion.div>

        {/* Right Content - 3D Visualization */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            {/* Main Kiosk Image */}
            <img 
              src="/assets/png/kiosk_img-8.png" 
              alt="HubsAI Kiosk" 
              className="w-full max-w-md h-auto"
            />
            
            {/* Floating Elements */}
            <motion.div
              className="absolute -top-10 -right-10"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 rounded-lg p-3">
                <span className="text-teal-400 font-semibold text-sm">TOKEN</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-5 -left-10"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <div className="bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 rounded-lg p-3">
                <span className="text-teal-400 font-semibold text-sm">AI</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-16"
              animate={{ 
                x: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <div className="bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 rounded-lg p-3">
                <span className="text-teal-400 font-semibold text-xs">AUTONOMOUS<br />KIOSKS</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-1/4 -left-12"
              animate={{ 
                x: [0, -5, 0],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              <div className="bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 rounded-lg p-3">
                <span className="text-teal-400 font-semibold text-xs">FULFILLMENT</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;