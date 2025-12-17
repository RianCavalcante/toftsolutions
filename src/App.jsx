import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cover } from './components/ui/Cover';
import { ThreeDMarquee } from './components/ui/ThreeDMarquee';
import { BackgroundBeams } from './components/ui/BackgroundBeams';
import { EvervaultCard, Icon } from './components/ui/EvervaultCard';
import { StickyScrollWithProgress } from './components/ui/StickyScrollReveal';
import { ShimmerText } from './components/ui/TypewriterEffect';
import { 
  Send, MoreVertical, Search, Paperclip, Mic, CheckCheck, Smile, 
  Menu, X, Zap, Clock, TrendingUp, Shield, MessageSquare, ChevronRight,
  Bot, BarChart3, Globe, Sparkles, Cpu, Users, ArrowRight, Play, 
  Lock, Fingerprint, Award, Rocket, Video
} from 'lucide-react';

import { PremiumBackground } from './components/ui/PremiumBackground';
const WhatsAppSimulator = React.lazy(() => import('./components/OriginalWhatsAppSimulator'));
// Lazy load legal pages to reduce bundle size
const TermsPage = React.lazy(() => import('./pages/LegalPages').then(module => ({ default: module.TermsPage })));
const PrivacyPage = React.lazy(() => import('./pages/LegalPages').then(module => ({ default: module.PrivacyPage })));
import { CookieConsent } from './components/ui/CookieConsent';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { clarity } from 'react-microsoft-clarity';

// Registrar plugin GSAP
gsap.registerPlugin(ScrollTrigger);

/* --- HOOKS DE EFEITOS VISUAIS --- */

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return;
    const handleChange = () => setPrefersReducedMotion(!!media.matches);
    handleChange();
    media.addEventListener?.('change', handleChange);
    return () => media.removeEventListener?.('change', handleChange);
  }, []);
  return prefersReducedMotion;
};

// Hook para Parallax
const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(() => setOffset(window.pageYOffset * speed));
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);
  return offset;
};

// Hook para Intersection Observer (Reveal on Scroll)
const useOnScreen = (ref, threshold = 0.1) => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect(); // Anima apenas uma vez
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return isIntersecting;
};

/* --- COMPONENTES DE EFEITO --- */

const HoverWord = ({ text, className = "" }) => (
  <span className={`hover-word ${className}`} role="text" aria-label={text}>
    {text.split("").map((char, idx) => {
      const safeChar = char === " " ? "\u00A0" : char;
      return (
        <span
          key={`${char}-${idx}`}
          aria-hidden="true"
          data-char={safeChar}
          style={{ "--delay": `${idx * 18}ms` }}
        >
          {safeChar}
        </span>
      );
    })}
  </span>
);



