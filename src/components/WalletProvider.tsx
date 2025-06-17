import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter,
  AlphaWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

interface SolanaWalletProviderProps {
  children: React.ReactNode;
}

export const SolanaWalletProvider: React.FC<SolanaWalletProviderProps> = ({ children }) => {
  // Use mainnet
  const network = WalletAdapterNetwork.Mainnet;
  
  // Use environment variable or fallback to your custom endpoint or default
  const endpoint = useMemo(() => {
    if (process.env.REACT_APP_RPC_ENDPOINT) {
      return process.env.REACT_APP_RPC_ENDPOINT;
    }
    
    if (network === WalletAdapterNetwork.Mainnet) {
      return "https://twilight-dry-mountain.solana-mainnet.quiknode.pro/017a2f3e43e29982f440bbcf3b8b990f2757bbdf/";
    }
    
    return clusterApiUrl(network);
  }, [network]);

  // Configure supported wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new AlphaWalletAdapter(),
      new LedgerWalletAdapter(),
      // Note: Backpack wallet is auto-detected by the wallet modal
      // No separate adapter needed - it will appear if the extension is installed
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};