import React from 'react';
import { motion } from 'framer-motion';

const RewiringSectionOne: React.FC = () => {
  return (
    <section className="relative py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content - Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img 
            src="/assets/png/kiosk_img-8.png" 
            alt="Tokenizing Kiosk" 
            className="w-full max-w-md mx-auto"
          />
          
          {/* Overlay text on image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-6 text-center">
              <h3 className="text-teal-400 font-bold text-lg mb-2">Tokenizing</h3>
              <p className="text-white text-sm">Everything</p>
              <p className="text-white text-sm">Unlocking</p>
              <p className="text-white text-sm">Rewards</p>
            </div>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Rewiring Retail with<br />
              <span className="text-teal-400">Tokenized Logistics</span>
            </h2>
            <p className="text-xl text-gray-300">
              Tokenization unlocks Autonomous<br />
              local fulfillment and Instant Access.
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-6">
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <img src="/assets/svg/cubic_icon.svg" alt="" className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Try Before You Buy</h3>
                <p className="text-gray-400">Test products locally—no risk, no wait</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <img src="/assets/svg/gift_icon.svg" alt="" className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Instant Fulfillment</h3>
                <p className="text-gray-400">Grab it now, return it anytime. No shipping</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <img src="/assets/svg/coin_icon.svg" alt="" className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Tokenized Ownership</h3>
                <p className="text-gray-400">Every item is a digital asset you control</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RewiringSectionOne;