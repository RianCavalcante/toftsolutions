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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#000000]/80 backdrop-blur-xl border-white/5 py-3' : 'bg-transparent border-transparent py-4 sm:py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
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

export default NavbarComponent;
