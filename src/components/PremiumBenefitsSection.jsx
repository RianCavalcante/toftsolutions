import React, { useRef, useLayoutEffect } from 'react';
import { Zap, TrendingUp, ArrowRight } from 'lucide-react';

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
      metricLabel: "tempo médio",
      containerClass: "bg-black border border-emerald-500/20 animate-subtle-pulse shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]",
      iconClass: "text-emerald-400"
    },
    {
      icon: <TrendingUp size={24} strokeWidth={1.5} />,
      title: "Economia Real",
      description: "Reduza até 80% dos custos com atendimento humano repetitivo.",
      metric: "80%",
      metricLabel: "redução de custos",
      containerClass: "bg-black border border-emerald-500/20 animate-subtle-pulse shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]",
      iconClass: "text-emerald-400"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
          <path d="M7 12l5 5L22 7" />
          <path d="M2 12l5 5m5-5l5-5" />
        </svg>
      ),
      title: "Sempre Online",
      description: "24 horas por dia, 7 dias por semana. Nunca perca uma oportunidade.",
      metric: "24/7",
      metricLabel: "disponibilidade",
      containerClass: "bg-black border border-emerald-500/20 animate-subtle-pulse shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]",
      iconClass: "text-emerald-400"
    },
    {
      icon: <i className="fi fi-ts-users text-2xl"></i>,
      title: "Escala Ilimitada",
      description: "Atenda milhares de clientes simultaneamente sem contratar mais.",
      metric: "∞",
      metricLabel: "conversas simultâneas",
      containerClass: "bg-black border border-emerald-500/20 animate-subtle-pulse shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]",
      iconClass: "text-emerald-400"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title: "Segurança Total",
      description: "Dados criptografados e em conformidade com LGPD e GDPR.",
      metric: "100%",
      metricLabel: "compliance",
      containerClass: "bg-black border border-emerald-500/20 animate-subtle-pulse shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]",
      iconClass: "text-emerald-400"
    },
    {
      icon: (
        <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-emerald-400 w-6 h-6">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.055 6.055 0 0 0 5.7718-4.2058 5.989 5.989 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1195 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.453l-.142.0805L8.7043 5.4599a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
        </svg>
      ),
      title: "IA de Ponta",
      description: "Tecnologia GPT avançada que entende contexto e emoções.",
      metric: "GPT 5.2",
      metricLabel: "modelo de IA",
      containerClass: "bg-black border border-emerald-500/20 animate-subtle-pulse shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)]",
      iconClass: "text-emerald-400"
    }
  ];

  useLayoutEffect(() => {
    let ctx;
    let isActive = true;

    const runAnimation = async () => {
      const gsapModule = await import('gsap');
      const scrollModule = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule;
      const ScrollTrigger = scrollModule.ScrollTrigger || scrollModule.default || scrollModule;

      if (!isActive) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
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
    };

    runAnimation();

    return () => {
      isActive = false;
      if (ctx) ctx.revert();
    };
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
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${benefit.containerClass || 'bg-white/[0.04] border border-white/10 group-hover:border-white/20 group-hover:bg-white/[0.06]'}`}>
                  <span className={`transition-colors duration-500 ${benefit.iconClass || 'text-gray-400 group-hover:text-white'}`}>
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
          <button 
            onClick={() => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto group"
          >
            Quero esses resultados
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PremiumBenefitsSection;
