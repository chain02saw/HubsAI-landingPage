// src/components/Hero.tsx - Enhanced with better CTA flow
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from '@solana/web3.js';
import { useAuth } from './AuthContext';
import { OnboardingFlow } from './onboarding/OnboardingFlow';

const Hero: React.FC = () => {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { connected, publicKey, wallet } = useWallet();
  const { user, claimWalletAddress, hasCompletedWalletSetup } = useAuth();

  const handleJoinAirdrop = useCallback(() => {
    if (user && hasCompletedWalletSetup) {
      // User is fully set up, redirect to community site
      window.open('https://community.hubsai.io/', '_blank');
    } else if (user && !hasCompletedWalletSetup) {
      // User exists but hasn't completed setup, continue onboarding
      console.log('Opening onboarding to complete setup...');
      setOnboardingOpen(true);
    } else {
      // User is not logged in, start full onboarding flow
      console.log('Opening onboarding from Hero...');
      setOnboardingOpen(true);
    }
  }, [user, hasCompletedWalletSetup]);

  // Optimized: Memoized close handler to prevent recreation
  const handleOnboardingClose = useCallback(() => {
    console.log('Closing onboarding from Hero...');
    setOnboardingOpen(false);
  }, []);

  // Optimized: Memoized complete handler
  const handleOnboardingComplete = useCallback(() => {
    console.log('Onboarding completed from Hero...');
    setOnboardingOpen(false);
    // Show success message or redirect as needed
  }, []);

  // Get appropriate button text based on user state
  const getButtonText = () => {
    if (user && hasCompletedWalletSetup) {
      return 'Claim Your Airdrop';
    } else if (user && !hasCompletedWalletSetup) {
      return 'Complete Setup & Claim';
    } else {
      return 'Join the Airdrop';
    }
  };

  // Get button styling based on user state
  const getButtonStyle = () => {
    if (user && hasCompletedWalletSetup) {
      return 'btn btn-gold btn-xl';
    } else {
      return 'btn btn-primary btn-xl';
    }
  };
  
  useEffect(() => {
    if (connected && publicKey) {
      console.log("Wallet connected. Fetching balances...");
  
      const logWalletAssets = async () => {
        const connection = new Connection("https://twilight-dry-mountain.solana-mainnet.quiknode.pro/017a2f3e43e29982f440bbcf3b8b990f2757bbdf/");
  
        if (!publicKey) return;
  
        try {
          const solBalance = await connection.getBalance(publicKey);
          console.log(`💰 SOL Balance: ${(solBalance / 1e9).toFixed(4)} SOL`);
  
          const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
            programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
          });
  
          console.log("🎯 SPL Tokens:");
          tokenAccounts.value.forEach(({ account }) => {
            const info = account.data.parsed.info;
            const mint = info.mint;
            const amount = info.tokenAmount.uiAmount;
            if (amount > 0) {
              console.log(`- Mint: ${mint}, Amount: ${amount}`);
            }
          });
        } catch (error) {
          console.error("Error fetching wallet assets:", error);
        }
      };
  
      logWalletAssets();
    }
  }, [connected, publicKey]);
  
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-background"
          style={{
            backgroundImage: `url('/assets/background.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        />

        {/* Content Wrapper */}
        <div
          className="container px-6 text-center relative z-20 flex flex-col items-center justify-center"
          style={{
            transform: "translateY(-20vh)",
          }}
        >
          <motion.h1
            className="mb-6 tracking-wider text-yellow-400 uppercase text-xl sm:text-5xl mb-2 uppercase leading-none coming-soon-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            style={{
              fontSize: "clamp(3rem, 3vw, 3rem)",
              marginTop: "-2vh",
            }}
          >
            COMING SOON
          </motion.h1>

          {/* Meet HubsAI - Large white text */}
          <motion.h2
            className="text-4xl sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Meet <span className="glow-text">HubsAI</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-gray-200 mb-8 max-w-6xl leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              textShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
              textAlign: "center",
              marginTop: "-1vh",
            }}
          >
            The Future of Retail, Powered by RWA and AI
          </motion.p>

          {/* Wallet Status (if logged in) */}
          {user && (connected || claimWalletAddress) && (
            <motion.div
              className="mb-8 wallet-status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="wallet-status-icon"></div>
              <span>
                Wallet Connected: {
                  connected && publicKey 
                    ? `${wallet?.adapter.name} (${publicKey.toBase58().slice(0, 8)}...)`
                    : claimWalletAddress 
                      ? `Claim Wallet (${claimWalletAddress.slice(0, 8)}...)`
                      : ''
                }
              </span>
            </motion.div>
          )}

          {/* Enhanced CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex items-center justify-center"
            style={{
              marginTop: "-3vh",
            }}
          >
            <motion.button
              className={getButtonStyle()}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                padding: "clamp(1rem, 2.5vw, 1.25rem) clamp(2.5rem, 5vw, 3.5rem)",
                letterSpacing: "0.05em",
                position: "relative",
                overflow: "hidden",
              }}
              onClick={handleJoinAirdrop}
            >
              {/* Enhanced shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: isHovering ? "100%" : "-100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              
              {/* Button content */}
              <div className="relative flex items-center gap-3">
                <motion.span 
                  className="text-2xl"
                  animate={{ 
                    rotate: isHovering ? [0, -10, 10, 0] : 0,
                    scale: isHovering ? 1.1 : 1 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {user && hasCompletedWalletSetup ? '🎁' : '🚀'}
                </motion.span>
                <span>{getButtonText()}</span>
              </div>
            </motion.button>
          </motion.div>

          {/* User status messages */}
          {!user && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="mt-6"
            >
              <p className="text-gray-400 text-sm">
                New to HubsAI? Click above to create your account and claim your NFT rewards!
              </p>
            </motion.div>
          )}

          {user && !hasCompletedWalletSetup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="mt-6"
            >
              <p className="text-yellow-400 text-sm">
                Almost there! Complete your wallet setup to start earning rewards 💰
              </p>
            </motion.div>
          )}

          {user && hasCompletedWalletSetup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="mt-6 space-y-2"
            >
              <p className="text-primary-400 text-sm">
                Welcome back, {user.name}! Ready to claim your rewards? 🎉
              </p>
              <motion.p 
                className="text-gray-400 text-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                After claiming, visit your dashboard to start staking and earning
              </motion.p>
            </motion.div>
          )}

          {/* Quick Action Buttons for Completed Users */}
          {user && hasCompletedWalletSetup && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="mt-8 flex gap-4 justify-center"
            >
              <motion.button
                className="btn btn-secondary btn-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Navigate to dashboard - you might want to trigger this via a prop or context
                  console.log('Navigate to dashboard');
                }}
              >
                <span>⚡</span>
                <span>Go to Dashboard</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Onboarding Flow - Only triggered from Hero button click */}
      <OnboardingFlow 
        isOpen={onboardingOpen}
        onClose={handleOnboardingClose}
        onComplete={handleOnboardingComplete}
      />
    </>
  );
};

export default Hero;