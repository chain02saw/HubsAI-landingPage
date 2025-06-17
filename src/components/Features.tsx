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
      {/* Token Flow Background Animation - SHARP & CONTRASTED */}
      <div className="absolute inset-0 opacity-80">
        {/* Blockchain Grid Lines */}
        <div className="absolute inset-0">
          {/* Smart horizontal flowing lines with pulse waves */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{
                top: `${20 + i * 15}%`,
                width: '100%',
                filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))',
              }}
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 1, 1, 0],
                scaleY: [1, 2, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          ))}

          {/* Smart vertical data streams */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-0.5 bg-gradient-to-b from-transparent via-emerald-400 to-transparent"
              style={{
                left: `${10 + i * 12}%`,
                height: '100%',
                filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.9))',
              }}
              animate={{
                y: ['-100%', '100%'],
                opacity: [0, 1, 1, 0],
                scaleX: [1, 3, 1],
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
              {/* Advanced Node with Smart Pulsing */}
              <motion.div
                className="absolute w-5 h-5 rounded-full border-2 border-white"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  background: 'radial-gradient(circle, #ffd700 0%, #ff6b35 50%, #004e92 100%)',
                  filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.9))',
                }}
                animate={{
                  scale: [1, 1.6, 1.2, 1],
                  boxShadow: [
                    '0 0 15px rgba(255, 215, 0, 0.8)',
                    '0 0 30px rgba(255, 215, 0, 1)',
                    '0 0 15px rgba(255, 215, 0, 0.8)',
                  ],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: node.delay,
                  ease: [0.4, 0, 0.6, 1],
                }}
              />

              {/* Smart Connection Web (connect to multiple nodes) */}
              {tokenNodes.slice(i + 1, i + 3).map((targetNode, j) => (
                <motion.div
                  key={`connection-${i}-${j}`}
                  className="absolute h-0.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
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
                    filter: 'drop-shadow(0 0 8px rgba(255, 165, 0, 0.8))',
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scaleY: [1, 2, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: node.delay + j * 0.3,
                  }}
                />
              ))}

              {/* Smart Data Packets with Trails */}
              {i < tokenNodes.length - 1 && (
                <>
                  <motion.div
                    className="absolute w-2 h-2 rounded-full border border-cyan-400"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      background: 'radial-gradient(circle, #ffffff 0%, #00d4ff 100%)',
                      filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.9))',
                    }}
                    animate={{
                      x: `${(tokenNodes[i + 1].x - node.x) * 8}px`,
                      y: `${(tokenNodes[i + 1].y - node.y) * 4}px`,
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: node.delay + 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                  
                  {/* Packet Trail Effect */}
                  <motion.div
                    className="absolute w-1 h-1 bg-cyan-300 rounded-full"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                    }}
                    animate={{
                      x: `${(tokenNodes[i + 1].x - node.x) * 8}px`,
                      y: `${(tokenNodes[i + 1].y - node.y) * 4}px`,
                      opacity: [0, 1, 0],
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

        {/* Smart Multi-Layer Orbiting System */}
        <div className="absolute inset-0 flex items-center justify-center">
          {orbitingCubes.map((cube) => (
            <motion.div
              key={cube.id}
              className="absolute border-2"
              style={{
                width: `${cube.size * 2}px`,
                height: `${cube.size * 2}px`,
                borderRadius: cube.layer === 0 ? '50%' : '3px',
                background: cube.layer === 0 
                  ? 'radial-gradient(circle, #8b5cf6 0%, #3b82f6 100%)'
                  : cube.layer === 1
                  ? 'linear-gradient(45deg, #f59e0b 0%, #ef4444 100%)'
                  : 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                borderColor: cube.layer === 0 ? '#8b5cf6' : cube.layer === 1 ? '#f59e0b' : '#10b981',
                filter: `drop-shadow(0 0 ${8 + cube.layer * 4}px ${
                  cube.layer === 0 ? 'rgba(139, 92, 246, 0.8)' : 
                  cube.layer === 1 ? 'rgba(245, 158, 11, 0.8)' : 
                  'rgba(16, 185, 129, 0.8)'
                })`,
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
                scale: [1, 1.3, 1],
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

        {/* Smart Token Symbols with Intelligent Movement */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`token-${i}`}
            className="absolute font-bold"
            style={{
              left: `${8 + i * 9}%`,
              top: `${15 + (i % 3) * 25}%`,
              fontSize: '20px',
              color: i % 3 === 0 ? '#ffd700' : i % 3 === 1 ? '#ff6b35' : '#00d4ff',
              filter: `drop-shadow(0 0 12px ${
                i % 3 === 0 ? 'rgba(255, 215, 0, 0.9)' : 
                i % 3 === 1 ? 'rgba(255, 107, 53, 0.9)' : 
                'rgba(0, 212, 255, 0.9)'
              })`,
            }}
            animate={{
              y: [-15, -45, -15],
              opacity: [0.8, 1, 0.8],
              rotateY: [0, 180, 360],
              rotateZ: [0, 10, -10, 0],
              scale: [1, 1.4, 1],
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

        {/* Smart 3D Blockchain Blocks with Physics */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`block-${i}`}
            className="absolute border-2 border-white"
            style={{
              left: `${5 + i * 13}%`,
              top: `${25 + (i % 4) * 20}%`,
              width: `${12 + (i % 3) * 4}px`,
              height: `${12 + (i % 3) * 4}px`,
              borderRadius: '3px',
              background: `linear-gradient(${45 + i * 30}deg, 
                ${i % 4 === 0 ? '#3b82f6, #1d4ed8' : 
                  i % 4 === 1 ? '#ef4444, #dc2626' :
                  i % 4 === 2 ? '#10b981, #059669' : 
                  '#8b5cf6, #7c3aed'})`,
              filter: `drop-shadow(0 0 10px ${
                i % 4 === 0 ? 'rgba(59, 130, 246, 0.8)' : 
                i % 4 === 1 ? 'rgba(239, 68, 68, 0.8)' :
                i % 4 === 2 ? 'rgba(16, 185, 129, 0.8)' : 
                'rgba(139, 92, 246, 0.8)'
              })`,
            }}
            animate={{
              rotateX: [0, 180, 360],
              rotateY: [0, 360],
              rotateZ: [0, 180],
              scale: [1, 1.3, 1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))}

        {/* Smart Connecting Laser Beams */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`laser-${i}`}
            className="absolute h-0.5"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
              width: '15%',
              background: 'linear-gradient(90deg, transparent, #00ff88, #0088ff, transparent)',
              transform: `rotate(${i * 45}deg)`,
              filter: 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.9))',
            }}
            animate={{
              opacity: [0, 1, 0],
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

        {/* Smart Perimeter Scanning Effect */}
        <motion.div
          className="absolute inset-0 border border-transparent"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 136, 0.6) 25%, rgba(0, 136, 255, 0.6) 50%, rgba(255, 68, 136, 0.6) 75%, transparent 100%)',
            backgroundSize: '200% 100%',
            borderRadius: '8px',
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

        {/* Smart Corner Energy Pulses */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`corner-${i}`}
            className="absolute w-4 h-4 border-2 border-cyan-400"
            style={{
              [i < 2 ? 'top' : 'bottom']: '10px',
              [i % 2 === 0 ? 'left' : 'right']: '10px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #00ffff 0%, transparent 70%)',
              filter: 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.9))',
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.6, 1, 0.6],
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

      {/* Minimal overlay for maximum visibility */}
      <div className="absolute inset-0 bg-dark-950/20" />

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