// 2. Reveal Text (SplitText)
const RevealText = ({ text, className }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: `${index * 30}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

// 4. Scroll Scrub Progress Bar
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </div>
  );
};

// 6. Fade + Scale Container
const RevealOnScroll = ({ children, className }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref, 0.2);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

/* --- COMPONENTE: STRIPED PATTERN --- */
const StripedPattern = ({ className }) => (
  <div className={`absolute inset-0 -z-10 h-full w-full pointer-events-none ${className}`}>
    <svg className="absolute h-full w-full stroke-white/10 opacity-50" fill="none">
      <defs>
        <pattern id="striped-pattern" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <path d="M.5 40V.5H40" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill="url(#striped-pattern)" />
    </svg>
  </div>
);



/* --- NAVBAR --- */
const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#000000]/80 backdrop-blur-xl border-white/5 py-3' : 'bg-transparent border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="currentColor"/>
                <path d="M14 2V8H20" fill="currentColor" opacity="0.3"/>
                <path d="M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors duration-300">ToftSolutions</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {['Método', 'Soluções', 'Resultados'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 group"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-emerald-400 to-emerald-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="https://wa.me/5585991872205?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20ToftSolutions." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-black px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              Falar com consultor <ArrowRight size={16} />
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2" aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

/* --- TECH MARQUEE --- */
const TechMarquee = () => {
  const techs = [
    { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "n8n", url: "https://cdn.simpleicons.org/n8n/EE4F27" },
    { name: "Make", url: "https://cdn.simpleicons.org/make/6842FF" },
    { name: "Zapier", url: "https://cdn.simpleicons.org/zapier/FF4A00" },
    { name: "OpenAI", url: "https://cdn.simpleicons.org/openai/39C09E" },
    { name: "Gemini", url: "https://cdn.simpleicons.org/googlegemini/4285F4" },
    { name: "Hostinger", url: "https://cdn.simpleicons.org/hostinger/674CC4" },
    { name: "DigitalOcean", url: "https://cdn.simpleicons.org/digitalocean/0080FF" },
    { name: "Supabase", url: "https://cdn.simpleicons.org/supabase/3ECF8E" },
    { name: "Firebase", url: "https://cdn.simpleicons.org/firebase/FFCA28" },
    { name: "PostgreSQL", url: "https://cdn.simpleicons.org/postgresql/4169E1" },
    { name: "Redis", url: "https://cdn.simpleicons.org/redis/DC382D" },
  ];

  return (
    <div className="py-16 border-t border-white/5 bg-[#000000] overflow-hidden relative w-full">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.25em]">Stack Tecnológica & Integrações</p>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none"></div>
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-24 px-10">
          {[...techs, ...techs, ...techs].map((tech, index) => (
            <div key={index} className="flex items-center gap-4 group/item cursor-default opacity-60 hover:opacity-100 transition-opacity duration-300">
               <img src={tech.url} alt={tech.name} width={32} height={32} className="w-8 h-8 object-contain filter grayscale group-hover/item:grayscale-0 transition-all duration-300" />
               <span className="text-lg font-sans font-semibold tracking-tight text-gray-400 group-hover/item:text-white transition-colors duration-300">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* --- BENTO CARD COM GSAP --- */
const BentoCard = ({ icon: Icon, title, description, className, label, index = 0 }) => {
  const cardRef = useRef(null);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className={`relative overflow-hidden bg-[#0A0A0A] p-8 rounded-[2rem] border border-white/5 hover:border-white/15 transition-all duration-500 group ${className}`}>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors duration-500 relative z-10 border border-white/5">
        <Icon size={22} className="text-gray-500 group-hover:text-white transition-colors duration-500" />
      </div>
      <div className="relative z-10">
        {label && (<span className="inline-block text-[10px] font-medium uppercase tracking-widest text-gray-600 mb-3">{label}</span>)}
        <h3 className="text-xl font-medium text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
      </div>
    </div>
  );
};

