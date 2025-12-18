import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Award } from 'lucide-react';

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
                    <div className="w-14 h-14 rounded-2xl bg-black border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_-3px_rgba(16,185,129,0.15)] animate-subtle-pulse">
                      <i className="fi fi-ts-bolt text-2xl text-emerald-400 group-hover:text-emerald-300 transition-colors"></i>
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
                    <div className="w-14 h-14 rounded-2xl bg-black border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_15px_-3px_rgba(59,130,246,0.15)] animate-subtle-pulse">
                      <i className="fi fi-ts-time-fast text-2xl text-blue-400 group-hover:text-blue-300 transition-colors"></i>
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

export default AboutSection;
