import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { Cover } from './ui/Cover';
import { ShimmerText } from './ui/TypewriterEffect';
import { PremiumBackground } from './ui/PremiumBackground';
import { HoverWord } from './ui/SharedEffects';
import { usePrefersReducedMotion, useParallax } from '../hooks/useVisualEffects';

const WhatsAppSimulator = React.lazy(() => import('./OriginalWhatsAppSimulator'));

const HeroSection = () => {
  const [isHeroTitleSwapOn, setIsHeroTitleSwapOn] = useState(false);
  const heroSectionRef = useRef(null);
  const parallaxOffset = useParallax(0.15);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    if (!heroSectionRef.current) return;

    const ctx = gsap.context(() => {
      const heroTitle = heroSectionRef.current?.querySelector('[data-anim="hero-title"]');
      const heroCopy = heroSectionRef.current?.querySelector('[data-anim="hero-copy"]');
      const heroCtas = heroSectionRef.current?.querySelector('[data-anim="hero-ctas"]');
      const heroSim = heroSectionRef.current?.querySelector('[data-anim="hero-sim"]');

      gsap.set([heroTitle, heroCopy, heroCtas, heroSim].filter(Boolean), { willChange: 'transform,opacity' });

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(heroTitle, { y: 16, opacity: 0, duration: 0.7 })
        .from(heroCopy, { y: 12, opacity: 0, duration: 0.6 }, '-=0.35')
        .from(heroCtas, { y: 10, opacity: 0, duration: 0.55 }, '-=0.3')
        .from(heroSim, { y: 16, opacity: 0, duration: 0.7 }, '-=0.35');

    }, heroSectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={heroSectionRef} className="relative pt-28 sm:pt-36 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden group min-h-[100svh] flex items-center">
      {/* Premium cinematic background */}
      <PremiumBackground />
      {/* Parallax Effect on Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-[150px] pointer-events-none" style={{ transform: `translateY(${parallaxOffset}px)` }}></div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl mx-auto lg:mx-0 lg:sticky lg:top-32 self-start pb-6 sm:pb-8 lg:pb-0">
            <div data-anim="hero-title" className="space-y-3">
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">É assim que escalamos</span>
              <h1
                className={`hover-swap text-[1.75rem] leading-[1.25] sm:text-4xl lg:text-5xl font-medium tracking-tight ${isHeroTitleSwapOn ? 'is-active' : ''}`}
                onMouseEnter={() => setIsHeroTitleSwapOn(true)}
                onMouseLeave={() => setIsHeroTitleSwapOn(false)}
                onClick={() => setIsHeroTitleSwapOn(v => !v)}
                tabIndex={0}
                role="button"
                aria-label="Alternar destaque do título principal"
              >
                <HoverWord text="Atenda seus clientes em" className="hover-word-emerald" />{" "}
                <Cover className="text-emerald-500">
                  <HoverWord text="velocidade máxima" className="hover-word-white" />
                </Cover>
              </h1>
            </div>
            <p data-anim="hero-copy" className="text-lg text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light overflow-hidden">
              <ShimmerText>Atendimento inteligente que converte. Enquanto você foca no que importa, nossa IA qualifica, responde e agenda reuniões automaticamente.</ShimmerText>
            </p>
            <div data-anim="hero-ctas" className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={() => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-white text-black rounded-full font-semibold text-base hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)]"
              >
                <span className="flex items-center gap-2">Agendar Agora <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
              </button>
              <button className="px-6 py-3 bg-transparent text-white border border-white/20 rounded-full font-semibold text-base hover:bg-white/5 transition-all flex items-center justify-center gap-2">Ver Como Funciona</button>
            </div>
          </div>
          <div data-anim="hero-sim" className="flex-1 w-full max-w-xl lg:max-w-none perspective-1000 relative mt-12 sm:mt-14 lg:mt-0 flex justify-center lg:justify-end">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-white/10 to-gray-500/10 blur-[90px] rounded-full -z-10"></div>
             <React.Suspense fallback={<div className="w-full max-w-md mx-auto h-[420px] rounded-3xl border border-white/10 bg-white/5 animate-pulse" />}>
               <WhatsAppSimulator />
             </React.Suspense>
           </div>
         </div>
       </div>
    </section>
  );
};

export default HeroSection;
