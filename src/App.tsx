import Header from './components/Header';
import Hero from './components/Hero';
import TokenizedLogistics from './components/TokenizedLogistics'; // Add this import
import Features from './components/Features';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CoinRain from './components/CoinRain';

function App() {
  return (
    <div className="min-h-screen bg-dark-950 text-white overflow-x-hidden">
      <CoinRain />
      <Header />
      <main>
        <Hero />
        <TokenizedLogistics />
        <Features />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;