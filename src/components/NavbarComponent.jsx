import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#000000]/80 backdrop-blur-xl border-white/5 py-2 sm:py-3' : 'bg-transparent border-transparent py-3 sm:py-4 lg:py-6'}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
          <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
              <svg width="160" height="36" viewBox="0 0 250 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-105 transition-transform duration-300 sm:w-[200px] sm:h-[44px] lg:w-[220px] lg:h-[52px]">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <rect x="0" y="10" width="35" height="35" rx="8" fill="url(#gradient1)" className="sm:w-[42px] sm:h-[42px] lg:w-[50px] lg:h-[50px]"/>
                {/* Ondas digitais */}
                <path d="M10 25 Q13 22, 17.5 25 T27.5 25" stroke="white" strokeWidth="1.5" fill="none" className="sm:stroke-2"/>
                <path d="M10 28 Q13 25, 17.5 28 T27.5 28" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7" className="sm:stroke-2"/>
                <path d="M10 31 Q13 28, 17.5 31 T27.5 31" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" className="sm:stroke-2"/>
                <text x="45" y="36" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '24px', fontWeight: 700, fill: 'white' }} className="sm:text-[28px] lg:text-[36px]">
                  Toft
                </text>
                <text x="105" y="36" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '24px', fontWeight: 700, fill: '#10b981' }} className="sm:text-[28px] lg:text-[36px]">
                  Solutions
                </text>
              </svg>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {['Método', 'Soluções', 'Resultados'].map((item) => (
              <a
                key={item}
                href="#"
                className="relative px-3 sm:px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 group"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-emerald-400 to-emerald-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4 sm:gap-6">
            <a
              href="https://wa.me/5585991872205?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20ToftSolutions."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              Falar com consultor <ArrowRight size={14} sm:size={16} />
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-1.5 sm:p-2" aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}>
              {isMenuOpen ? <X size={20} sm:size={24} /> : <Menu size={20} sm:size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
