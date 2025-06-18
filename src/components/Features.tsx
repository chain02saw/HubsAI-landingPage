import React from 'react';
import { motion } from 'framer-motion';

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

// Generate positions for token flow elements - HIGHER POSITIONING
const tokenNodes = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  x: (i % 3) * 35 + 20, // Grid positions
  y: Math.floor(i / 3) * 25 + 15, // HIGHER Y values (was 40 + 20)
  delay: i * 0.3,
}));

// Generate smart orbiting cubes with varied patterns
const orbitingCubes = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: (i * 30), // More cubes, tighter spacing
  radius: 40 + (i % 3) * 20,
  speed: 0.8 + (i % 4) * 0.4,
  size: 3 + (i % 3) * 2,
  layer: i % 3, // Multiple orbital layers
}));

const Features: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 overflow-hidden">
      {/* Token Flow Background Animation - TONED DOWN COLORS */}
      <div className="absolute inset-0 opacity-50">
        {/* Blockchain Grid Lines */}
        <div className="absolute inset-0">
          {/* Smart horizontal flowing lines with pulse waves - SOFTER */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-teal-300/60 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                width: '100%',
                filter: 'drop-shadow(0 0 4px rgba(20, 184, 166, 0.4))',
              }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 0.8, 0.8, 0],
                scaleY: [1, 1.5, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          ))}

          {/* Smart vertical data streams - SOFTER */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-0.5 bg-gradient-to-b from-transparent via-emerald-300/50 to-transparent"
              style={{
                left: `${10 + i * 12}%`,
                height: '100%',
                filter: 'drop-shadow(0 0 3px rgba(16, 185, 129, 0.5))',
              }}
              animate={{
                y: ['-100%', '100%'],
                opacity: [0, 0.7, 0.7, 0],
                scaleX: [1, 2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Smart Token Network with Advanced Connections */}
        <div className="absolute inset-0">
          {tokenNodes.map((node, i) => (
            <div key={node.id}>
              {/* Advanced Node with Smart Pulsing - SOFTER COLORS */}
              <motion.div
                className="absolute w-5 h-5 rounded-full border border-slate-300"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  background: 'radial-gradient(circle, #fbbf24 0%, #f97316 50%, #3b82f6 100%)',
                  filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))',
                }}
                animate={{
                  scale: [1, 1.4, 1.1, 1],
                  boxShadow: [
                    '0 0 8px rgba(251, 191, 36, 0.4)',
                    '0 0 15px rgba(251, 191, 36, 0.6)',
                    '0 0 8px rgba(251, 191, 36, 0.4)',
                  ],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: node.delay,
                  ease: [0.4, 0, 0.6, 1],
                }}
              />

              {/* Smart Connection Web - SOFTER */}
              {tokenNodes.slice(i + 1, i + 3).map((targetNode, j) => (
                <motion.div
                  key={`connection-${i}-${j}`}
                  className="absolute h-0.5 bg-gradient-to-r from-amber-300/60 via-orange-300/60 to-red-300/50"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    width: `${Math.sqrt(
                      Math.pow(targetNode.x - node.x, 2) + Math.pow(targetNode.y - node.y, 2)
                    )}%`,
                    transformOrigin: '0 0',
                    transform: `rotate(${Math.atan2(
                      targetNode.y - node.y,
                      targetNode.x - node.x
                    ) * 180 / Math.PI}deg)`,
                    filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.4))',
                  }}
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                    scaleY: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: node.delay + j * 0.3,
                  }}
                />
              ))}

              {/* Smart Data Packets with Trails - SOFTER */}
              {i < tokenNodes.length - 1 && (
                <>
                  <motion.div
                    className="absolute w-2 h-2 rounded-full border border-slate-300"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      background: 'radial-gradient(circle, #f1f5f9 0%, #64748b 100%)',
                      filter: 'drop-shadow(0 0 6px rgba(148, 163, 184, 0.6))',
                    }}
                    animate={{
                      x: `${(tokenNodes[i + 1].x - node.x) * 8}px`,
                      y: `${(tokenNodes[i + 1].y - node.y) * 4}px`,
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: node.delay + 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                  
                  {/* Packet Trail Effect - SOFTER */}
                  <motion.div
                    className="absolute w-1 h-1 bg-slate-400/60 rounded-full"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                    }}
                    animate={{
                      x: `${(tokenNodes[i + 1].x - node.x) * 8}px`,
                      y: `${(tokenNodes[i + 1].y - node.y) * 4}px`,
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: node.delay + 0.4,
                    }}
                  />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Smart Multi-Layer Orbiting System - SOFTER COLORS */}
        <div className="absolute inset-0 flex items-center justify-center">
          {orbitingCubes.map((cube) => (
            <motion.div
              key={cube.id}
              className="absolute border"
              style={{
                width: `${cube.size * 2}px`,
                height: `${cube.size * 2}px`,
                borderRadius: cube.layer === 0 ? '50%' : '3px',
                background: cube.layer === 0 
                  ? 'radial-gradient(circle, #a78bfa 0%, #7dd3fc 100%)'
                  : cube.layer === 1
                  ? 'linear-gradient(45deg, #fbbf24 0%, #fb7185 100%)'
                  : 'linear-gradient(135deg, #34d399 0%, #60a5fa 100%)',
                borderColor: cube.layer === 0 ? '#a78bfa' : cube.layer === 1 ? '#fbbf24' : '#34d399',
                filter: `drop-shadow(0 0 ${4 + cube.layer * 2}px ${
                  cube.layer === 0 ? 'rgba(167, 139, 250, 0.4)' : 
                  cube.layer === 1 ? 'rgba(251, 191, 36, 0.4)' : 
                  'rgba(52, 211, 153, 0.4)'
                })`,
                opacity: 0.7,
              }}
              animate={{
                x: [
                  `${Math.cos(cube.angle * Math.PI / 180) * (cube.radius + cube.layer * 10)}px`,
                  `${Math.cos((cube.angle + 360) * Math.PI / 180) * (cube.radius + cube.layer * 10)}px`,
                ],
                y: [
                  `${Math.sin(cube.angle * Math.PI / 180) * (cube.radius + cube.layer * 10)}px`,
                  `${Math.sin((cube.angle + 360) * Math.PI / 180) * (cube.radius + cube.layer * 10)}px`,
                ],
                rotateZ: cube.layer === 0 ? [0, 360] : [360, 0],
                rotateY: [0, 180, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + cube.layer,
                repeat: Infinity,
                ease: 'linear',
                delay: cube.id * 0.1,
              }}
            />
          ))}
        </div>

        {/* Smart Token Symbols with Intelligent Movement - SOFTER COLORS */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`token-${i}`}
            className="absolute font-bold"
            style={{
              left: `${8 + i * 9}%`,
              top: `${15 + (i % 3) * 25}%`,
              fontSize: '18px',
              color: i % 3 === 0 ? '#d4a574' : i % 3 === 1 ? '#e09066' : '#7db3c7',
              filter: `drop-shadow(0 0 6px ${
                i % 3 === 0 ? 'rgba(212, 165, 116, 0.5)' : 
                i % 3 === 1 ? 'rgba(224, 144, 102, 0.5)' : 
                'rgba(125, 179, 199, 0.5)'
              })`,
              opacity: 0.8,
            }}
            animate={{
              y: [-15, -35, -15],
              opacity: [0.6, 0.8, 0.6],
              rotateY: [0, 180, 360],
              rotateZ: [0, 8, -8, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.25,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {i % 4 === 0 ? '◊' : i % 4 === 1 ? '●' : i % 4 === 2 ? '▲' : '■'}
          </motion.div>
        ))}

        {/* Smart 3D Blockchain Blocks with Physics - SOFTER COLORS */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`block-${i}`}
            className="absolute border border-slate-300"
            style={{
              left: `${5 + i * 13}%`,
              top: `${25 + (i % 4) * 20}%`,
              width: `${12 + (i % 3) * 4}px`,
              height: `${12 + (i % 3) * 4}px`,
              borderRadius: '3px',
              background: `linear-gradient(${45 + i * 30}deg, 
                ${i % 4 === 0 ? '#7dd3fc, #60a5fa' : 
                  i % 4 === 1 ? '#fca5a5, #f87171' :
                  i % 4 === 2 ? '#86efac, #4ade80' : 
                  '#c4b5fd, #a78bfa'})`,
              filter: `drop-shadow(0 0 6px ${
                i % 4 === 0 ? 'rgba(125, 211, 252, 0.4)' : 
                i % 4 === 1 ? 'rgba(252, 165, 165, 0.4)' :
                i % 4 === 2 ? 'rgba(134, 239, 172, 0.4)' : 
                'rgba(196, 181, 253, 0.4)'
              })`,
              opacity: 0.7,
            }}
            animate={{
              rotateX: [0, 180, 360],
              rotateY: [0, 360],
              rotateZ: [0, 180],
              scale: [1, 1.2, 1],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))}

        {/* Smart Connecting Laser Beams - SOFTER */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`laser-${i}`}
            className="absolute h-0.5"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
              width: '15%',
              background: 'linear-gradient(90deg, transparent, #7dd3fc, #60a5fa, transparent)',
              transform: `rotate(${i * 45}deg)`,
              filter: 'drop-shadow(0 0 4px rgba(125, 211, 252, 0.5))',
              opacity: 0.6,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleX: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Smart Perimeter Scanning Effect - SOFTER */}
        <motion.div
          className="absolute inset-0 border border-transparent"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(125, 211, 252, 0.3) 25%, rgba(96, 165, 250, 0.3) 50%, rgba(167, 139, 250, 0.3) 75%, transparent 100%)',
            backgroundSize: '200% 100%',
            borderRadius: '8px',
            opacity: 0.6,
          }}
          animate={{
            backgroundPosition: ['-200% 0%', '200% 0%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Smart Corner Energy Pulses - SOFTER */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`corner-${i}`}
            className="absolute w-3 h-3 border border-slate-300"
            style={{
              [i < 2 ? 'top' : 'bottom']: '10px',
              [i % 2 === 0 ? 'left' : 'right']: '10px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #f1f5f9 0%, transparent 70%)',
              filter: 'drop-shadow(0 0 8px rgba(148, 163, 184, 0.5))',
              opacity: 0.7,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.7, 0.4],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Balanced overlay for comfortable viewing */}
      <div className="absolute inset-0 bg-dark-950/40" />

      <div className="relative z-10 container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass rounded-2xl p-6 transition-all duration-300 border border-white/5 hover:bg-white/10 hover:shadow-2xl hover:shadow-primary-500/20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05,
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