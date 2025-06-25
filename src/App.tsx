// src/App.tsx
import Header from './components/Header';
import Hero from './components/Hero';
import TokenizedLogistics from './components/TokenizedLogistics';
import Features from './components/Features';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CoinRain from './components/CoinRain';
import { AuthProvider } from './components/AuthContext';
import { SolanaWalletProvider } from './components/WalletProvider';

function App() {
  return (
    <AuthProvider>
      <SolanaWalletProvider>
        <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden">
          {/* Animated coin rain background */}
          <CoinRain />
          
          {/* Header with navigation and onboarding integration */}
          <Header />
          
          {/* Main content */}
          <main>
            {/* Hero section with onboarding trigger */}
            <Hero />
            
            {/* Existing sections */}
            <TokenizedLogistics />
            <Features />
            <Newsletter />
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </SolanaWalletProvider>
    </AuthProvider>
  );
}

export default App;