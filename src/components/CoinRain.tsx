import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isMobile } from 'react-device-detect';

interface Coin {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  image: string;
  direction: number;
  speed: number;
}

// Optimized: Moved to constants to prevent recreation on each render
const COIN_CONFIGS = [
  {
    image: '/assets/da96e76291dadfbf968703182c2fcd821df9ece1.png',
    direction: -30,
  },
  {
    image: '/assets/thumb_Coins 5 copy.png', 
    direction: -30,
  },
  {
    image: '/assets/thumb_Coins 2.png',
    direction: 30,
  },
  {
    image: '/assets/thumb_Coins 4 copy.png',
    direction: 0,
  }
] as const;

// Optimized: Reduced animation complexity and frequency for better performance
const ANIMATION_CONFIG = {
  maxCoins: isMobile ? 3 : 6, // Reduced max coins for performance
  initialCoins: isMobile ? 1 : 2,
  generateInterval: isMobile ? 2000 : 1200, // Less frequent generation
  baseSize: isMobile ? 100 : 150,
  sizeVariation: isMobile ? 20 : 40,
  baseDuration: 3.5, // Slightly faster for responsiveness
  durationVariation: 2,
} as const;

const CoinRain: React.FC = React.memo(() => {
  const [coins, setCoins] = useState<Coin[]>([]);

  // Optimized: Memoized window dimensions to prevent recalculation
  const windowDimensions = useMemo(() => {
    if (typeof window === 'undefined') {
      return { height: 800, width: 1200 };
    }
    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }, []);

  // Optimized: Memoized coin generation function
  const generateCoin = useCallback(() => {
    const config = COIN_CONFIGS[Math.floor(Math.random() * COIN_CONFIGS.length)];
    const newCoin: Coin = {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      delay: 0,
      duration: ANIMATION_CONFIG.baseDuration + Math.random() * ANIMATION_CONFIG.durationVariation,
      size: ANIMATION_CONFIG.baseSize + Math.random() * ANIMATION_CONFIG.sizeVariation,
      image: config.image,
      direction: config.direction,
      speed: 0.8 + Math.random() * 0.4,
    };
    
    setCoins(prev => {
      // Optimized: Limit max coins to prevent memory bloat
      if (prev.length >= ANIMATION_CONFIG.maxCoins) {
        return [...prev.slice(1), newCoin];
      }
      return [...prev, newCoin];
    });
    
    // Optimized: Single timeout for cleanup
    setTimeout(() => {
      setCoins(prev => prev.filter(coin => coin.id !== newCoin.id));
    }, (newCoin.duration + 0.5) * 1000);
  }, []);

  useEffect(() => {
    // Generate initial coins with staggered timing
    for (let i = 0; i < ANIMATION_CONFIG.initialCoins; i++) {
      setTimeout(() => generateCoin(), i * 500);
    }

    // Optimized: Single interval instead of recursive timeouts
    const interval = setInterval(generateCoin, ANIMATION_CONFIG.generateInterval);

    return () => {
      clearInterval(interval);
    };
  }, [generateCoin]);

  // Optimized: Memoized coin rendering with reduced complexity
  const renderedCoins = useMemo(() => {
    return coins.map((coin) => {
      const radians = (coin.direction * Math.PI) / 180;
      const horizontalDistance = Math.sin(radians) * (windowDimensions.height + 200);
      
      return (
        <motion.div
          key={coin.id}
          className="absolute coin-container"
          style={{
            left: `${coin.x}%`,
            width: `${coin.size}px`,
            height: `${coin.size}px`,
            zIndex: Math.floor(Math.random() * 10) + 10, // Reduced z-index range for performance
            willChange: 'transform', // Optimized: GPU acceleration hint
          }}
          initial={{ 
            y: -coin.size - 50,
            x: 0,
            opacity: 0,
          }}
          animate={{ 
            y: windowDimensions.height + coin.size + 50,
            x: horizontalDistance,
            opacity: [0, 1, 1, 0], // Simplified opacity animation
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: coin.duration,
            ease: "linear",
            times: [0, 0.1, 0.9, 1], // Simplified timing for better performance
          }}
        >
          <img 
            src={coin.image}
            alt="HubsAI Coin"
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.6)) brightness(0.85)', // Simplified filter for performance
              imageRendering: 'crisp-edges',
            }}
            loading="lazy"
            decoding="async" // Optimized: Async image decoding
          />
        </motion.div>
      );
    });
  }, [coins, windowDimensions]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {renderedCoins}
      </AnimatePresence>
    </div>
  );
});

CoinRain.displayName = 'CoinRain';

export default CoinRain;