import React from 'react';
import { motion } from 'framer-motion';

const LetsWorkSection: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          className="space-y-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Let's Work
          </h2>
        </motion.div>

        {/* Silhouette Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img 
            src="/assets/png/skycraper_img-8.png" 
            alt="Collaboration Silhouette" 
            className="w-full max-w-4xl mx-auto h-auto"
          />
          
          {/* Glow effect behind image */}
          <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent rounded-lg blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default LetsWorkSection;