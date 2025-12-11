import React, { useState, useEffect, useRef } from 'react';
import { Send, MoreVertical, Search, Paperclip, Mic, CheckCheck, Smile, MessageCircle, Users, Clock, Zap, Shield, BarChart3, Calendar, Bot, ChevronDown, Phone, Mail, Linkedin, Instagram, ArrowRight, Check, Star, Menu, X } from 'lucide-react';

// =============================================
// COMPONENTE DO SIMULADOR WHATSAPP (NÃO ALTERADO)
// =============================================
const WhatsAppSimulator = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  const script = [
    {
      role: 'bot',
      text: "Olá! 👋 Sou o assistente da ToftSolutions AI. Como posso ajudar?",
      delay: 1000
    },
    {
      role: 'user',
      text: "Quero automatizar meu atendimento no WhatsApp",
      delay: 1500
    },
    {
      role: 'bot',
      text: "Perfeito! 🚀 Posso criar um agente de IA que responde 24/7 e qualifica leads. Qual seu segmento?",
      delay: 1500
    },
    {
      role: 'input_loop',
      variations: [
        "Trabalho com e-commerce 📦💻",
        "Trabalho com imobiliária 🏡🔑",
        "Tenho um escritório de advocacia ⚖️👨‍⚖️",
        "Tenho uma clínica dentária 🦷⚕️",
        "Sou dono de restaurante 🍔🍷",
        "Meu escritório precisa disso 🏢💼",
        "Minha clínica necessita dessa automação 🏥🤖"
      ],
      delay: 1000
    }
  ];

  const [scriptIndex, setScriptIndex] = useState(0);
  const [typingLoopIndex, setTypingLoopIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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
            addMessage({
              id: Date.now(),
              text: currentStep.text,
              sender: 'bot',
              time: getCurrentTime(),
              status: 'read'
            });
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
                addMessage({
                  id: Date.now(),
                  text: textToType,
                  sender: 'user',
                  time: getCurrentTime(),
                  status: 'sent'
                });
                setInputValue("");
                setScriptIndex(prev => prev + 1);
              }, 500);
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

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="w-full max-w-lg bg-[#0b141a] rounded-2xl overflow-hidden shadow-2xl border border-purple-500/20 relative flex flex-col" style={{height: '480px'}}>
      {/* Header */}
      <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between z-20 shadow-md border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src="https://i.postimg.cc/gkb6bJNv/PERFIL-DO-LINKEDIN.jpg" 
              alt="Avatar" 
              className="w-10 h-10 rounded-full bg-gray-600 object-cover"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#202c33]"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-100 font-medium text-sm">ToftSolutions AI</span>
            <span className="text-gray-400 text-xs">
              {isBotTyping ? 'digitando...' : 'online'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <Search size={18} />
          <MoreVertical size={18} />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 relative bg-[#0b141a] overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url("https://i.postimg.cc/6p64jPp0/image.png")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: '0.4'
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-30 pointer-events-none z-0"></div>

        <div className="absolute inset-0 overflow-y-auto p-4 space-y-3 z-10">
          <div className="flex justify-center mb-4">
            <span className="bg-[#1f2c34] text-gray-300 text-xs py-1 px-3 rounded-lg uppercase font-medium">
              Hoje
            </span>
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="bg-[#1f2c34] text-[#ffd279] text-xs py-1.5 px-3 rounded-lg text-center max-w-sm border border-yellow-600/20">
               🔒 Mensagens criptografadas
            </div>
          </div>

          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[75%] rounded-lg p-2 px-3 text-sm shadow-md relative
                  ${msg.sender === 'user' 
                    ? 'bg-[#005c4b] text-white rounded-tr-none' 
                    : 'bg-[#202c33] text-white rounded-tl-none'}
                `}
              >
                <p className="leading-relaxed text-[14px]">{msg.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-gray-400">{msg.time}</span>
                  {msg.sender === 'user' && (
                    <CheckCheck size={14} className="text-[#53bdeb]" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {isBotTyping && (
            <div className="flex w-full justify-start">
              <div className="bg-[#202c33] p-3 rounded-xl rounded-tl-none flex items-center gap-1 shadow-sm">
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#202c33] px-3 py-2 flex items-center gap-3 z-20 border-t border-gray-700">
        <Smile size={20} className="text-gray-400" />
        <Paperclip size={20} className="text-gray-400" />
        <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 flex items-center">
          <span className="text-white text-sm">
            {inputValue}
            <span className="animate-pulse border-r-2 border-white ml-0.5 inline-block align-middle"></span>
          </span>
          {!inputValue && <span className="text-gray-400 text-sm">Mensagem</span>}
        </div>
        {inputValue ? (
          <Send size={20} className="text-[#00a884]" />
        ) : (
          <Mic size={20} className="text-gray-400" />
        )}
      </div>
    </div>
  );
};

// =============================================
// COMPONENTE PRINCIPAL DO SITE
// =============================================
const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const services = [
    { icon: Bot, title: "Atendimento Automatizado", desc: "Agentes de IA que respondem instantaneamente, 24 horas por dia, 7 dias por semana." },
    { icon: Users, title: "Qualificação de Leads", desc: "Identifique e qualifique potenciais clientes automaticamente com perguntas inteligentes." },
    { icon: Calendar, title: "Agendamento Automático", desc: "Agende reuniões e compromissos sem intervenção humana." },
    { icon: MessageCircle, title: "Multi-Plataforma", desc: "Integração com WhatsApp, Instagram, Telegram e mais." },
  ];

  const benefits = [
    { icon: Clock, title: "24/7 Disponível", value: "100%", desc: "Atendimento ininterrupto" },
    { icon: Zap, title: "Resposta Instantânea", value: "<3s", desc: "Tempo médio de resposta" },
    { icon: BarChart3, title: "Aumento em Vendas", value: "+40%", desc: "Conversão de leads" },
    { icon: Shield, title: "Redução de Custos", value: "-60%", desc: "Em atendimento" },
  ];

  const steps = [
    { num: "01", title: "Análise", desc: "Entendemos seu negócio e necessidades específicas" },
    { num: "02", title: "Desenvolvimento", desc: "Criamos seu agente de IA personalizado" },
    { num: "03", title: "Integração", desc: "Conectamos às suas plataformas de atendimento" },
    { num: "04", title: "Otimização", desc: "Melhoramos continuamente baseado em resultados" },
  ];

  const faqs = [
    { q: "Como funciona a IA de atendimento?", a: "Nossa IA é treinada para entender e responder perguntas sobre seu negócio, qualificar leads e direcionar clientes para as soluções certas, tudo de forma automática." },
    { q: "Quanto tempo para implementar?", a: "A implementação básica leva de 3 a 7 dias úteis. Projetos mais complexos podem levar até 2 semanas." },
    { q: "Preciso de conhecimento técnico?", a: "Não! Cuidamos de toda a parte técnica. Você só precisa nos fornecer informações sobre seu negócio." },
    { q: "A IA substitui atendentes humanos?", a: "A IA complementa sua equipe, lidando com perguntas frequentes e qualificação inicial, liberando seus atendentes para casos mais complexos." },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xl">T</div>
            <span className="text-xl font-bold">ToftSolutions<span className="text-purple-400">.AI</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-gray-400 hover:text-white transition">Sobre</a>
            <a href="#servicos" className="text-gray-400 hover:text-white transition">Serviços</a>
            <a href="#beneficios" className="text-gray-400 hover:text-white transition">Benefícios</a>
            <a href="#faq" className="text-gray-400 hover:text-white transition">FAQ</a>
          </div>

          <a href="https://wa.me/5500000000000" className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-medium hover:opacity-90 transition">
            <MessageCircle size={18} />
            Fale Conosco
          </a>

          <button className="md:hidden text-gray-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#12121a] border-t border-white/5 p-6 space-y-4">
            <a href="#sobre" className="block text-gray-300 hover:text-white">Sobre</a>
            <a href="#servicos" className="block text-gray-300 hover:text-white">Serviços</a>
            <a href="#beneficios" className="block text-gray-300 hover:text-white">Benefícios</a>
            <a href="#faq" className="block text-gray-300 hover:text-white">FAQ</a>
            <a href="https://wa.me/5500000000000" className="block w-full text-center py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-medium">
              Fale Conosco
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm">
              <Zap size={16} />
              Automação Inteligente com IA
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Transforme seu
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Negócio com IA
              </span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-xl">
              Liberte sua equipe de tarefas repetitivas. Nossos agentes de IA trabalham 24/7 para automatizar atendimento, qualificar leads e escalar suas operações.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="https://wa.me/5500000000000" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full font-medium hover:opacity-90 transition shadow-lg shadow-green-500/25">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Conversar no WhatsApp
              </a>
              <a href="#servicos" className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full font-medium hover:bg-white/5 transition">
                Ver Serviços
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">500+</div>
                <div className="text-sm text-gray-500">Clientes</div>
              </div>
              <div className="w-px h-10 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">1M+</div>
                <div className="text-sm text-gray-500">Mensagens/mês</div>
              </div>
              <div className="w-px h-10 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">99.9%</div>
                <div className="text-sm text-gray-500">Uptime</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <WhatsAppSimulator />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 px-6 bg-gradient-to-b from-transparent to-purple-900/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Soluções completas de automação com IA para transformar seu atendimento</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div key={i} className="group p-6 bg-[#12121a] border border-white/5 rounded-2xl hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 mb-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center text-purple-400 group-hover:scale-110 transition">
                  <service.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-400 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que Escolher a ToftSolutions?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Resultados comprovados que fazem a diferença no seu negócio</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <div key={i} className="text-center p-8 bg-gradient-to-b from-[#12121a] to-transparent border border-white/5 rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <benefit.icon size={28} className="text-white" />
                </div>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">{benefit.value}</div>
                <h3 className="font-semibold mb-1">{benefit.title}</h3>
                <p className="text-gray-500 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-blue-900/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Processo simples e eficiente para automatizar seu atendimento</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-purple-500/10 absolute -top-4 left-0">{step.num}</div>
                <div className="relative z-10 pt-8">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-gray-400">Tire suas dúvidas sobre nossos serviços</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                <button 
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown size={20} className={`text-gray-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-4 text-gray-400">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center p-12 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para Automatizar?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Junte-se a centenas de empresas que já transformaram seu atendimento com a ToftSolutions AI
          </p>
          <a href="https://wa.me/5500000000000" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full font-medium text-lg hover:opacity-90 transition shadow-lg shadow-green-500/25">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Começar Agora
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold">T</div>
                <span className="font-bold">ToftSolutions<span className="text-purple-400">.AI</span></span>
              </div>
              <p className="text-gray-500 text-sm">Automação inteligente com IA para transformar seu negócio.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <a href="#servicos" className="block hover:text-white transition">Serviços</a>
                <a href="#beneficios" className="block hover:text-white transition">Benefícios</a>
                <a href="#faq" className="block hover:text-white transition">FAQ</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <a href="https://wa.me/5500000000000" className="flex items-center gap-2 hover:text-white transition">
                  <Phone size={14} /> WhatsApp
                </a>
                <a href="mailto:contato@toftsolutions.ai" className="flex items-center gap-2 hover:text-white transition">
                  <Mail size={14} /> Email
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Redes Sociais</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 transition">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/20 transition">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} ToftSolutions AI. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      <style>{`
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default App;
