import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { defaultTerms, defaultPrivacy } from '../components/ui/LegalModal'; // Reutilizando textos

const LegalPage = ({ title, content, onBack }) => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para Home
        </button>

        <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight text-white">{title}</h1>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-emerald-400 prose-strong:text-white text-gray-400">
          {content}
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ToftSolutions AI. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage = ({ onBack }) => (
  <LegalPage title="Termos de Uso" content={defaultTerms} onBack={onBack} />
);

export const PrivacyPage = ({ onBack }) => (
  <LegalPage title="Política de Privacidade" content={defaultPrivacy} onBack={onBack} />
);