/* --- PREMIUM BENEFITS SECTION --- */
const PremiumBenefitsSection = () => {
  const sectionRef = useRef(null);
  const benefitsRef = useRef([]);
  const countersRef = useRef([]);

  const benefits = [
    {
      icon: <Zap size={24} strokeWidth={1.5} />,
      title: "Resposta Instantânea",
      description: "Atendimento em tempo real. Seu cliente recebe atenção no momento que precisa.",
      metric: "< 3s",
      metricLabel: "tempo médio"
    },
    {
      icon: <TrendingUp size={24} strokeWidth={1.5} />,
      title: "Economia Real",
      description: "Reduza até 80% dos custos com atendimento humano repetitivo.",
      metric: "80%",
      metricLabel: "redução de custos"
    },
    {
      icon: <Clock size={24} strokeWidth={1.5} />,
      title: "Sempre Online",
      description: "24 horas por dia, 7 dias por semana. Nunca perca uma oportunidade.",
      metric: "24/7",
      metricLabel: "disponibilidade"
    },
    {
      icon: <Users size={24} strokeWidth={1.5} />,
      title: "Escala Ilimitada",
      description: "Atenda milhares de clientes simultaneamente sem contratar mais.",
      metric: "∞",
      metricLabel: "conversas simultâneas"
    },
    {
      icon: <Shield size={24} strokeWidth={1.5} />,
      title: "Segurança Total",
      description: "Dados criptografados e em conformidade com LGPD e GDPR.",
      metric: "100%",
      metricLabel: "compliance"
    },
    {
      icon: <Bot size={24} strokeWidth={1.5} />,
      title: "IA de Ponta",
      description: "Tecnologia GPT avançada que entende contexto e emoções.",
      metric: "GPT-4",
      metricLabel: "modelo de IA"
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        ".benefits-title",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      );

      // Staggered cards animation
      gsap.fromTo(
        benefitsRef.current,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%"
          }
        }
      );

      // Counter animation for metrics
      countersRef.current.forEach((counter, idx) => {
        const metric = benefits[idx].metric;
        if (counter && !isNaN(parseInt(metric))) {
          gsap.fromTo(
            counter,
            { innerText: 0 },
            {
              innerText: parseInt(metric),
              duration: 2,
              ease: "power2.out",
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: counter,
                start: "top 80%"
              },
              onUpdate: function() {
                counter.innerText = Math.ceil(this.targets()[0].innerText) + (metric.includes('%') ? '%' : '');
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-32 relative bg-gradient-to-b from-[#030303] via-[#050505] to-[#030303] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      {/* Floating orbs for depth */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-white/[0.02] rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-white/[0.015] rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 benefits-title">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-medium uppercase tracking-[0.2em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Por que nos escolher
          </span>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white leading-[1.1] mb-6">
            Resultados que <br/>
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">falam por si</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">
            O que nossa tecnologia entrega em cada projeto de automação.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              ref={el => benefitsRef.current[idx] = el}
              className="group relative p-6 sm:p-8 rounded-3xl bg-[#0A0A0A]/70 border border-white/[0.07] hover:border-white/[0.14] transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out cursor-pointer overflow-hidden hover:-translate-y-1 hover:bg-white/[0.03] hover:shadow-[0_26px_70px_-55px_rgba(0,0,0,0.9)] focus-within:border-white/20"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.07),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.04),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              {/* Top shine line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon container */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/[0.06] transition-colors duration-300">
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-500">
                    {benefit.icon}
                  </span>
                </div>
                {/* Icon glow on hover */}
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight transition-colors duration-300 group-hover:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 group-hover:text-gray-400 transition-colors duration-300 font-light">
                  {benefit.description}
                </p>

                {/* Metric display */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06] group-hover:border-white/10 transition-colors duration-300">
                  <span 
                    ref={el => countersRef.current[idx] = el}
                    className="text-3xl font-bold text-emerald-400 leading-none"
                  >
                    {benefit.metric}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-600 font-medium">
                    {benefit.metricLabel}
                  </span>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-white/[0.06] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 text-sm mb-4">Transforme a forma como você se conecta com seus clientes</p>
          <button className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto group">
            Quero esses resultados
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

/* --- SOBRE NÓS SECTION --- */
const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Trigger card animations
        setTimeout(() => {
          animateCards();
          animateCounters();
        }, 300);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const animateCards = () => {
    gsap.fromTo(
      cardsRef.current,
      {
        y: 60,
        opacity: 0,
        scale: 0.9,
        rotateX: -15
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        force3D: true
      }
    );
  };

  const animateCounters = () => {
    const counters = document.querySelectorAll('.counter-value');
    counters.forEach((counter, index) => {
      const target = parseInt(counter.dataset.target);
      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          delay: index * 0.3,
          onUpdate: function() {
            counter.innerText = Math.floor(this.targets()[0].innerText);
          }
        }
      );
    });
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-32 relative bg-[#050505] border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none opacity-30"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className={`w-full lg:w-5/12 relative transition-all duration-1000 ease-out transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="relative max-w-xs mx-auto lg:mx-0 group">
              <div className="absolute -inset-4 -z-10 rounded-3xl border border-white/10 bg-transparent overflow-hidden">
                  <svg className="absolute inset-0 h-full w-full stroke-white/10" fill="none">
                      <defs><pattern id="lines-bg" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><path d="M0 10L10 0M-2 2L2 -2M8 12L12 8" strokeWidth="1" /></pattern></defs>
                      <rect width="100%" height="100%" fill="url(#lines-bg)" />
                  </svg>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-square">
                <img src="https://i.postimg.cc/gkb6bJNv/PERFIL-DO-LINKEDIN.jpg" alt="Fundador ToftSolutions" className="w-full h-full object-cover grayscale-0 hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <Award size={12} className="text-white/70" />
                    <span className="text-white text-[10px] font-semibold tracking-wide uppercase">Founder & CEO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-8 relative">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-medium text-white leading-tight">Mais que código, geramos <br/><span className="font-serif italic text-gray-400">liberdade</span>.</h2>
              <div className="w-16 h-0.5 bg-white/20 rounded-full"></div>
            </div>
            <div className="space-y-5 text-gray-400 text-lg font-light leading-relaxed">
              <p>A <strong className="text-emerald-400 font-medium">ToftSolutions</strong> nasceu da inconformidade com o atendimento lento, burocrático e que perde vendas por falta de agilidade.</p>
              <p>Combinamos engenharia de ponta com a naturalidade humana para criar agentes de IA que seus clientes <span className="text-emerald-400 font-medium">realmente gostam</span> de conversar. Não somos uma ferramenta genérica; somos parceiros estratégicos de crescimento.</p>
              <p>Liderada por especialistas obcecados por eficiência, nossa missão é simples: colocar seu comercial no <strong className="text-emerald-400 font-medium">piloto automático</strong> enquanto você foca no que ninguém pode automatizar: a visão do seu negócio.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <div ref={el => cardsRef.current[0] = el} className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative flex items-center gap-4 p-6 bg-gradient-to-br from-white/[0.02] to-white/[0.01] rounded-2xl border border-white/[0.05] hover:border-emerald-500/30 transition-all duration-500 cursor-pointer hover:transform hover:scale-[1.02] hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-400 group-hover:text-emerald-300 transition-colors">
                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-emerald-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white leading-none group-hover:text-emerald-100 transition-colors font-mono">
                      <span className="counter-value" data-target="10">0</span>x
                    </span>
                    <span className="text-[11px] text-gray-500 uppercase tracking-wider mt-1 group-hover:text-emerald-400/80 transition-colors font-medium">Mais Velocidade</span>
                  </div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                </div>
              </div>
              <div ref={el => cardsRef.current[1] = el} className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative flex items-center gap-4 p-6 bg-gradient-to-br from-white/[0.02] to-white/[0.01] rounded-2xl border border-white/[0.05] hover:border-blue-500/30 transition-all duration-500 cursor-pointer hover:transform hover:scale-[1.02] hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-400/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400 group-hover:text-blue-300 transition-colors">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M4 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M22 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-blue-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white leading-none group-hover:text-blue-100 transition-colors font-mono">
                      <span className="counter-value" data-target="24">0</span>/7
                    </span>
                    <span className="text-[11px] text-gray-500 uppercase tracking-wider mt-1 group-hover:text-blue-400/80 transition-colors font-medium">Disponibilidade</span>
                  </div>
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



/* --- APP --- */
const App = () => {
  // loading state replaced by native HTML preloader logic
  const [currentView, setCurrentView] = useState('home'); // 'home', 'terms', 'privacy'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isHeroTitleSwapOn, setIsHeroTitleSwapOn] = useState(false);
  const [isScheduleTitleSwapOn, setIsScheduleTitleSwapOn] = useState(false);
  const parallaxOffset = useParallax(0.15);
  const heroSectionRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();


  useEffect(() => {
    // Remove HTML preloader when React hydrates
    const preloader = document.getElementById('initial-preloader');
    const finishTimeout = preloader ? window.setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }, 700) : null;

    // Initialize Clarity
    clarity.init('ulyfx4cizz');

    return () => {
      if (finishTimeout) window.clearTimeout(finishTimeout);
    };
  }, []);

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

      gsap.utils.toArray('[data-anim="reveal"]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 14,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.utils.toArray('[data-anim="card"]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 18,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Se for uma página legal, renderiza apenas ela com Suspense
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
      <div className={`min-h-[100svh] bg-[#000000] font-sans selection:bg-white/20 text-white overflow-x-hidden ${isScheduleOpen ? 'blur-sm' : ''}`}>
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
          .hover-word { --timing: cubic-bezier(0.22, 0.61, 0.36, 1); --hover-color: rgba(16,185,129,0.9); display: inline-flex; gap: 0.02em; color: inherit; text-transform: inherit; line-height: 1.15; overflow: hidden; vertical-align: bottom; }
          .hover-word > span { position: relative; display: inline-block; transform: translateY(0); transition: transform 0.85s var(--timing) var(--delay); will-change: transform; }
          .hover-word > span::after { content: attr(data-char); position: absolute; left: 0; top: 100%; color: var(--hover-color); }
          .hover-word:hover > span, .hover-word:focus-visible > span { transform: translateY(-100%); }
          .hover-swap:hover .hover-word > span, .hover-swap:focus-within .hover-word > span { transform: translateY(-100%); }
          .hover-swap.is-active .hover-word > span { transform: translateY(-100%); }
          .hover-word-emerald { --hover-color: rgba(16,185,129,0.95); }
          .hover-word-blue { --hover-color: rgba(59,130,246,0.95); }
          .hover-word-white { --hover-color: rgba(255,255,255,0.98); }
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

        <section ref={heroSectionRef} className="relative pt-24 sm:pt-36 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden group min-h-[100svh] flex items-center">
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
                    className={`hover-swap text-4xl lg:text-5xl font-medium leading-[1.15] tracking-tight ${isHeroTitleSwapOn ? 'is-active' : ''}`}
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

        {/* Como Funciona */}
        <section data-anim="reveal" className="py-16 sm:py-24 relative bg-[#050505]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-16 space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-[10px] font-medium uppercase tracking-widest mb-1">Como funciona</div>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.15]">Seu atendimento, <br/><span className="font-serif italic font-normal text-gray-400">só que melhor.</span></h2>
              <p className="text-gray-500 text-lg max-w-lg font-light leading-relaxed">Nada de robô travado. Criamos conversas naturais que seus clientes nem percebem que é IA.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 auto-rows-[minmax(240px,auto)] sm:auto-rows-[minmax(280px,auto)]">
              <BentoCard index={0} icon={Clock} label="Sempre presente" title="Responde quando você não pode" description="Sábado à noite, feriado, 3h da manhã. O lead manda mensagem e recebe resposta na hora. Sem espera, sem frustração." className="md:col-span-1 md:row-span-2" />
              <BentoCard index={1} icon={Cpu} label="Entende de verdade" title="Conversa como gente" description="Entende áudios, gírias, erros de digitação. Não é aquele chatbot chato de 'digite 1 para isso'. É uma conversa real." className="md:col-span-2" />
              <BentoCard index={2} icon={TrendingUp} label="Foco no resultado" title="Filtra quem vai comprar" description="Separa curiosos de compradores e avisa você só quando vale a pena. Agenda reuniões automaticamente." className="md:col-span-1" />
              <BentoCard index={3} icon={Lock} label="Privacidade" title="Seus dados, sua paz" description="Tudo criptografado e em conformidade com a LGPD. Você dorme tranquilo sabendo que está tudo seguro." className="md:col-span-1" />
            </div>
          </div>
        </section>

        {/* Premium Benefits Section - Gatilhos Psicológicos */}
        <PremiumBenefitsSection />

        <div className="relative z-20 w-full"><TechMarquee /></div>
        <AboutSection />
        
        {/* Scheduling Section */}
        <section id="agendar" data-anim="reveal" className="py-16 sm:py-24 relative bg-[#000000] border-t border-white/5 overflow-hidden">
          {/* Grid pattern coming from bottom */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
                opacity: 0.22,
                WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 70%)',
                maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 70%)'
              }}
            ></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16 relative">
                {/* Grid overlay behind header, coming from bottom, white */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                  opacity: 0.2,
                  maskImage: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)',
                }}></div>
                <h2
                  className={`hover-swap text-4xl md:text-6xl font-medium mb-6 tracking-tight leading-tight text-white ${isScheduleTitleSwapOn ? 'is-active' : ''}`}
                  onMouseEnter={() => setIsScheduleTitleSwapOn(true)}
                  onMouseLeave={() => setIsScheduleTitleSwapOn(false)}
                  onClick={() => setIsScheduleTitleSwapOn(v => !v)}
                  tabIndex={0}
                  role="button"
                  aria-label="Alternar destaque do título"
                >
                  <HoverWord text="Agende sua" className="hover-word-emerald" />{" "}
                  <span className="text-emerald-500 font-serif italic">
                    <HoverWord text="Demonstração" className="hover-word-white" />
                  </span>
                </h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">
                  Veja na prática como nossa automação pode transformar o atendimento da sua empresa.
                </p>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {/* Card 1: Demonstração Online */}
              <div data-anim="card" className="group bg-[#0A0A0A] rounded-3xl p-8 border border-white/8 hover:border-emerald-500/25 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden hover:bg-white/[0.02] hover:shadow-[0_22px_55px_-45px_rgba(0,0,0,0.85)]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/25 transition-all duration-300">
                  <Video size={28} className="text-gray-300 group-hover:text-emerald-300 transition-colors" />
                </div>
                  
                <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">Demonstração Online</h3>
                <p className="text-gray-500 text-sm mb-6 font-light">Reunião de 30 minutos via Google Meet</p>
                  
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium mb-8 group-hover:border-emerald-500/25 group-hover:text-emerald-200/90 transition-colors">
                  <Clock size={12} /> 30 min
                </div>
                  
                <div className="w-full space-y-3 mb-8 text-left pl-4 border-l border-white/10 group-hover:border-emerald-500/25 transition-colors">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCheck size={14} className="text-emerald-500/60 group-hover:text-emerald-300 shrink-0 transition-colors" /> Apresentação personalizada
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCheck size={14} className="text-emerald-500/60 group-hover:text-emerald-300 shrink-0 transition-colors" /> Análise do seu negócio
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCheck size={14} className="text-emerald-500/60 group-hover:text-emerald-300 shrink-0 transition-colors" /> Proposta sob medida
                  </div>
                </div>

                <button 
                  onClick={() => setIsScheduleOpen(true)}
                  className="w-full py-4 bg-white text-black rounded-xl font-bold text-sm hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                >
                  Agendar Agora <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Card 2: Consultoria WhatsApp */}
              <div data-anim="card" className="group bg-[#0A0A0A] rounded-3xl p-8 border border-white/8 hover:border-emerald-500/25 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden hover:bg-white/[0.02] hover:shadow-[0_22px_55px_-45px_rgba(0,0,0,0.85)]">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/25 transition-all duration-300">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="text-gray-300 group-hover:text-emerald-300 transition-colors">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">Consultoria via WhatsApp</h3>
                <p className="text-gray-500 text-sm mb-6 font-light">Conversa direta com nosso especialista</p>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium mb-8 group-hover:border-emerald-500/25 group-hover:text-emerald-200/90 transition-colors">
                  <Zap size={12} /> Imediato
                </div>
                
                <div className="w-full space-y-3 mb-8 text-left pl-4 border-l border-white/10 group-hover:border-emerald-500/25 transition-colors">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCheck size={14} className="text-emerald-500/60 group-hover:text-emerald-300 shrink-0 transition-colors" /> Resposta rápida
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCheck size={14} className="text-emerald-500/60 group-hover:text-emerald-300 shrink-0 transition-colors" /> Diagnóstico inicial
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCheck size={14} className="text-emerald-500/60 group-hover:text-emerald-300 shrink-0 transition-colors" /> Orientações personalizadas
                  </div>
                </div>

                <a 
                  href="https://wa.me/5585991872205?text=Ol%C3%A1%20gostaria%20de%20tirar%20mais%20duvidas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-transparent border border-white/20 text-white rounded-xl font-bold text-sm hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-200 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  Falar no WhatsApp <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative bg-black pt-20 pb-10 overflow-hidden">
          {/* Efeito de brilho sutil no topo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
          
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0a0a0a] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Top Section: Logo + Plataforma */}
            <div className="grid md:grid-cols-2 gap-16 mb-20 pb-16 border-b border-white/5">
              {/* Logo e Descrição */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-200 text-black rounded-xl flex items-center justify-center font-serif font-bold text-xl shadow-lg group-hover:shadow-emerald-500/20 transition-all">
                    T
                  </div>
                  <span className="text-2xl font-bold text-white tracking-tight">ToftSolutions</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-md font-light">
                  Empoderando empresas com inteligência artificial conversacional. O futuro das vendas é automático, elegante e invisível.
                </p>
              </div>

              {/* Plataforma */}
              <div className="space-y-6">
                <h4 className="text-white font-semibold text-sm tracking-wide uppercase flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                  Plataforma
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#" className="group flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                      <ChevronRight size={14} className="text-emerald-500/50 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                      WhatsApp API
                    </a>
                  </li>
                  <li>
                    <a href="#" className="group flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                      <ChevronRight size={14} className="text-emerald-500/50 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                      Chatbot Builder
                    </a>
                  </li>
                  <li>
                    <a href="#" className="group flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                      <ChevronRight size={14} className="text-emerald-500/50 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                      CRM Integrado
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Massive Brand Name - Static & Elegant */}
            <div className="relative py-10 sm:py-12 mb-12 sm:mb-16 px-2">
              {/* Subtle gradient background */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/30 to-transparent"></div>
              
              <h2 
                className="text-[clamp(2.6rem,12vw,8.5rem)] font-extrabold leading-none tracking-[-0.06em] select-none text-center"
                style={{ 
                  color: 'rgba(255,255,255,0.012)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.055)',
                  textShadow: '0 18px 34px rgba(0,0,0,0.78), 0 0 60px rgba(16,185,129,0.02)',
                  WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 28%, rgba(0,0,0,1) 70%)',
                  maskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 28%, rgba(0,0,0,1) 70%)'
                }}
              >
                TOFTSOLUTIONS
              </h2>
            </div>

            {/* Bottom: Copyright */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
              <p className="text-gray-500 text-xs font-light">
                &copy; {new Date().getFullYear()} ToftSolutions AI. Todos os direitos reservados.
              </p>
              <div className="flex gap-6">
                <button onClick={() => setCurrentView('terms')} className="text-gray-500 hover:text-white text-xs transition-colors">Termos de Uso</button>
                <button onClick={() => setCurrentView('privacy')} className="text-gray-500 hover:text-white text-xs transition-colors">Privacidade</button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Booking Modal */}
      {isScheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsScheduleOpen(false)}></div>
          <div className="bg-[#111] w-full max-w-4xl h-[85vh] rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center p-4 border-b border-white/5 bg-[#111]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-gray-500 font-mono">cal.com/toftsolutionsai</span>
              </div>
              <button onClick={() => setIsScheduleOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Fechar modal">
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            <div className="flex-1 w-full h-full bg-white relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <iframe 
                src="https://cal.com/toftsolutionsai?theme=dark" 
                className="w-full h-full border-0 relative z-10 bg-[#111]"
                allow="camera; microphone; autoplay; encrypted-media"
              ></iframe>
            </div>
          </div>
        </div>
      )}
      <CookieConsent onPrivacyClick={() => setCurrentView('privacy')} />
      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default App;
