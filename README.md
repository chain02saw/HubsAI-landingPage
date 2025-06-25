# HubsAI Complete Onboarding System

A comprehensive 6-step onboarding flow for the HubsAI platform, including user authentication, wallet setup, profile creation, and a full dashboard experience.

## 🚀 Project Structure

```
src/
├── components/
│   ├── onboarding/
│   │   ├── OnboardingFlow.tsx          # Main orchestrator component
│   │   ├── steps/
│   │   │   ├── LoginStep.tsx           # Step 1: Email/Auth
│   │   │   ├── ClaimWalletStep.tsx     # Step 2: Claim Wallet
│   │   │   ├── ConnectWalletStep.tsx   # Step 3: External Wallet
│   │   │   ├── ProfileSetupStep.tsx    # Step 4: Profile Creation
│   │   │   ├── CommunitySummaryStep.tsx # Step 5: Summary
│   │   │   └── index.ts                # Export all steps
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx           # Step 6: Main Dashboard
│   │   │   ├── NFTVault.tsx           # NFT management
│   │   │   ├── Settings.tsx           # User settings
│   │   │   ├── ComingSoon.tsx         # Placeholder components
│   │   │   └── index.ts               # Export dashboard components
│   │   └── index.ts                   # Export OnboardingFlow
│   ├── AuthContext.tsx                # Enhanced authentication context
│   ├── Header.tsx                     # Updated with dashboard integration
│   ├── Hero.tsx                       # Updated with onboarding trigger
│   └── ... (existing components)
└── App.tsx                           # Main application setup
```

## 📋 Implementation Steps

### 1. Install Dependencies

First, ensure you have all necessary dependencies:

```bash
npm install @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets @solana/web3.js framer-motion bip39
npm install --save-dev @types/bip39
```

### 2. Create Directory Structure

```bash
mkdir -p src/components/onboarding/steps
mkdir -p src/components/onboarding/dashboard
```

### 3. Add Component Files

Copy all the provided component files into their respective directories:

#### Core Components:
- `OnboardingFlow.tsx` → `src/components/onboarding/`
- `LoginStep.tsx` → `src/components/onboarding/steps/`
- `ClaimWalletStep.tsx` → `src/components/onboarding/steps/`
- `ConnectWalletStep.tsx` → `src/components/onboarding/steps/`
- `ProfileSetupStep.tsx` → `src/components/onboarding/steps/`
- `CommunitySummaryStep.tsx` → `src/components/onboarding/steps/`

#### Dashboard Components:
- `Dashboard.tsx` → `src/components/onboarding/dashboard/`
- `NFTVault.tsx` → `src/components/onboarding/dashboard/`
- `Settings.tsx` → `src/components/onboarding/dashboard/`
- `ComingSoon.tsx` → `src/components/onboarding/dashboard/`

#### Index Files:
- `index.ts` files for proper exports

#### Updated Core Files:
- Replace `AuthContext.tsx`
- Replace `Header.tsx`
- Replace `Hero.tsx`
- Replace `App.tsx`

### 4. Environment Setup

Create or update your `.env` file:

```bash
REACT_APP_SOLANA_RPC_URL=https://twilight-dry-mountain.solana-mainnet.quiknode.pro/017a2f3e43e29982f440bbcf3b8b990f2757bbdf/
```

### 5. CSS Updates

Add these styles to your global CSS file:

```css
/* Glassmorphism styles */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Glow text effect */
.glow-text {
  background: linear-gradient(45deg, #14b8a6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(20, 184, 166, 0.5);
}

/* Animation for hero section */
@keyframes glow-pulse {
  0%, 100% { text-shadow: 0 0 80px rgba(255, 215, 0, 0.9); }
  50% { text-shadow: 0 0 100px rgba(255, 215, 0, 1); }
}

/* Dark theme colors */
.bg-dark-950 { background-color: #0a0a0a; }
.bg-dark-900 { background-color: #1a1a1a; }

/* Primary colors */
.bg-primary-500 { background-color: #14b8a6; }
.bg-primary-600 { background-color: #0d9488; }
.text-primary-400 { color: #2dd4bf; }
.text-primary-500 { color: #14b8a6; }
```

## 🎯 Features

### 6-Step Onboarding Flow:

1. **Email Login/Auth** - User registration and authentication
2. **Claim Wallet** - Email-linked Solana wallet creation (optional)
3. **Connect External Wallet** - Integration with Phantom, Backpack, etc. (optional)
4. **Profile Setup** - User information collection
5. **Community Summary** - NFT and brand rewards preview
6. **Dashboard** - Full management interface

### Dashboard Features:

- **NFT Vault**: View, stake, and manage NFT collection
- **Settings**: Profile management and wallet connections
- **Coming Soon**: Placeholders for Activity Feed, Referrals, Marketplace

### Key Integrations:

- **Solana Wallet Adapter**: Full wallet connection support
- **LocalStorage Persistence**: User data and wallet management
- **Framer Motion**: Smooth animations throughout
- **Responsive Design**: Mobile and desktop optimized

## 🔧 Configuration

### Wallet Setup

The system supports both:
- **Claim Wallets**: Email-linked wallets for beginners
- **External Wallets**: Phantom, Backpack, Solflare, etc.

### Data Persistence

User data is stored in localStorage:
- User profiles: `hubsai_user`
- User credentials: `hubsai_users`
- Claim wallets: `claim_wallet_{userId}`
- Setup status: `wallet_setup_{userId}`

### Customization

Key areas for customization:
- Branding colors in CSS variables
- Mock NFT data in dashboard components
- Brand partnerships in community summary
- RPC endpoints in environment variables

## 🚀 Usage

### Starting the Onboarding Flow

Users can trigger onboarding by:
1. Clicking "Join the Airdrop" button (non-authenticated users)
2. Automatic trigger for new users without completed setup
3. Manual trigger from Profile button in header

### Navigation Flow

```
Landing Page → Onboarding (6 steps) → Dashboard
     ↑                                    ↓
     ←-------- Back to Landing ←----------
```

### User States

- **Anonymous**: Can view landing page, trigger onboarding
- **Authenticated**: Access to full dashboard and features
- **Setup Incomplete**: Prompted to complete onboarding

## 🎨 Design System

### Color Palette

- **Primary**: Teal (#14b8a6)
- **Secondary**: Yellow/Gold (#fbbf24)
- **Background**: Dark (#0a0a0a, #1a1a1a)
- **Accent**: White with opacity variants

### Components

- **Glass Morphism**: Transparent backgrounds with blur
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Mobile-first design approach

## 🔒 Security Notes

**Important**: This implementation uses localStorage for demonstration. In production:

1. **Encrypt sensitive data** (private keys, mnemonics)
2. **Use secure backend storage** for user credentials
3. **Implement proper password hashing**
4. **Add rate limiting** for authentication attempts
5. **Use HTTPS** for all communications

## 📱 Mobile Optimization

The system is fully responsive with:
- Touch-friendly interface elements
- Mobile-optimized animations
- Responsive grid layouts
- Mobile wallet integration

## 🛠 Development

### Running the Project

```bash
npm start
```

### Building for Production

```bash
npm run build
```

### Testing

Test the onboarding flow by:
1. Creating new accounts
2. Testing both wallet types
3. Verifying dashboard functionality
4. Testing mobile responsiveness

## 🎉 Conclusion

This complete onboarding system provides a production-ready foundation for the HubsAI platform. The modular architecture makes it easy to extend and customize for specific needs while maintaining a consistent user experience throughout the journey.

For questions or customizations, refer to the individual component documentation within each file.