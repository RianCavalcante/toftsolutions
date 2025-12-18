import React, { useState, useEffect, useRef } from 'react';
import { useOnScreen } from '../../hooks/useVisualEffects';

export const HoverWord = ({ text, className = "" }) => (
  <span className={`hover-word ${className}`} role="text" aria-label={text}>
    {text.split("").map((char, idx) => {
      const safeChar = char === " " ? "\u00A0" : char;
      return (
        <span
          key={`${char}-${idx}`}
          aria-hidden="true"
          data-char={safeChar}
          style={{ "--delay": `${idx * 18}ms` }}
        >
          {safeChar}
        </span>
      );
    })}
  </span>
);

export const RevealText = ({ text, className }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: `${index * 30}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 origin-left"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </div>
  );
};

export const RevealOnScroll = ({ children, className }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref, 0.2);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const StripedPattern = ({ className }) => (
  <div className={`absolute inset-0 -z-10 h-full w-full pointer-events-none ${className}`}>
    <svg className="absolute h-full w-full stroke-white/10 opacity-50" fill="none">
      <defs>
        <pattern id="striped-pattern" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <path d="M.5 40V.5H40" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth="0" fill="url(#striped-pattern)" />
    </svg>
  </div>
);
