import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: '🧪',
    title: 'Try Before You Buy',
    description: 'Test products locally—no risk, no wait'
  },
  {
    icon: '📦',
    title: 'Instant Fulfillment',
    description: 'Grab it now, return it anytime. No shipping'
  },
  {
    icon: '🎯',
    title: 'Tokenized Ownership',
    description: 'Every item is a digital asset you control'
  }
];

const TokenizedLogistics: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('assets/kiosk.jpg')`,
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Text content */}
          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Main headline */}
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Rewiring Retail with{' '}
              <span className="glow-text">
                Tokenized Logistics
              </span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Local fulfillment, instant access, and digital ownership—powered by autonomous kiosks and blockchain.
            </motion.p>

            {/* Features list */}
            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-6"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm border border-white/20">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Retail Plaza with HubsAI Kiosk */}
          
        </div>
      </div>
    </section>
  );
};

export default TokenizedLogistics;