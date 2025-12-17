import React, { useEffect, useRef, useState } from 'react';
import { 
  Send, MoreVertical, Search, Paperclip, Mic, CheckCheck, Smile
} from 'lucide-react';

const getCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
};

const WhatsAppSimulator = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatContainerRef = useRef(null);

  const script = [
    { role: 'bot', text: "Olá! 👋 Sou o assistente da ToftSolutions AI. Como posso ajudar?", delay: 1000 },
    { role: 'user', text: "Quero automatizar meu atendimento no WhatsApp", delay: 1500 },
    { role: 'bot', text: "Perfeito! 🤝 Posso criar um agente de IA que responde 24/7 e qualifica leads. Qual seu segmento?", delay: 1500 },
    { 
      role: 'input_loop', 
      variations: [
        "Trabalho com e-commerce 🛒", "Trabalho com imobiliária 🏡", 
        "Tenho um escritório de advocacia ⚖️", "Tenho uma clínica dentária 🦷", 
        "Sou dono de restaurante 🍽️", "Meu escritório precisa disso 🙏", 
        "Minha clínica necessita dessa automação 🚀"
      ], 
      delay: 1000 
    }
  ];

  const [scriptIndex, setScriptIndex] = useState(0);
  const [typingLoopIndex, setTypingLoopIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      if (scrollHeight > clientHeight) {
        chatContainerRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
      }
    }
  }, [messages, isBotTyping]);

  useEffect(() => {
    if (scriptIndex >= script.length || script[scriptIndex].role === 'input_loop') return;
    let timeoutId;
    let typingIntervalId;
    const runScriptStep = async () => {
      const currentStep = script[scriptIndex];
      if (currentStep.role === 'bot') {
        timeoutId = setTimeout(() => {
          setIsBotTyping(true);
          setTimeout(() => {
            setIsBotTyping(false);
            addMessage({ id: Date.now(), text: currentStep.text, sender: 'bot', time: getCurrentTime(), status: 'read' });
            setScriptIndex(prev => prev + 1);
          }, 1500); 
        }, currentStep.delay);
      } else if (currentStep.role === 'user') {
        timeoutId = setTimeout(() => {
          let charIndex = 0;
          const textToType = currentStep.text;
          typingIntervalId = setInterval(() => {
            if (charIndex <= textToType.length) {
              setInputValue(textToType.slice(0, charIndex));
              charIndex++;
            } else {
              clearInterval(typingIntervalId);
              setInputValue("");
              addMessage({ id: Date.now(), text: textToType, sender: 'user', time: getCurrentTime(), status: 'sent' });
              setScriptIndex(prev => prev + 1);
            }
          }, 40);
        }, currentStep.delay);
      }
    };
    runScriptStep();
    return () => {
      clearTimeout(timeoutId);
      clearInterval(typingIntervalId);
    };
  }, [scriptIndex]);

  useEffect(() => {
    if (scriptIndex < script.length && script[scriptIndex]?.role === 'input_loop') {
      const loopStep = script[scriptIndex];
      const currentText = loopStep.variations[typingLoopIndex];
      const type = () => {
        setInputValue(prev => {
          if (!isDeleting) {
            const next = currentText.substring(0, prev.length + 1);
            if (next === currentText) {
              setTypingSpeed(1200);
              setIsDeleting(true);
            } else {
              setTypingSpeed(85);
            }
            return next;
          } else {
            const next = currentText.substring(0, prev.length - 1);
            if (next === "") {
              setIsDeleting(false);
              setTypingLoopIndex(prevIndex => (prevIndex + 1) % loopStep.variations.length);
              setTypingSpeed(180);
            } else {
              setTypingSpeed(40);
            }
            return next;
          }
        });
      };
      const timeout = setTimeout(type, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [scriptIndex, typingLoopIndex, isDeleting, typingSpeed]);

  return (
    <div className="w-full max-w-md mx-auto bg-[#0b0b0b] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-[#121212] border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-white text-sm font-semibold">ToftSolutions AI</span>
            <span className="text-gray-400 text-xs">{isBotTyping ? 'digitando...' : 'online'}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <Search size={18} />
          <MoreVertical size={18} />
        </div>
      </div>

      <div className="px-4 py-3 bg-[#0e0e0e] text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          HOJE
        </span>
      </div>

      <div ref={chatContainerRef} className="h-[340px] px-4 pb-4 overflow-y-auto custom-scrollbar bg-[#0e0e0e]">
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-300">
            🔒 Mensagens criptografadas
          </span>
        </div>

        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed border ${
                m.sender === 'user'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-white'
                  : 'bg-white/5 border-white/10 text-white'
              }`}>
                <div>{m.text}</div>
                <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-gray-400">
                  <span>{m.time}</span>
                  {m.sender === 'user' && (
                    <CheckCheck size={14} className="text-emerald-400" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {isBotTyping && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-3 bg-[#121212] border-t border-white/10">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Emoji">
            <Smile size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Anexar">
            <Paperclip size={18} />
          </button>
          <div className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-400">
            {inputValue || 'Mensagem'}
          </div>
          <button className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Microfone">
            <Mic size={18} />
          </button>
          <button className="p-2 bg-emerald-500/15 border border-emerald-500/25 rounded-full text-emerald-200 hover:bg-emerald-500/20 transition-colors" aria-label="Enviar">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppSimulator;

