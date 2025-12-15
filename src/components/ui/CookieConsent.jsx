import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

export const CookieConsent = ({ onPrivacyClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verifica se já houve consentimento salvo
    const consent = localStorage.getItem('toft_cookie_consent');
    if (!consent) {
      // Pequeno delay para não ser intrusivo logo de cara
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('toft_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('toft_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in slide-in-from-bottom-full duration-700">
      <div className="max-w-5xl mx-auto bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 bg-white/5 rounded-xl text-emerald-500 hidden sm:block">
              <Cookie size={24} />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1">Nós valorizamos sua privacidade</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Utilizamos cookies para melhorar sua experiência e analisar o tráfego do site. 
                Ao clicar em "Aceitar", você concorda com nossa{' '}
                <button 
                  onClick={onPrivacyClick}
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors"
                >
                  Política de Privacidade
                </button>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleDecline}
              className="flex-1 md:flex-none px-6 py-2.5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              Recusar
            </button>
            <button 
              onClick={handleAccept}
              className="flex-1 md:flex-none px-6 py-2.5 rounded-full bg-white text-black hover:bg-emerald-500 hover:text-white transition-all text-sm font-bold shadow-lg hover:shadow-emerald-500/20"
            >
              Aceitar Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
