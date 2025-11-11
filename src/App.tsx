import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

// Import page components
import CTA from './components/CTA';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import LogoCloud from './components/LogoCloud';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import OfferBanner from './components/OfferBanner';
import PricingPage from './pages/PricingPage';
import NotFoundPage from './pages/NotFoundPage';
import { HelmetProvider } from 'react-helmet-async';


// Home page component
const HomePage = () => (
  <main className="min-h-screen" id="main-page" role="main">
    <Hero />
    <HowItWorks />
    <Features />
    <Pricing />
    <LogoCloud />
    <Testimonials />
    <CTA />

  </main>



);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <OfferBanner />
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/pricing' element={<PricingPage />} />
            <Route path='/privacy-policy' element={<PrivacyPage />} />
            <Route path='/terms-of-service' element={<TermsPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;