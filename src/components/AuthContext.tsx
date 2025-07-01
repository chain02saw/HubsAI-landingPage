import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';
interface User {
id: string;
email: string;
name: string;
createdAt: string;
shopifyOrderId?: string;
shopifyOrderData?: any;
}
interface AuthResult {
success: boolean;
error?: string;
user?: User;
}
interface ShopifyOrder {
id: string;
email: string;
customerName: string;
orderNumber: string;
totalPrice: string;
lineItems: Array<{
id: string;
name: string;
quantity: number;
nftEligible?: boolean;
value?: string;
}>;
createdAt: string;
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
lookupShopifyOrder: (email: string) => Promise<ShopifyOrder | null>;
shopifyOrder: ShopifyOrder | null;
trackEvent: (eventName: string, properties?: any) => void;
}
const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => {
const context = useContext(AuthContext);
if (!context) {
throw new Error('useAuth must be used within an AuthProvider');
}
return context;
};
// Mock Shopify orders for demo - replace with real API
const MOCK_SHOPIFY_ORDERS: ShopifyOrder[] = [
{
id: 'order_001',
email: 'test@example.com',
customerName: 'John Doe',
orderNumber: '#1001',
totalPrice: '$299.99',
lineItems: [
{
id: 'item_001',
name: 'HubsAI Genesis NFT Package',
quantity: 1,
nftEligible: true,
value: '$299.99'
}
],
createdAt: '2024-01-15T10:00:00Z'
},
{
id: 'order_002',
email: 'demo@hubsai.io',
customerName: 'Jane Smith',
orderNumber: '#1002',
totalPrice: '$199.99',
lineItems: [
{
id: 'item_002',
name: 'HubsAI Starter Pack',
quantity: 1,
nftEligible: true,
value: '$199.99'
}
],
createdAt: '2024-01-20T14:30:00Z'
},
{
id: 'order_003',
email: 'user@test.com',
customerName: 'Alex Johnson',
orderNumber: '#1003',
totalPrice: '$499.99',
lineItems: [
{
id: 'item_003',
name: 'HubsAI Premium Collection',
quantity: 1,
nftEligible: true,
value: '$499.99'
},
{
id: 'item_004',
name: 'HubsAI Rare Item',
quantity: 1,
nftEligible: true,
value: '$299.99'
}
],
createdAt: '2024-02-01T16:45:00Z'
}
];
export const AuthProvider: React.FC<{ children: React.ReactNode }> = React.memo(({ children }) => {
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);
const [claimWalletAddress, setClaimWalletAddress] = useState<string | null>(null);
const [hasCompletedWalletSetup, setHasCompletedWalletSetup] = useState(false);
const [shopifyOrder, setShopifyOrder] = useState<ShopifyOrder | null>(null);
// Tracking function
const trackEvent = useCallback((eventName: string, properties: any = {}) => {
console.log('🔥 Tracking Event:', eventName, properties);
// Add to window.gtag if available
if (typeof window !== 'undefined' && (window as any).gtag) {
  (window as any).gtag('event', eventName, properties);
}

// Store in localStorage for demo
try {
  const events = JSON.parse(localStorage.getItem('hubsai_events') || '[]');
  events.push({
    event: eventName,
    properties,
    timestamp: new Date().toISOString(),
    userId: user?.id
  });
  localStorage.setItem('hubsai_events', JSON.stringify(events));
} catch (error) {
  console.error('Failed to store event:', error);
}
}, [user?.id]);
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
  trackEvent('wallet_creation_started');
  
  const mnemonic = bip39.generateMnemonic();
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const keypair = Keypair.fromSeed(seed.slice(0, 32));
  
  const walletData = {
    address: keypair.publicKey.toBase58(),
    privateKey: Buffer.from(keypair.secretKey).toString('base64'),
    mnemonic,
    userId: user.id,
    createdAt: new Date().toISOString()
  };
  
  localStorage.setItem(`claim_wallet_${user.id}`, JSON.stringify(walletData));
  
  const address = keypair.publicKey.toBase58();
  setClaimWalletAddress(address);
  
  trackEvent('wallet_created', { address, userId: user.id });
  return address;
} catch (error:any) {
  console.error('Error creating claim wallet:', error);
  trackEvent('wallet_creation_failed', { error: error.message });
  return null;
}
}, [user, trackEvent]);
const lookupShopifyOrder = useCallback(async (email: string): Promise<ShopifyOrder | null> => {
try {
trackEvent('shopify_lookup_started', { email });
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const order = MOCK_SHOPIFY_ORDERS.find(order => 
    order.email.toLowerCase() === email.toLowerCase()
  );
  
  if (order) {
    setShopifyOrder(order);
    trackEvent('shopify_order_found', { 
      orderNumber: order.orderNumber,
      email,
      nftEligible: order.lineItems.some(item => item.nftEligible),
      orderValue: order.totalPrice
    });
  } else {
    trackEvent('shopify_order_not_found', { email });
  }
  
  return order || null;
} catch (error:any) {
  console.error('Error looking up Shopify order:', error);
  trackEvent('shopify_lookup_failed', { email, error: error.message });
  return null;
}
}, [trackEvent]);
const signUp = useCallback(async (email: string, password: string, name: string): Promise<AuthResult> => {
try {
trackEvent('signup_started', { email });
  const existingUsers = getStoredUsers();
  const userExists = existingUsers.find((u: any) => u.email === email);
  
  if (userExists) {
    trackEvent('signup_failed', { email, reason: 'user_exists' });
    return { success: false, error: 'User with this email already exists' };
  }

  // Look up Shopify order
  const order = await lookupShopifyOrder(email);

  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    createdAt: new Date().toISOString(),
    shopifyOrderId: order?.id,
    shopifyOrderData: order
  };

  const userCredentials = { ...newUser, password };
  const updatedUsers = [...existingUsers, userCredentials];
  saveStoredUsers(updatedUsers);
  
  localStorage.setItem('hubsai_user', JSON.stringify(newUser));
  
  setUser(newUser);
  setHasCompletedWalletSetup(false);
  setClaimWalletAddress(null);
  
  trackEvent('signup_completed', { 
    userId: newUser.id,
    email,
    hasShopifyOrder: !!order
  });
  
  return { success: true, user: newUser };
} catch (error:any) {
  console.error('Sign up error:', error);
  trackEvent('signup_failed', { email, error: error.message });
  return { success: false, error: 'Failed to create account' };
}
}, [getStoredUsers, saveStoredUsers, lookupShopifyOrder, trackEvent]);
const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
try {
trackEvent('signin_started', { email });
  const existingUsers = getStoredUsers();
  const foundUser = existingUsers.find((u: any) => u.email === email && u.password === password);
  
  if (!foundUser) {
    trackEvent('signin_failed', { email, reason: 'invalid_credentials' });
    return { success: false, error: 'Invalid email or password' };
  }

  const userData: User = {
    id: foundUser.id,
    email: foundUser.email,
    name: foundUser.name,
    createdAt: foundUser.createdAt,
    shopifyOrderId: foundUser.shopifyOrderId,
    shopifyOrderData: foundUser.shopifyOrderData
  };

  localStorage.setItem('hubsai_user', JSON.stringify(userData));
  setUser(userData);
  
  // Load existing data
  const walletAddress = getClaimWallet(userData.id);
  setClaimWalletAddress(walletAddress);
  
  if (userData.shopifyOrderData) {
    setShopifyOrder(userData.shopifyOrderData);
  }
  
  try {
    const setupComplete = localStorage.getItem(`wallet_setup_${userData.id}`);
    setHasCompletedWalletSetup(!!setupComplete);
  } catch (error) {
    console.error('Failed to check wallet setup:', error);
    setHasCompletedWalletSetup(false);
  }
  
  trackEvent('signin_completed', { 
    userId: userData.id,
    email,
    hasShopifyOrder: !!userData.shopifyOrderData
  });
  
  return { success: true, user: userData };
} catch (error:any) {
  console.error('Sign in error:', error);
  trackEvent('signin_failed', { email, error: error.message });
  return { success: false, error: 'Failed to sign in' };
}
}, [getStoredUsers, getClaimWallet, trackEvent]);
const signOut = useCallback(() => {
trackEvent('signout', { userId: user?.id });
try {
  localStorage.removeItem('hubsai_user');
} catch (error) {
  console.error('Failed to remove user from localStorage:', error);
}

setUser(null);
setClaimWalletAddress(null);
setHasCompletedWalletSetup(false);
setShopifyOrder(null);
}, [user?.id, trackEvent]);
const setWalletSetupComplete = useCallback(() => {
if (user) {
try {
localStorage.setItem(`wallet_setup_${user.id}`, 'true');
setHasCompletedWalletSetup(true);
trackEvent('wallet_setup_completed', { userId: user.id });
} catch (error) {
console.error('Failed to save wallet setup status:', error);
}
}
}, [user, trackEvent]);
// Load user data on mount
useEffect(() => {
const loadUserData = async () => {
try {
const savedUser = localStorage.getItem('hubsai_user');
if (savedUser) {
const userData = JSON.parse(savedUser);
setUser(userData);
      const walletAddress = getClaimWallet(userData.id);
      setClaimWalletAddress(walletAddress);
      
      if (userData.shopifyOrderData) {
        setShopifyOrder(userData.shopifyOrderData);
      }
      
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
lookupShopifyOrder,
shopifyOrder,
trackEvent,
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
lookupShopifyOrder,
shopifyOrder,
trackEvent,
]);
return (
<AuthContext.Provider value={value}>
{children}
</AuthContext.Provider>
);
});
AuthProvider.displayName = 'AuthProvider';
export default AuthProvider;