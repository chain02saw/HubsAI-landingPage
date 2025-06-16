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
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Container with retail plaza background */}
            <div className="relative w-full max-w-lg mx-auto aspect-square rounded-3xl overflow-hidden">
              {/* Retail plaza background */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
                }}
              />
              
              {/* Overlay for better visibility */}
              <div className="absolute inset-0 bg-black/20" />
              
              {/* HubsAI Kiosk in center */}
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
                <motion.div
                  className="bg-white rounded-lg p-4 shadow-2xl"
                  style={{ width: '120px', height: '140px' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Kiosk screen */}
                  <div className="bg-gray-100 rounded h-16 mb-2 flex items-center justify-center">
                    <div className="text-xs text-gray-600">QR Code</div>
                  </div>
                  {/* HubsAI branding */}
                  <div className="text-center">
                    <div className="text-lg font-bold text-black">△ HubsAI</div>
                  </div>
                </motion.div>
              </div>
              
              {/* Floating icons with connecting lines */}
              
              {/* Shoe icon - top left */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-16 h-16 bg-gray-700/80 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-white text-xl">👟</span>
              </motion.div>
              
              {/* Location icon - top right */}
              <motion.div
                className="absolute top-1/4 right-1/4 w-16 h-16 bg-gray-700/80 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <span className="text-white text-xl">📍</span>
              </motion.div>
              
              {/* Package icon - bottom right */}
              <motion.div
                className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gray-700/80 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
                animate={{ y: [-3, 7, -3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              >
                <span className="text-white text-xl">📦</span>
              </motion.div>
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Line from shoe to kiosk */}
                <motion.line
                  x1="25%"
                  y1="30%"
                  x2="50%"
                  y2="65%"
                  stroke="#FFA500"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                
                {/* Line from location to kiosk */}
                <motion.line
                  x1="75%"
                  y1="30%"
                  x2="50%"
                  y2="65%"
                  stroke="#FFA500"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
                
                {/* Line from package to kiosk */}
                <motion.line
                  x1="75%"
                  y1="60%"
                  x2="50%"
                  y2="65%"
                  stroke="#FFA500"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.1 }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TokenizedLogistics;