import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
// import { Transaction, SystemProgram, Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

const Hero: React.FC = () => {
  const { setVisible } = useWalletModal();
  // const { connected, publicKey, wallet, sendTransaction } = useWallet();

  const handleJoinAirdrop = () => {
   
      // console.log("Wallet connected:", publicKey?.toBase58());
      
      // ✅ Redirect to community site
      window.open('https://community.hubsai.io/', '_blank');
      // Or use: window.location.href = 'https://community.hubsai.io/'; // Same tab
    
  };
  
  // useEffect(() => {
  //   if (connected) {
  //     console.log("Wallet connected. Fetching balances...");
  
  //     const logWalletAssets = async () => {
  //       const connection = new Connection("https://twilight-dry-mountain.solana-mainnet.quiknode.pro/017a2f3e43e29982f440bbcf3b8b990f2757bbdf/");
  
  //       if (!publicKey) return;
  
  //       const solBalance = await connection.getBalance(publicKey);
  //       console.log(`💰 SOL Balance: ${(solBalance / 1e9).toFixed(4)} SOL`);
  
  //       const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
  //         programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
  //       });
  
  //       console.log("🎯 SPL Tokens:");
  //       tokenAccounts.value.forEach(({ account }) => {
  //         const info = account.data.parsed.info;
  //         const mint = info.mint;
  //         const amount = info.tokenAmount.uiAmount;
  //         if (amount > 0) {
  //           console.log(`- Mint: ${mint}, Amount: ${amount}`);
  //         }
  //       });
  //     };
  
  //     logWalletAssets();
  //   }
  // }, [connected]);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
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
          className="mb-6 tracking-wider text-yellow-400 uppercase text-xl sm:text-5xl mb-2 uppercase leading-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={{
            fontSize: "clamp(3rem, 3vw, 3rem)",
            background:
              "linear-gradient(45deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #FF8C00 75%, #FFD700 100%)",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 80px rgba(255, 215, 0, 0.9)",
            animation: "glow-pulse 4s ease-in-out infinite",
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
          Meet <span>HubsAI</span>
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

        {/* CTA Button */}
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
            className="bg-teal-500/10 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base rounded-xl text-white border border-teal-300/50 hover:bg-gray-900 backdrop-blur-sm transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 60px rgba(20, 184, 166, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
              padding: "clamp(1rem, 2.5vw, 1.25rem) clamp(2.5rem, 5vw, 3.5rem)",
              letterSpacing: "0.05em",
            }}
            onClick={handleJoinAirdrop}
          >
            Join the Airdrop
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;