import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../lib/utils";

// Versão que funciona com scroll da página (não container interno)
export const StickyScrollWithProgress = ({ content }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Calcula progresso baseado na posição do container na viewport
      const scrollProgress = Math.max(0, Math.min(1, 
        (-containerTop + viewportHeight * 0.3) / (containerHeight - viewportHeight * 0.5)
      ));
      
      // Determina qual item está ativo
      const newIndex = Math.min(
        content.length - 1,
        Math.floor(scrollProgress * content.length)
      );
      
      if (newIndex !== activeIndex && newIndex >= 0) {
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Chama uma vez para inicializar
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [content.length, activeIndex]);

  return (
    <div ref={containerRef} className="relative min-h-[600px]">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Left side - Steps with progress line */}
        <div className="relative flex-1 max-w-md">
          {/* Progress line background */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-white/10 rounded-full" />
          
          {/* Active progress line */}
          <motion.div
            className="absolute left-[7px] top-2 w-[2px] bg-gradient-to-b from-cyan-500 to-emerald-500 rounded-full"
            initial={{ height: 0 }}
            animate={{ 
              height: `${Math.min(100, ((activeIndex + 1) / content.length) * 100)}%` 
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Steps */}
          <div className="space-y-8">
            {content.map((item, index) => (
              <motion.div
                key={index}
                className={cn(
                  "relative pl-8 transition-all duration-500 cursor-pointer",
                  activeIndex === index ? "opacity-100" : "opacity-40 hover:opacity-60"
                )}
                onClick={() => setActiveIndex(index)}
                animate={{ 
                  x: activeIndex === index ? 8 : 0,
                  scale: activeIndex === index ? 1 : 0.98
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Step indicator dot */}
                <motion.div
                  className={cn(
                    "absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300",
                    activeIndex >= index
                      ? "bg-gradient-to-br from-cyan-500 to-emerald-500 border-transparent shadow-lg shadow-cyan-500/30"
                      : "bg-[#0a0a0a] border-white/20"
                  )}
                  animate={{ scale: activeIndex === index ? 1.2 : 1 }}
                />
                
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-2">
                  <span className={cn(
                    "transition-colors duration-300",
                    activeIndex === index ? "text-cyan-400" : "text-white/40"
                  )}>
                    {item.icon}
                  </span>
                  <h3 className={cn(
                    "text-lg font-semibold transition-colors duration-300",
                    activeIndex === index ? "text-white" : "text-white/60"
                  )}>
                    {item.title}
                  </h3>
                </div>
                
                <p className={cn(
                  "text-sm leading-relaxed transition-colors duration-300",
                  activeIndex === index ? "text-gray-400" : "text-gray-600"
                )}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right side - Content display (sticky) */}
        <div className="flex-1 hidden lg:block">
          <div className="sticky top-32">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-[320px] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
            >
              {content[activeIndex]?.content}
            </motion.div>
            
            {/* Step indicator dots */}
            <div className="flex justify-center gap-2 mt-6">
              {content.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    activeIndex === index 
                      ? "bg-cyan-500 w-6" 
                      : "bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile: Show active content below steps */}
      <div className="lg:hidden mt-8">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full h-[280px] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden"
        >
          {content[activeIndex]?.content}
        </motion.div>
      </div>
    </div>
  );
};

export default StickyScrollWithProgress;
