import React from 'react';
import { Zap, Clock, Cpu, TrendingUp, Lock, CheckCheck } from 'lucide-react';

const StickyJourney = () => {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e, cardRef) => {
    const rect = cardRef.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="relative bg-[#050505] py-20 lg:py-32">
       {/* Background Mesh */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
       
       <div className="max-w-7xl mx-auto px-6 relative z-10">
         <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
           {/* Lado Esquerdo - Sticky Header */}
           <div className="hidden lg:flex lg:w-1/3 lg:h-screen lg:sticky lg:top-0 lg:pt-24 flex-col justify-center mb-12 lg:mb-0">
             <div className="space-y-6 pr-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-medium uppercase tracking-widest mb-1 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]">
                  <Zap size={10} className="fill-emerald-400" /> A Jornada Inteligente
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
                  Seu atendimento, <br/>
                  <span className="font-serif italic font-normal text-gray-400">reimaginado.</span>
                </h2>
                <p className="text-gray-500 text-lg font-light leading-relaxed max-w-sm">
                  Uma experiência fluida onde cada interação é uma oportunidade de encantar. Acompanhe o fluxo.
                </p>
                
                {/* Barra de Progresso Visual */}
                <div className="w-px h-24 bg-gradient-to-b from-emerald-500 via-emerald-500/20 to-transparent mt-8"></div>
             </div>
           </div>

           {/* Mobile Header (Non-sticky) */}
           <div className="lg:hidden mb-12 space-y-6 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] font-medium uppercase tracking-widest mb-1">
                <Zap size={10} className="fill-emerald-400" /> A Jornada Inteligente
              </div>
              <h2 className="text-4xl font-medium tracking-tight text-white leading-[1.1]">
                Seu atendimento, <br/>
                <span className="font-serif italic font-normal text-gray-400">reimaginado.</span>
              </h2>
           </div>

           {/* Lado Direito - Scrollable Cards */}
           <div className="lg:w-2/3 space-y-[30vh] lg:space-y-[40vh] py-[15vh] lg:py-[25vh] relative">
              {/* Linha de Conexão Contínua */}
              <div className="absolute left-8 lg:left-12 top-0 bottom-0 w-px bg-white/5 hidden sm:block"></div>

              {[
                {
                  step: "01",
                  icon: Clock,
                  title: "Sempre Presente",
                  subtitle: "Disponibilidade Infinita",
                  desc: "Seu cliente manda mensagem sábado às 2h da manhã. Em vez de silêncio, ele recebe acolhimento imediato.",
                  highlight: "Tempo de resposta: < 2 segundos",
                  color: "emerald"
                },
                {
                  step: "02",
                  icon: Cpu,
                  title: "Entende de Verdade",
                  subtitle: "IA Contextual",
                  desc: "Esqueça os menus numéricos. Nossa IA compreende áudios, gírias e intenções complexas como um humano faria.",
                  highlight: "Processamento de Linguagem Natural v3.0",
                  color: "blue"
                },
                {
                  step: "03",
                  icon: TrendingUp,
                  title: "Filtra & Converte",
                  subtitle: "Qualificação Automática",
                  desc: "Separa curiosos de compradores reais. Agenda reuniões apenas com leads qualificados direto na sua agenda.",
                  highlight: "+40% na taxa de conversão",
                  color: "purple"
                },
                {
                  step: "04",
                  icon: Lock,
                  title: "Segurança Total",
                  subtitle: "Paz de Espírito",
                  desc: "Tudo acontece em um ambiente criptografado, blindado e 100% adequado à LGPD. Seus dados são sagrados.",
                  highlight: "Criptografia Ponta-a-Ponta",
                  color: "orange"
                }
              ].map((item, idx) => {
                const cardRef = React.useRef(null);
                return (
                  <div key={idx} className="relative pl-20 lg:pl-28 group">
                    {/* Nó da linha do tempo */}
                    <div className="absolute left-[30px] lg:left-[46px] top-0 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-emerald-500/30 bg-[#050505] group-hover:bg-emerald-500 group-hover:scale-125 transition-all duration-500 z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    {/* Card Content */}
                    <div 
                      ref={cardRef}
                      onMouseMove={(e) => handleMouseMove(e, cardRef.current)}
                      data-anim="sticky-card"
                      className="relative bg-[#0A0A0A] border border-white/5 hover:border-emerald-500/30 p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] group-hover:bg-white/[0.015] overflow-hidden min-h-[320px] flex flex-col justify-center"
                    >
                       {/* Dynamic Spotlight Effect */}
                       <div 
                         className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                         style={{
                           background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16,185,129,0.06), transparent 40%)`
                         }}
                       ></div>

                       <div className="relative z-10">
                         <div className="flex justify-between items-start mb-6">
                           <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-all duration-500">
                             <item.icon size={26} className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
                           </div>
                           <span className="text-5xl font-bold text-white/[0.03] group-hover:text-emerald-500/[0.05] transition-colors font-serif select-none pointer-events-none">
                             {item.step}
                           </span>
                         </div>

                         <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                         <span className="text-xs font-mono uppercase tracking-wider text-emerald-600/80 mb-4 block">{item.subtitle}</span>
                         
                         <p className="text-gray-400 leading-relaxed font-light mb-6 group-hover:text-gray-300 transition-colors">
                           {item.desc}
                         </p>

                         {/* Highlight Pills */}
                         <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-xs font-medium text-emerald-400/80 mt-2 hover:bg-emerald-500/10 transition-colors cursor-default">
                           <CheckCheck size={12} /> <span dangerouslySetInnerHTML={{__html: item.highlight}}></span>
                         </div>
                       </div>
                    </div>
                  </div>
                );
              })}
           </div>
         </div>
       </div>
    </section>
  );
};

export default StickyJourney;
