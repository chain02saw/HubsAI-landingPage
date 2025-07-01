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

const BASE_ANIMATION_CONFIG = {
  maxCoins: isMobile ? 3 : 6,
  initialCoins: isMobile ? 1 : 2,
  generateInterval: isMobile ? 2000 : 1200,
  baseSize: isMobile ? 100 : 150,
  sizeVariation: isMobile ? 20 : 40,
  baseDuration: 3.5,
  durationVariation: 2,
} as const;

const ENHANCED_ANIMATION_CONFIG = {
  maxCoins: isMobile ? 30 : 60, 
  initialCoins: isMobile ? 5 : 10, 
  generateInterval: isMobile ? 200 : 120, 
  baseSize: isMobile ? 80 : 120, 
  sizeVariation: isMobile ? 30 : 50,
  baseDuration: 3, 
  durationVariation: 2,
} as const;

const CoinRain: React.FC = React.memo(() => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const [, setTimeElapsed] = useState(0);

  const currentConfig = useMemo(() => {
    return isEnhanced ? ENHANCED_ANIMATION_CONFIG : BASE_ANIMATION_CONFIG;
  }, [isEnhanced]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        const newTime = prev + 1;
        if (newTime >= 600 && !isEnhanced) {
          setIsEnhanced(true);
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isEnhanced]);

  const windowDimensions = useMemo(() => {
    if (typeof window === 'undefined') {
      return { height: 800, width: 1200 };
    }
    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }, []);

  // Enhanced coin generation function with dynamic configuration
  const generateCoin = useCallback(() => {
    const config = COIN_CONFIGS[Math.floor(Math.random() * COIN_CONFIGS.length)];
    const newCoin: Coin = {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      delay: 0,
      duration: currentConfig.baseDuration + Math.random() * currentConfig.durationVariation,
      size: currentConfig.baseSize + Math.random() * currentConfig.sizeVariation,
      image: config.image,
      direction: config.direction,
      speed: 0.8 + Math.random() * 0.4,
    };
    
    setCoins(prev => {
      if (prev.length >= currentConfig.maxCoins) {
        const removeCount = isEnhanced ? 3 : 1;
        return [...prev.slice(removeCount), newCoin];
      }
      return [...prev, newCoin];
    });
    
    setTimeout(() => {
      setCoins(prev => prev.filter(coin => coin.id !== newCoin.id));
    }, (newCoin.duration + 0.5) * 1000);
  }, [currentConfig, isEnhanced]);

  const generateCoinBurst = useCallback(() => {
    if (isEnhanced) {
      const burstCount = isMobile ? 3 : 5;
      for (let i = 0; i < burstCount; i++) {
        setTimeout(() => generateCoin(), i * 50); 
      }
    } else {
      generateCoin();
    }
  }, [generateCoin, isEnhanced]);

  useEffect(() => {
    for (let i = 0; i < currentConfig.initialCoins; i++) {
      setTimeout(() => generateCoin(), i * 300);
    }
    const interval = setInterval(generateCoinBurst, currentConfig.generateInterval);

    return () => {
      clearInterval(interval);
    };
  }, [currentConfig, generateCoin, generateCoinBurst]);

  useEffect(() => {
    if (isEnhanced) {
      console.log('🎉 Creating enhancement burst!');
      const enhancementBurst = () => {
        for (let i = 0; i < (isMobile ? 8 : 15); i++) {
          setTimeout(() => generateCoin(), i * 100);
        }
      };
      
      setTimeout(enhancementBurst, 500);
    }
  }, [isEnhanced, generateCoin]);

  const renderedCoins = useMemo(() => {
    return coins.map((coin) => {
      const radians = (coin.direction * Math.PI) / 180;
      const horizontalDistance = Math.sin(radians) * (windowDimensions.height + 200);
      
      const enhancedStyle = isEnhanced ? {
        filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) brightness(1.1) saturate(1.3)',
        animation: 'pulse 1s ease-in-out infinite',
      } : {
        filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.6)) brightness(0.85)',
      };
      
      return (
        <motion.div
          key={coin.id}
          className="absolute coin-container"
          style={{
            left: `${coin.x}%`,
            width: `${coin.size}px`,
            height: `${coin.size}px`,
            zIndex: Math.floor(Math.random() * 10) + 10,
            willChange: 'transform',
          }}
          initial={{ 
            y: -coin.size - 50,
            x: 0,
            opacity: 0,
            scale: isEnhanced ? 0.8 : 1, 
          }}
          animate={{ 
            y: windowDimensions.height + coin.size + 50,
            x: horizontalDistance,
            opacity: [0, 1, 1, 0],
            scale: isEnhanced ? [0.8, 1.1, 1, 0.9] : 1, 
            rotate: isEnhanced ? [0, 360] : 0, 
          }}
          exit={{ 
            opacity: 0,
            scale: 0.5,
          }}
          transition={{
            duration: coin.duration,
            ease: isEnhanced ? "easeInOut" : "linear",
            times: isEnhanced ? [0, 0.1, 0.8, 1] : [0, 0.1, 0.9, 1],
            rotate: isEnhanced ? { duration: coin.duration * 0.8, ease: "linear" } : undefined,
          }}
        >
          <img 
            src={coin.image}
            alt="HubsAI Coin"
            className="w-full h-full object-contain"
            style={{
              ...enhancedStyle,
              imageRendering: 'crisp-edges',
            }}
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      );
    });
  }, [coins, windowDimensions, isEnhanced]);

 

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {renderedCoins}
        </AnimatePresence>
      </div>
      {isEnhanced && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-5"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.1, 0],
            background: [
              'radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0) 0%, rgba(255, 215, 0, 0.1) 50%, rgba(255, 215, 0, 0) 100%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.05) 50%, rgba(255, 215, 0, 0) 100%)',
              'radial-gradient(circle at 40% 60%, rgba(255, 215, 0, 0) 0%, rgba(255, 215, 0, 0.1) 50%, rgba(255, 215, 0, 0) 100%)',
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </>
  );
});

CoinRain.displayName = 'CoinRain';

export default CoinRain;