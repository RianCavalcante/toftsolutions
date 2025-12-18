import React, { useState, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Video, CheckCheck, Zap, X } from 'lucide-react';
import { HoverWord } from './ui/SharedEffects';

const ScheduleSection = () => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isScheduleTitleSwapOn, setIsScheduleTitleSwapOn] = useState(false);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation for section
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

      // Card animation
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="agendar" data-anim="reveal" className="py-16 sm:py-24 relative bg-[#000000] border-t border-white/5 overflow-hidden">
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
    </>
  );
};

export default ScheduleSection;
