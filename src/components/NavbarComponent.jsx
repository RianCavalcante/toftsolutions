import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animações do menu mobile
  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return;

    const runAnimation = async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.gsap || gsapModule.default || gsapModule;

      gsap.fromTo(
        menuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      if (menuItemsRef.current.length > 0) {
        gsap.fromTo(
          menuItemsRef.current,
          {
            y: 30,
            opacity: 0,
            rotateX: -15
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2
          }
        );
      }
    };

    runAnimation();
  }, [isMenuOpen]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (!isMenuOpen) return;

    scrollYRef.current = window.scrollY || 0;
    const body = document.body;
    const html = document.documentElement;

    body.style.position = 'fixed';
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    html.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      html.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      window.scrollTo(0, scrollYRef.current);
    };
  }, [isMenuOpen]);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuItems = [
    { name: 'Método', href: '#' },
    { name: 'Soluções', href: '#' },
    { name: 'Resultados', href: '#' },
  ];

  const legalItems = [
    { name: 'Termo de Uso', action: () => window.dispatchEvent(new CustomEvent('openTerms')) },
    { name: 'Privacidade', action: () => window.dispatchEvent(new CustomEvent('openPrivacy')) },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-[#000000]/80 backdrop-blur-xl border-white/5 py-2 sm:py-3' : 'bg-transparent border-transparent py-3 sm:py-4 lg:py-6'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
            <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
                <svg viewBox="0 0 250 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[160px] h-[36px] sm:w-[200px] sm:h-[44px] lg:w-[220px] lg:h-[52px] group-hover:scale-105 transition-transform duration-300">
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="10" width="35" height="35" rx="8" fill="url(#gradient1)" />
                  {/* Ondas digitais */}
                  <path d="M10 25 Q13 22, 17.5 25 T27.5 25" stroke="white" strokeWidth="1.5" fill="none" />
                  <path d="M10 28 Q13 25, 17.5 28 T27.5 28" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7" />
                  <path d="M10 31 Q13 28, 17.5 31 T27.5 31" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" />
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
              <button
                onClick={handleMenuClick}
                className="text-white p-2 transition-all duration-300"
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                {isMenuOpen ? (
                  <X size={22} />
                ) : (
                  <div className="relative w-5 h-5">
                    <span className="absolute top-1 left-0 w-5 h-0.5 bg-white transition-all duration-300"></span>
                    <span className="absolute top-3 left-0 w-5 h-0.5 bg-white transition-all duration-300"></span>
                    <span className="absolute top-5 left-0 w-5 h-0.5 bg-white transition-all duration-300"></span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
      <div
        ref={menuRef}
        className="fixed inset-0 z-[60] md:hidden"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={closeMenu}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
          {/* Minimal Header */}
          <div className="flex items-center justify-end p-5 border-b border-white/10 relative">
            <button
              type="button"
              onClick={closeMenu}
              className="w-10 h-10 rounded-lg hover:bg-white/10 active:bg-white/20 flex items-center justify-center transition-all duration-300 cursor-pointer" 
              aria-label="Fechar menu"
            >
              <X size={22} className="text-white" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 px-6 py-8 overflow-y-auto custom-scrollbar">
            {/* Navigation Section */}
            <div className="mb-8">
              <div className="space-y-1">
                {menuItems.map((item, index) => (
                  <div
                    key={item.name}
                    ref={el => menuItemsRef.current[index] = el}
                    className="group"
                  >
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group-hover:translate-x-1"
                    >
                      <span className="text-white text-lg font-medium group-hover:text-emerald-400 transition-colors duration-300">
                        {item.name}
                      </span>
                      <ArrowRight size={18} className="text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {/* Legal Section */}
            <div className="mb-8">
              <div className="space-y-1">
                {legalItems.map((item, index) => (
                  <div
                    key={item.name}
                    ref={el => menuItemsRef.current[index + menuItems.length] = el}
                    className="group"
                  >
                    <button
                      onClick={() => {
                        item.action();
                        closeMenu();
                      }}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group-hover:translate-x-1 w-full text-left"
                    >
                      <span className="text-gray-400 text-lg font-medium group-hover:text-emerald-400 transition-colors duration-300">
                        {item.name}
                      </span>
                      <ArrowRight size={18} className="text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-auto px-6 pb-6">
              <div
                ref={el => menuItemsRef.current[menuItems.length + legalItems.length] = el}
                className="group"
              >
                <a
                  href="https://wa.me/5585991872205?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20ToftSolutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/30 transition-all duration-300 group-hover:scale-105"
                >
                  <div className="flex items-center gap-3">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-emerald-400" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="text-white text-lg font-medium">Falar no WhatsApp</span>
                  </div>
                  <ArrowRight size={18} className="text-emerald-400 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <p className="text-gray-500 text-sm text-center">
              © 2024 ToftSolutions
            </p>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default NavbarComponent;
