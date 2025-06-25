// src/components/AuthContext.tsx - Optimized Version
import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
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

// Optimized: Memoized provider to prevent unnecessary re-renders
export const AuthProvider: React.FC<{ children: React.ReactNode }> = React.memo(({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [claimWalletAddress, setClaimWalletAddress] = useState<string | null>(null);
  const [hasCompletedWalletSetup, setHasCompletedWalletSetup] = useState(false);

  // Optimized: Memoized localStorage operations
  const getStoredUsers = useCallback((): any[] => {
    try {
      return JSON.parse(localStorage.getItem('hubsai_users') || '[]');
    } catch {
      return [];
    }
  }, []);

  const saveStoredUsers = useCallback((users: any[]) => {
    try {
      localStorage.setItem('hubsai_users', JSON.stringify(users));
    } catch (error) {
      console.error('Failed to save users:', error);
    }
  }, []);

  // Optimized: Memoized functions to prevent recreation
  const getClaimWallet = useCallback((userId?: string): string | null => {
    const targetUserId = userId || user?.id;
    if (!targetUserId) return null;

    try {
      const stored = localStorage.getItem(`claim_wallet_${targetUserId}`);
      if (!stored) return null;
      
      const walletData = JSON.parse(stored);
      return walletData.address;
    } catch (error) {
      console.error('Error getting claim wallet:', error);
      return null;
    }
  }, [user?.id]);

  const createClaimWallet = useCallback(async (): Promise<string | null> => {
    if (!user) return null;

    try {
      // Generate mnemonic and keypair
      const mnemonic = bip39.generateMnemonic();
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const keypair = Keypair.fromSeed(seed.slice(0, 32));
      
      // Prepare wallet data
      const walletData = {
        address: keypair.publicKey.toBase58(),
        privateKey: Buffer.from(keypair.secretKey).toString('base64'),
        mnemonic,
        userId: user.id,
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem(`claim_wallet_${user.id}`, JSON.stringify(walletData));
      
      const address = keypair.publicKey.toBase58();
      setClaimWalletAddress(address);
      return address;
    } catch (error) {
      console.error('Error creating claim wallet:', error);
      return null;
    }
  }, [user]);

  const signUp = useCallback(async (email: string, password: string, name: string): Promise<AuthResult> => {
    try {
      const existingUsers = getStoredUsers();
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

      const userCredentials = { ...newUser, password };

      // Optimized: Batch localStorage operations
      const updatedUsers = [...existingUsers, userCredentials];
      saveStoredUsers(updatedUsers);
      
      try {
        localStorage.setItem('hubsai_user', JSON.stringify(newUser));
      } catch (error) {
        console.error('Failed to save current user:', error);
      }
      
      setUser(newUser);
      setHasCompletedWalletSetup(false);
      setClaimWalletAddress(null);
      
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: 'Failed to create account' };
    }
  }, [getStoredUsers, saveStoredUsers]);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      const existingUsers = getStoredUsers();
      const foundUser = existingUsers.find((u: any) => u.email === email && u.password === password);
      
      if (!foundUser) {
        return { success: false, error: 'Invalid email or password' };
      }

      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        createdAt: foundUser.createdAt
      };

      try {
        localStorage.setItem('hubsai_user', JSON.stringify(userData));
      } catch (error) {
        console.error('Failed to save current user:', error);
      }
      
      setUser(userData);
      
      // Load wallet data
      const walletAddress = getClaimWallet(userData.id);
      setClaimWalletAddress(walletAddress);
      
      // Check wallet setup status
      try {
        const setupComplete = localStorage.getItem(`wallet_setup_${userData.id}`);
        setHasCompletedWalletSetup(!!setupComplete);
      } catch (error) {
        console.error('Failed to check wallet setup:', error);
        setHasCompletedWalletSetup(false);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'Failed to sign in' };
    }
  }, [getStoredUsers, getClaimWallet]);

  const signOut = useCallback(() => {
    try {
      localStorage.removeItem('hubsai_user');
    } catch (error) {
      console.error('Failed to remove user from localStorage:', error);
    }
    
    setUser(null);
    setClaimWalletAddress(null);
    setHasCompletedWalletSetup(false);
  }, []);

  const setWalletSetupComplete = useCallback(() => {
    if (user) {
      try {
        localStorage.setItem(`wallet_setup_${user.id}`, 'true');
        setHasCompletedWalletSetup(true);
      } catch (error) {
        console.error('Failed to save wallet setup status:', error);
      }
    }
  }, [user]);

  // Optimized: Load user data on mount with error handling
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedUser = localStorage.getItem('hubsai_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          
          // Load wallet address
          const walletAddress = getClaimWallet(userData.id);
          setClaimWalletAddress(walletAddress);
          
          // Check wallet setup status
          try {
            const setupComplete = localStorage.getItem(`wallet_setup_${userData.id}`);
            setHasCompletedWalletSetup(!!setupComplete);
          } catch (error) {
            console.error('Failed to check wallet setup:', error);
            setHasCompletedWalletSetup(false);
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Clear potentially corrupted data
        try {
          localStorage.removeItem('hubsai_user');
        } catch (clearError) {
          console.error('Failed to clear corrupted user data:', clearError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [getClaimWallet]);

  // Optimized: Memoized context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
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
  }), [
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
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
});

AuthProvider.displayName = 'AuthProvider';

export default AuthProvider;