import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CookieConsent } from './components/ui/CookieConsent';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { clarity } from 'react-microsoft-clarity';

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

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

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

    return () => {
      if (finishTimeout) window.clearTimeout(finishTimeout);
      document.removeEventListener('contextmenu', handleContextMenu);
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
    <>
      <div className="min-h-[100svh] bg-[#000000] font-sans selection:bg-white/20 text-white">
        <style>{`
          .font-serif { font-family: 'Instrument Serif', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee { animation: marquee 50s linear infinite; }
          .group:hover .animate-marquee { animation-play-state: paused; }
          .custom-scrollbar::-webkit-scrollbar { display: none; }
          .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
          .animate-shimmer { background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%); background-size: 200% 100%; animation: shimmer 3s infinite linear; }
          .hover-word { --timing: cubic-bezier(0.22, 0.61, 0.36, 1); --hover-color: rgba(16,185,129,0.9); display: inline-flex; gap: 0.02em; color: inherit; text-transform: inherit; line-height: inherit; overflow: hidden; vertical-align: bottom; }
          .hover-word > span { position: relative; display: inline-block; transform: translateY(0); transition: transform 0.85s var(--timing) var(--delay); will-change: transform; }
          .hover-word > span::after { content: attr(data-char); position: absolute; left: 0; top: 100%; color: var(--hover-color); pointer-events: none; }
          
          @media (min-width: 1024px) {
            .hover-word:hover > span, .hover-word:focus-visible > span { transform: translateY(-100%); }
            .hover-swap:hover .hover-word > span, .hover-swap:focus-within .hover-word > span { transform: translateY(-100%); }
            .hover-swap.is-active .hover-word > span { transform: translateY(-100%); }
          }
          .hover-swap.is-active .hover-word > span { transform: translateY(-100%); }
          .hover-word-emerald { --hover-color: rgba(16,185,129,0.95); }
          .hover-word-blue { --hover-color: rgba(59,130,246,0.95); }
          .hover-word-white { --hover-color: rgba(255,255,255,0.98); }

          /* Mobile optimizations */
          @media (max-width: 480px) {
            .hero-section { padding-top: 5rem !important; padding-bottom: 3rem !important; }
            .hero-title { font-size: 1.5rem !important; line-height: 1.2 !important; }
            .hero-copy { font-size: 0.9rem !important; line-height: 1.4 !important; }
            .hero-buttons { gap: 0.75rem !important; }
            .hero-buttons button { padding: 0.75rem 1rem !important; font-size: 0.85rem !important; }
            .about-section { padding: 3rem 0 !important; }
            .about-title { font-size: 1.5rem !important; line-height: 1.3 !important; }
            .about-text { font-size: 0.9rem !important; line-height: 1.5 !important; }
            .sticky-journey { padding: 3rem 0 !important; }
            .journey-title { font-size: 1.25rem !important; }
          }

          @media (max-width: 640px) {
            .hero-section { padding-top: 6rem !important; padding-bottom: 4rem !important; }
            .hero-title { font-size: 1.75rem !important; }
            .hero-copy { font-size: 1rem !important; }
            .about-section { padding: 4rem 0 !important; }
            .about-title { font-size: 1.75rem !important; }
            .about-text { font-size: 1rem !important; }
            .sticky-journey { padding: 4rem 0 !important; }
            .journey-title { font-size: 1.5rem !important; }
          }
          .page-grid-fade {
            position: absolute;
            inset-inline: 0;
            top: 0;
            height: 140vh;
            background-image:
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
            background-size: 32px 32px;
            opacity: 0.22;
            -webkit-mask-image: linear-gradient(to bottom,
              rgba(0,0,0,1) 0%,
              rgba(0,0,0,1) 40%,
              rgba(0,0,0,0.8) 52%,
              rgba(0,0,0,0) 80%
            );
            mask-image: linear-gradient(to bottom,
              rgba(0,0,0,1) 0%,
              rgba(0,0,0,1) 40%,
              rgba(0,0,0,0.8) 52%,
              rgba(0,0,0,0) 80%
            );
          }
          .page-grid-fade::after {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(1200px 520px at 50% 55%, rgba(0,0,0,0.75), transparent 60%);
            opacity: 0.9;
          }
        `}</style>
        
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
    </>
  );
};

export default App;
