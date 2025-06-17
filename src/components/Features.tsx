import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const features = [
  {
    icon: '💰',
    title: 'Earn Yield on Everyday Purchases',
    description: 'Turn purchases into rewards through tokenized ownership and programmable perks.'
  },
  {
    icon: '🛠️',
    title: 'Empower Brands with Web3 Tools',
    description: 'Enable airdrops, token communities, and new ways to engage loyal customers.'
  },
  {
    icon: '⚡',
    title: 'Instant Transferability',
    description: 'Sell or gift your product instantly through secure digital ownership.'
  },
  {
    icon: '📦',
    title: 'Trackable Product Lifecycle',
    description: 'See who owned it, when, and how it performed—all backed by on-chain history.'
  },
  {
    icon: '🎯',
    title: 'Programmable Rewards',
    description: 'Unlock exclusive benefits, loyalty points, or resale royalties with every token.'
  },
  {
    icon: '🤝',
    title: 'Built for Community Ownership',
    description: 'Tokens connect users, brands, and products into powerful ecosystems of value.'
  }
];

const Features: React.FC = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !vantaEffect) {
      (window as any).THREE = THREE;

      import('vanta/dist/vanta.net.min').then((vantaModule) => {
        const VANTA = vantaModule.default;
        if (VANTA) {
          setVantaEffect(
            VANTA({
              el: vantaRef.current,
              THREE: THREE,
              mouseControls: false,
              touchControls: false,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              color: 0x1a1f2e,          // very dark blue lines
              backgroundColor: 0x0f172a, // dark background
              points: 6.0,
              maxDistance: 18.0,
              spacing: 20.0,
              showDots: false
            })
          );
        }
      });
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <section ref={vantaRef} className="relative py-20 overflow-hidden text-white">
      {/* Overlay to fade background animation */}
      <div className="absolute inset-0 bg-dark-950 opacity-70 z-[1] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold uppercase text-white mb-6">
            Tokenizing Real-World Products to Change the World
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            We turn real-world products into digital assets that deliver value beyond the sale.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
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
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
