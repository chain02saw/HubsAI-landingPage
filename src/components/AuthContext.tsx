import React, { createContext, useContext, useEffect, useState } from 'react';
import { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  createClaimWallet: () => Promise<string | null>;
  getClaimWallet: () => string | null;
  claimWalletAddress: string | null;
  hasCompletedWalletSetup: boolean;
  setWalletSetupComplete: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [claimWalletAddress, setClaimWalletAddress] = useState<string | null>(null);
  const [hasCompletedWalletSetup, setHasCompletedWalletSetup] = useState(false);

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem('hubsai_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Load claim wallet
      const walletAddress = getClaimWallet();
      setClaimWalletAddress(walletAddress);
      
      // Check wallet setup status
      const setupComplete = localStorage.getItem(`wallet_setup_${userData.id}`);
      setHasCompletedWalletSetup(!!setupComplete);
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('hubsai_users') || '[]');
      const userExists = existingUsers.find((u: any) => u.email === email);
      
      if (userExists) {
        return { success: false, error: 'User with this email already exists' };
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date().toISOString()
      };

      // Save user credentials (in real app, hash the password)
      const userCredentials = {
        ...newUser,
        password // Note: In production, hash this password
      };

      // Save to localStorage
      existingUsers.push(userCredentials);
      localStorage.setItem('hubsai_users', JSON.stringify(existingUsers));
      localStorage.setItem('hubsai_user', JSON.stringify(newUser));
      
      setUser(newUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to create account' };
    }
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('hubsai_users') || '[]');
      const user = existingUsers.find((u: any) => u.email === email && u.password === password);
      
      if (!user) {
        return { success: false, error: 'Invalid email or password' };
      }

      const userData: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
      };

      localStorage.setItem('hubsai_user', JSON.stringify(userData));
      setUser(userData);
      
      // Load claim wallet if exists
      const walletAddress = getClaimWallet();
      setClaimWalletAddress(walletAddress);
      
      // Check wallet setup status
      const setupComplete = localStorage.getItem(`wallet_setup_${userData.id}`);
      setHasCompletedWalletSetup(!!setupComplete);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to sign in' };
    }
  };

  const signOut = () => {
    localStorage.removeItem('hubsai_user');
    setUser(null);
    setClaimWalletAddress(null);
    setHasCompletedWalletSetup(false);
  };

  const createClaimWallet = async (): Promise<string | null> => {
    if (!user) return null;

    try {
      // Generate a new mnemonic
      const mnemonic = bip39.generateMnemonic();
      
      // Create Solana keypair from mnemonic
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const keypair = Keypair.fromSeed(seed.slice(0, 32));
      
      // Store wallet data
      const walletData = {
        address: keypair.publicKey.toBase58(),
        privateKey: Buffer.from(keypair.secretKey).toString('base64'), // In production, encrypt this
        mnemonic, // In production, encrypt this
        userId: user.id,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem(`claim_wallet_${user.id}`, JSON.stringify(walletData));
      
      const address = keypair.publicKey.toBase58();
      setClaimWalletAddress(address);
      return address;
    } catch (error) {
      console.error('Error creating claim wallet:', error);
      return null;
    }
  };

  const getClaimWallet = (): string | null => {
    if (!user) return null;

    try {
      const stored = localStorage.getItem(`claim_wallet_${user.id}`);
      if (!stored) return null;
      
      const walletData = JSON.parse(stored);
      return walletData.address;
    } catch (error) {
      console.error('Error getting claim wallet:', error);
      return null;
    }
  };

  const setWalletSetupComplete = () => {
    if (user) {
      localStorage.setItem(`wallet_setup_${user.id}`, 'true');
      setHasCompletedWalletSetup(true);
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    createClaimWallet,
    getClaimWallet,
    claimWalletAddress,
    hasCompletedWalletSetup,
    setWalletSetupComplete,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};