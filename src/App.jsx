import React, { useState, useEffect } from 'react';
import { CookieConsent } from './components/ui/CookieConsent';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { clarity } from 'react-microsoft-clarity';
import ClickSpark from './components/ClickSpark';

/* --- COMPONENTS --- */
import NavbarComponent from './components/NavbarComponent';
import HeroSection from './components/HeroSection';

/* --- LAZY LOADED COMPONENTS --- */
const StickyJourney = React.lazy(() => import('./components/StickyJourney'));
const PremiumBenefitsSection = React.lazy(() => import('./components/PremiumBenefitsSection'));
const TechMarquee = React.lazy(() => import('./components/TechMarquee'));
const AboutSection = React.lazy(() => import('./components/AboutSection'));
const ScheduleSection = React.lazy(() => import('./components/ScheduleSection'));
const Footer = React.lazy(() => import('./components/Footer'));

const TermsPage = React.lazy(() => import('./pages/LegalPages').then(module => ({ default: module.TermsPage })));
const PrivacyPage = React.lazy(() => import('./pages/LegalPages').then(module => ({ default: module.PrivacyPage })));


const App = () => {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'terms', 'privacy'

  useEffect(() => {
    // Remove HTML preloader when React hydrates
    const preloader = document.getElementById('initial-preloader');
    const finishTimeout = preloader ? window.setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }, 700) : null;
    
    // Initialize Clarity
    clarity.init('ulyfx4cizz');

    // Prevent context menu (right click)
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    // Handle custom events from mobile menu
    const handleOpenTerms = () => setCurrentView('terms');
    const handleOpenPrivacy = () => setCurrentView('privacy');

    window.addEventListener('openTerms', handleOpenTerms);
    window.addEventListener('openPrivacy', handleOpenPrivacy);

    return () => {
      if (finishTimeout) window.clearTimeout(finishTimeout);
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('openTerms', handleOpenTerms);
      window.removeEventListener('openPrivacy', handleOpenPrivacy);
    };
  }, []);

  if (currentView === 'terms') {
    return (
      <React.Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center text-emerald-500">Loading...</div>}>
         <TermsPage onBack={() => setCurrentView('home')} />
      </React.Suspense>
    );
  }
  
  if (currentView === 'privacy') {
    return (
      <React.Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center text-emerald-500">Loading...</div>}>
         <PrivacyPage onBack={() => setCurrentView('home')} />
      </React.Suspense>
    );
  }

  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
      style={{ minHeight: '100svh' }}
    >
      <div className="min-h-[100svh] bg-[#000000] font-sans selection:bg-white/20 text-white">
        
        <div className="pointer-events-none page-grid-fade" aria-hidden="true"></div>
        <NavbarComponent />

        <HeroSection />

        <React.Suspense fallback={<div className="h-64 flex items-center justify-center text-emerald-500/50">Carregando...</div>}>
            <StickyJourney />
            <PremiumBenefitsSection />
            <div className="relative z-20 w-full"><TechMarquee /></div>
            <AboutSection />
            <ScheduleSection />
            <Footer onViewChange={setCurrentView} />
        </React.Suspense>
      </div>

      <CookieConsent onPrivacyClick={() => setCurrentView('privacy')} />
      <Analytics />
      <SpeedInsights />
    </ClickSpark>
  );
};

export default App;
