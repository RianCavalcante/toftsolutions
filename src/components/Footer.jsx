import React from 'react';
import { ChevronRight } from 'lucide-react';

const Footer = ({ onViewChange }) => {
  return (
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
              <svg width="220" height="52" viewBox="0 0 350 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform duration-300">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <rect x="0" y="15" width="50" height="50" rx="10" fill="url(#gradient1)"/>
                {/* Ondas digitais */}
                <path d="M15 35 Q20 30, 25 35 T35 35" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M15 40 Q20 35, 25 40 T35 40" stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>
                <path d="M15 45 Q20 40, 25 45 T35 45" stroke="white" strokeWidth="2" fill="none" opacity="0.4"/>
                <text x="65" y="52" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '36px', fontWeight: 700, fill: 'white' }}>
                  Toft
                </text>
                <text x="145" y="52" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '36px', fontWeight: 700, fill: '#10b981' }}>
                  Solutions
                </text>
              </svg>
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
            <button onClick={() => onViewChange('terms')} className="text-gray-500 hover:text-white text-xs transition-colors">Termos de Uso</button>
            <button onClick={() => onViewChange('privacy')} className="text-gray-500 hover:text-white text-xs transition-colors">Privacidade</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
