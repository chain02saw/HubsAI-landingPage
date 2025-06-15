import React from 'react';
import type { FC, ReactNode } from 'react';
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo } from 'react';

// Import styles
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Use environment variable for RPC endpoint with fallback
  const endpoint = useMemo(() => {
    return process.env.REACT_APP_SOLANA_RPC_URL || clusterApiUrl('mainnet-beta');
  }, []);

  // Memoize wallets array
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter()
  ], []);

  // Handle connection errors
  const onError = (error: any) => {
    console.error('Wallet connection error:', error);
    // You can add custom error handling here
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider 
        wallets={wallets} 
        autoConnect={true}
        onError={onError}
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;