import Header from './components/Header';
import Hero from './components/Hero';
import RewiringSectionOne from './components/RewiringSectionOne';
import SuperchargedSection from './components/SuperchargedSection';
import TransformingSection from './components/TransformingSection';
import CheckoutToWalletSection from './components/CheckoutToWalletSection';
import OwnRetailSection from './components/OwnRetailSection';
import LetsWorkSection from './components/LetsWorkSection';
import Footer from './components/Footer';
import { AuthProvider } from './components/AuthContext';
import { SolanaWalletProvider } from './components/WalletProvider';

function App() {
  return (
    <AuthProvider>
      <SolanaWalletProvider>
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
          {/* Header */}
          <Header />
          
          {/* Main content */}
          <main>
            {/* Hero section */}
            <Hero />
            
            {/* Rewiring Retail section */}
            <RewiringSectionOne />
            
            {/* Every Purchase Supercharged section */}
            <SuperchargedSection />
            
            {/* Transforming How Brands Build section */}
            <TransformingSection />
            
            {/* From Checkout to Wallet section */}
            <CheckoutToWalletSection />
            
            {/* Own the Retail Platform section */}
            <OwnRetailSection />
            
            {/* Let's Work section */}
            <LetsWorkSection />
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </SolanaWalletProvider>
    </AuthProvider>
  );
}

export default App;