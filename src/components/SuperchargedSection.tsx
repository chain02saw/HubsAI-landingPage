import React from 'react';
import { motion } from 'framer-motion';

const SuperchargedSection: React.FC = () => {
  return (
    <section className="relative py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Every Purchase,<br />
              <span className="text-teal-400">Supercharged</span>
            </h2>
            <p className="text-xl text-gray-300">
              Transform purchases into programmable<br />
              assets—stake products, earn rewards,<br />
              and access exclusive brand perks.
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-6">
            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <img src="/assets/svg/coin_icon.svg" alt="" className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Tokenization Engine</h3>
                <p className="text-gray-400">Every sale mints a product token</p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <img src="/assets/svg/gift_icon.svg" alt="" className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Staking & Rewards Layer</h3>
                <p className="text-gray-400">Earn while you own</p>
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
                <img src="/assets/svg/people_icon.svg" alt="" className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Smart Ownership</h3>
                <p className="text-gray-400">Transferable, verifiable, and tradable</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Mobile App Image */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <img 
              src="/assets/png/hand_img-8.png" 
              alt="Mobile App Interface" 
              className="w-full max-w-sm h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuperchargedSection;