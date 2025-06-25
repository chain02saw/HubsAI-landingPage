import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Optimized: Moved to constants to prevent recreation
const FEATURES = [
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
] as const;

// Optimized: Simplified background animation patterns
const ANIMATION_ELEMENTS = {
  gridLines: 3, // Reduced from 5
  dataStreams: 4, // Reduced from 8
  tokenNodes: 4, // Reduced from 6
  orbitingCubes: 6, // Reduced from 12
  tokenSymbols: 6, // Reduced from 10
  blocks: 4, // Reduced from 8
  lasers: 2, // Reduced from 4
} as const;

// Optimized: Pre-calculated positions to avoid runtime calculations
const TOKEN_NODES = Array.from({ length: ANIMATION_ELEMENTS.tokenNodes }, (_, i) => ({
  id: i,
  x: (i % 2) * 40 + 25, // Simplified grid
  y: Math.floor(i / 2) * 30 + 20,
  delay: i * 0.4,
}));

const ORBITING_CUBES = Array.from({ length: ANIMATION_ELEMENTS.orbitingCubes }, (_, i) => ({
  id: i,
  angle: (i * 60), // Increased spacing
  radius: 40 + (i % 2) * 25, // Simplified radius calculation
  speed: 0.8 + (i % 2) * 0.4,
  size: 4 + (i % 2) * 2,
  layer: i % 2, // Reduced to 2 layers
}));

// Optimized: Memoized background component
const BackgroundAnimation: React.FC = React.memo(() => {
  // Optimized: Memoized grid lines to prevent recreation
  const gridLines = useMemo(() => (
    <>
      {/* Simplified horizontal lines */}
      {Array.from({ length: ANIMATION_ELEMENTS.gridLines }, (_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute h-0.5 bg-gradient-to-r from-transparent via-teal-300/40 to-transparent"
          style={{
            top: `${25 + i * 25}%`,
            width: '100%',
            filter: 'drop-shadow(0 0 3px rgba(20, 184, 166, 0.3))',
          }}
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Simplified vertical lines */}
      {Array.from({ length: ANIMATION_ELEMENTS.dataStreams }, (_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-0.5 bg-gradient-to-b from-transparent via-emerald-300/30 to-transparent"
          style={{
            left: `${15 + i * 25}%`,
            height: '100%',
            filter: 'drop-shadow(0 0 2px rgba(16, 185, 129, 0.4))',
          }}
          animate={{
            y: ['-100%', '100%'],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  ), []);

  // Optimized: Memoized token network
  const tokenNetwork = useMemo(() => (
    <div className="absolute inset-0">
      {TOKEN_NODES.map((node, i) => (
        <div key={node.id}>
          {/* Simplified nodes */}
          <motion.div
            className="absolute w-4 h-4 rounded-full border border-slate-300"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              background: 'radial-gradient(circle, #fbbf24 0%, #f97316 100%)',
              filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.4))',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: node.delay,
              ease: "easeInOut",
            }}
          />

          {/* Simplified connections */}
          {i < TOKEN_NODES.length - 1 && (
            <motion.div
              className="absolute h-0.5 bg-gradient-to-r from-amber-300/40 to-red-300/30"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${Math.abs(TOKEN_NODES[i + 1].x - node.x)}%`,
                transformOrigin: '0 0',
                filter: 'drop-shadow(0 0 3px rgba(245, 158, 11, 0.3))',
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: node.delay,
              }}
            />
          )}
        </div>
      ))}
    </div>
  ), []);

  // Optimized: Memoized orbiting system
  const orbitingSystem = useMemo(() => (
    <div className="absolute inset-0 flex items-center justify-center">
      {ORBITING_CUBES.map((cube) => (
        <motion.div
          key={cube.id}
          className="absolute border"
          style={{
            width: `${cube.size * 2}px`,
            height: `${cube.size * 2}px`,
            borderRadius: cube.layer === 0 ? '50%' : '3px',
            background: cube.layer === 0 
              ? 'radial-gradient(circle, #a78bfa 0%, #7dd3fc 100%)'
              : 'linear-gradient(45deg, #fbbf24 0%, #fb7185 100%)',
            borderColor: cube.layer === 0 ? '#a78bfa' : '#fbbf24',
            filter: `drop-shadow(0 0 ${3 + cube.layer}px ${
              cube.layer === 0 ? 'rgba(167, 139, 250, 0.3)' : 'rgba(251, 191, 36, 0.3)'
            })`,
            opacity: 0.6,
          }}
          animate={{
            x: [
              `${Math.cos(cube.angle * Math.PI / 180) * cube.radius}px`,
              `${Math.cos((cube.angle + 360) * Math.PI / 180) * cube.radius}px`,
            ],
            y: [
              `${Math.sin(cube.angle * Math.PI / 180) * cube.radius}px`,
              `${Math.sin((cube.angle + 360) * Math.PI / 180) * cube.radius}px`,
            ],
            rotate: [0, 360],
          }}
          transition={{
            duration: 5 + cube.layer,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  ), []);

  return (
    <>
      {gridLines}
      {tokenNetwork}
      {orbitingSystem}
    </>
  );
});

BackgroundAnimation.displayName = 'BackgroundAnimation';

const Features: React.FC = React.memo(() => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 overflow-hidden">
      {/* Optimized background with reduced complexity */}
      <div className="absolute inset-0 opacity-40">
        <BackgroundAnimation />
      </div>

      {/* Balanced overlay */}
      <div className="absolute inset-0 bg-dark-950/30" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold uppercase text-white mb-6">
            Tokenizing Real-World Products to{' '}
            <span className="glow-text">Change the World</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            We turn real-world products into digital assets that deliver value beyond the sale.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 transition-all duration-300 border border-white/5 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary-500/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.03,
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
});

Features.displayName = 'Features';

export default Features;