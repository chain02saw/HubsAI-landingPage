import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: '🛍️',
    title: 'Real Products',
    description: 'Authentic retail items with verified provenance and instant delivery'
  },
  {
    icon: '🎁',
    title: 'Real Rewards',
    description: 'Earn tokens and exclusive benefits for every purchase and interaction'
  },
  {
    icon: '⚡',
    title: 'Real Fast',
    description: 'Lightning-quick transactions powered by advanced AI and blockchain'
  },
  {
    icon: '🤖',
    title: 'AI-Powered',
    description: 'Smart recommendations and personalized shopping experiences'
  },
  {
    icon: '🔗',
    title: 'RWA Integration',
    description: 'Real-world assets tokenized for seamless digital ownership'
  },
  {
    icon: '🌐',
    title: 'Web3 Native',
    description: 'Built for the decentralized future of commerce and retail'
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-dark-950 to-dark-900">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Why Choose <span className="glow-text">HubsAI</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of retail with our revolutionary platform
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(20, 184, 166, 0.1)"
              }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;