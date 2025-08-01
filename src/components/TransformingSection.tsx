import React from 'react';
import { motion } from 'framer-motion';

const TransformingSection: React.FC = () => {
  return (
    <section className="relative py-20 bg-black">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content - Dashboard Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img 
            src="/assets/png/reinvent-8.png" 
            alt="Brand Dashboard" 
            className="w-full max-w-lg mx-auto rounded-lg"
          />
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
              Transforming How<br />
              Brands Build Digital<br />
              <span className="text-teal-400">Communities.</span>
            </h2>
            <p className="text-xl text-gray-300">
              HubsAI creates a new digital economy<br />
              for the world's best brands — turning<br />
              every product into an experience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransformingSection;