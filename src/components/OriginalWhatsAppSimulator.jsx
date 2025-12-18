import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, MoreVertical, Search, Paperclip, Mic, CheckCheck, Smile
} from 'lucide-react';

const WhatsAppSimulator = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatContainerRef = useRef(null);

  const script = [
    { role: 'bot', text: "Olá! 👋 Sou o assistente da ToftSolutions AI. Como posso ajudar?", delay: 1000 },
    { role: 'user', text: "Quero automatizar meu atendimento no WhatsApp", delay: 1500 },
    { role: 'bot', text: "Perfeito! 🚀 Posso criar um agente de IA que responde 24/7 e qualifica leads. Qual seu segmento?", delay: 1500 },
    { 
      role: 'input_loop', 
      variations: [
        "Trabalho com e-commerce 📦💻", "Trabalho com imobiliária 🏡🔑", 
        "Tenho um escritório de advocacia ⚖️👨‍⚖️", "Tenho uma clínica dentária 🦷⚕️", 
        "Sou dono de restaurante 🍔🍷", "Meu escritório precisa disso 🏢💼", 
        "Minha clínica necessita dessa automação 🏥🤖"
      ], 
      delay: 1000 
    }
  ];

  const [scriptIndex, setScriptIndex] = useState(0);
  const [typingLoopIndex, setTypingLoopIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

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
              setTimeout(() => {
                addMessage({ id: Date.now(), text: textToType, sender: 'user', time: getCurrentTime(), status: 'sent' });
                setInputValue("");
                setScriptIndex(prev => prev + 1);
              }, 500);
            }
          }, 40); 
        }, currentStep.delay);
      }
    };
    runScriptStep();
    return () => { clearTimeout(timeoutId); clearInterval(typingIntervalId); };
  }, [scriptIndex]);

  useEffect(() => {
    if (scriptIndex < script.length && script[scriptIndex].role === 'input_loop') {
      const currentStep = script[scriptIndex];
      const fullText = currentStep.variations[typingLoopIndex % currentStep.variations.length];
      const handleTyping = () => {
        setInputValue(current => {
          if (isDeleting) {
            setTypingSpeed(40);
            return fullText.substring(0, current.length - 1);
          } else {
            setTypingSpeed(80);
            return fullText.substring(0, current.length + 1);
          }
        });
        if (!isDeleting && inputValue === fullText) {
          setTimeout(() => setIsDeleting(true), 1500);
        } else if (isDeleting && inputValue === "") {
          setIsDeleting(false);
          setTypingLoopIndex(prev => prev + 1);
        }
      };
      const timer = setTimeout(handleTyping, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [inputValue, isDeleting, scriptIndex, typingLoopIndex, typingSpeed]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const addMessage = (msg) => setMessages((prev) => [...prev, msg]);

  const handleSimulatorClick = (e) => {
    // Apenas abre o WhatsApp se o clique não foi em um elemento interativo
    if (!e.target.closest('[role="button"]')) {
      window.open('https://wa.me/5585991872205?text=Olá!%20Vi%20a%20simulação%20no%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20automação%20de%20WhatsApp.', '_blank');
    }
  };

  return (
    <div 
      onClick={handleSimulatorClick}
      className="w-full max-w-2xl bg-[#0b141a] rounded-xl overflow-hidden shadow-2xl border border-purple-500/20 relative flex flex-col mx-auto lg:mx-0 h-[380px] z-20 backdrop-blur-sm cursor-pointer group hover:border-emerald-500/40 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]"
      role="button"
      aria-label="Clique para conversar no WhatsApp"
      title="Clique para falar comigo no WhatsApp"
    >
      <div className="bg-[#202c33] px-4 py-2 flex items-center justify-between z-20 shadow-md border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src="https://i.postimg.cc/gkb6bJNv/PERFIL-DO-LINKEDIN.jpg" alt="Avatar" className="w-9 h-9 rounded-full bg-gray-600 object-cover border-2 border-[#202c33]" />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-100 font-medium text-sm">ToftSolutions AI</span>
            <span className="text-gray-400 text-xs">{isBotTyping ? 'digitando...' : 'online'}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <Search size={18} className="cursor-pointer hover:text-white" role="button" aria-label="Pesquisar" />
          <MoreVertical size={18} className="cursor-pointer hover:text-white" role="button" aria-label="Mais opções" />
        </div>
      </div>
      <div className="flex-1 relative bg-[#0b141a] overflow-hidden flex flex-col">
        <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: `url("https://i.postimg.cc/6p64jPp0/image.png")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.4' }}></div>
        <div className="absolute inset-0 bg-black opacity-30 pointer-events-none z-0"></div>
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 z-10 custom-scrollbar scroll-smooth">
          <div className="flex justify-center mb-4"><span className="bg-[#1f2c34] text-gray-300 text-[10px] py-0.5 px-2 rounded shadow-sm uppercase font-semibold tracking-wider border border-white/5">Hoje</span></div>
          <div className="flex justify-center mb-6"><div className="bg-[#1f2c34] text-[#ffd279] text-xs py-1.5 px-3 rounded-lg text-center max-w-sm border border-yellow-600/20">🔒 Mensagens criptografadas</div></div>
          {messages.map((msg) => {
            const isCtaMessage = msg.sender === 'user' && msg.text === "Quero automatizar meu atendimento no WhatsApp";
            
            return (
              <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  onClick={isCtaMessage ? (e) => {
                    e.stopPropagation();
                    window.open('https://wa.me/5585991872205?text=Olá!%20Vi%20a%20simulação%20e%20quero%20automatizar%20meu%20atendimento%20no%20WhatsApp!', '_blank');
                  } : undefined}
                  className={`max-w-[80%] rounded-lg p-2 px-3 text-[13px] shadow-md relative ${
                    msg.sender === 'user' 
                      ? `bg-[#005c4b] text-white rounded-tr-none ${isCtaMessage ? 'cursor-pointer hover:bg-[#00704f] hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ring-1 ring-emerald-400/30' : ''}` 
                      : 'bg-[#202c33] text-white rounded-tl-none'
                  }`}
                  title={isCtaMessage ? 'Clique para falar comigo no WhatsApp!' : undefined}
                >
                  <p className="leading-relaxed text-[14px]">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1"><span className="text-[10px] text-gray-400">{msg.time}</span>{msg.sender === 'user' && (<CheckCheck size={12} className="text-[#53bdeb]" />)}</div>
                </div>
              </div>
            );
          })}
          {isBotTyping && (<div className="flex w-full justify-start relative animate-fade-in"><div className="bg-[#202c33] p-2 rounded-xl rounded-tl-none flex items-center gap-1 shadow-sm w-12"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div></div></div>)}
        </div>
        <div className="bg-[#202c33] px-3 py-2 flex items-center gap-3 z-20 border-t border-gray-700">
          <Smile size={20} className="text-gray-400 hover:text-gray-200 cursor-pointer" role="button" aria-label="Inserir emoji" />
          <Paperclip size={20} className="text-gray-400 hover:text-gray-200 cursor-pointer" role="button" aria-label="Anexar arquivo" />
          <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 flex items-center h-10">
            <span className="text-white text-sm line-clamp-1">{inputValue}<span className="animate-pulse border-r-2 border-white ml-0.5 inline-block align-middle h-4"></span></span>
            {!inputValue && <span className="text-gray-400 text-sm">Mensagem</span>}
          </div>
          {inputValue ? (
            <Send 
              size={20} 
              className="text-[#00a884] cursor-pointer hover:text-emerald-400 transition-colors" 
              role="button" 
              aria-label="Falar no WhatsApp" 
              onClick={(e) => {
                e.stopPropagation();
                window.open('https://wa.me/5585991872205?text=Olá!%20Vi%20a%20simulação%20e%20quero%20automatizar%20meu%20atendimento%20no%20WhatsApp!', '_blank');
              }}
              title="Clique para conversar comigo no WhatsApp!"
            />
          ) : (
            <Mic size={20} className="text-gray-400 cursor-pointer hover:text-gray-200" role="button" aria-label="Gravar áudio" />
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppSimulator;
