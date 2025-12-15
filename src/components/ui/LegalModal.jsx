import React from 'react';
import { X } from 'lucide-react';

export const LegalModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar text-gray-300 space-y-4 leading-relaxed font-light">
          {content}
        </div>
      </div>
    </div>
  );
};

export const defaultTerms = (
  <>
    <p><strong>1. Termos</strong></p>
    <p>Ao acessar o site da ToftSolutions, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site.</p>
    
    <p><strong>2. Uso de Licença</strong></p>
    <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site ToftSolutions, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>modificar ou copiar os materiais;</li>
      <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
      <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site ToftSolutions;</li>
      <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
      <li>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
    </ul>

    <p><strong>3. Isenção de responsabilidade</strong></p>
    <p>Os materiais no site da ToftSolutions são fornecidos 'como estão'. ToftSolutions não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>
  </>
);

export const defaultPrivacy = (
  <>
    <p><strong>1. Política de Privacidade</strong></p>
    <p>A sua privacidade é importante para nós. É política da ToftSolutions respeitar a sua privacidade em relação a qualquer informação que possamos coletar no site ToftSolutions, e outros sites que possuímos e operamos.</p>
    
    <p><strong>2. Coleta de Informações</strong></p>
    <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>
    
    <p><strong>3. Retenção de Dados</strong></p>
    <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
    
    <p><strong>4. Compartilhamento de Dados</strong></p>
    <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
    
    <p><strong>5. Compromisso do Usuário</strong></p>
    <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que a ToftSolutions oferece no site.</p>
  </>
);
