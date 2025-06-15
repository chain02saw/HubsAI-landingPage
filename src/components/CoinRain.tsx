import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Coin {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  image: string;
  direction: number; // angle in degrees
  speed: number;
}

// Coin configurations based on your images
const coinConfigs = [
  {
    image: '/src/assets/da96e76291dadfbf968703182c2fcd821df9ece1.png',
    direction: -30, // +30 degrees from vertical
  },
  {
    image: '/src/assets/thumb_Coins 5 copy.png', 
    direction: -30, // +30 degrees from vertical
  },
  {
    image: '/src/assets/thumb_Coins 2.png',
    direction: 30, // -30 degrees from vertical
  },
  {
    image: '/src/assets/thumb_Coins 4 copy.png',
    direction: 0, // straight down (plumb)
  }
];

const CoinRain: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const generateCoin = () => {
      const config = coinConfigs[Math.floor(Math.random() * coinConfigs.length)];
      const newCoin: Coin = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100, // Random horizontal start position
        delay: 0,
        duration: 4 + Math.random() * 3, // Random duration between 4-7 seconds
        size: 150 + Math.random() * 40, // Random size between 60-100px
        image: config.image,
        direction: config.direction,
        speed: 0.8 + Math.random() * 0.4, // Random speed multiplier
      };
      
      setCoins(prev => [...prev, newCoin]);
      
      // Remove coin after animation completes with fade
      setTimeout(() => {
        setCoins(prev => prev.filter(coin => coin.id !== newCoin.id));
      }, (newCoin.duration + 0.5) * 1000);
    };

    // Generate initial spread of coins
    for (let i = 0; i < 12; i++) {
      setTimeout(() => generateCoin(), i * 300);
    }

    // Continuously generate new coins at random intervals
    const generateRandomCoin = () => {
      generateCoin();
      const nextDelay = 500 + Math.random() * 1000; // Random interval 0.5-1.5s
      setTimeout(generateRandomCoin, nextDelay);
    };

    const initialTimeout = setTimeout(generateRandomCoin, 2000);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {coins.map((coin) => {
          // Calculate movement based on direction
          const radians = (coin.direction * Math.PI) / 180;
          const horizontalDistance = Math.sin(radians) * (window.innerHeight + 200);
          
          return (
            <motion.div
              key={coin.id}
              className="absolute coin-container"
              style={{
                left: `${coin.x}%`,
                width: `${coin.size}px`,
                height: `${coin.size}px`,
                zIndex: Math.floor(Math.random() * 100),
              }}
              initial={{ 
                y: -coin.size - 50,
                x: 0,
                opacity: 0,
              }}
              animate={{ 
                y: window.innerHeight + coin.size + 50,
                x: horizontalDistance,
                opacity: [0, 1, 1, 1, 0], // Fade in at start, fade out at end
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: coin.duration,
                ease: "linear",
                times: [0, 0.05, 0.85, 0.95, 1], // Quick fade in, long visible, quick fade out
              }}
            >
              <img 
                src={coin.image}
                alt="HubsAI Coin"
                className="w-full h-full object-contain"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8)) brightness(1.2) saturate(1.1)',
                  imageRendering: 'crisp-edges',
                }}
                loading="lazy"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CoinRain;