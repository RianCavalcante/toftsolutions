import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

// Main Navbar Container
export const Navbar = ({ children, className }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled 
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5" 
          : "bg-transparent",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {children}
      </div>
    </motion.nav>
  );
};

// Desktop Nav Body
export const NavBody = ({ children, className }) => {
  return (
    <div className={cn("hidden md:flex items-center justify-between py-4", className)}>
      {children}
    </div>
  );
};

// Nav Items Container
export const NavItems = ({ items, className }) => {
  return (
    <div className={cn("flex items-center gap-8", className)}>
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          className="text-sm text-gray-400 hover:text-white transition-colors duration-300 relative group"
        >
          {item.name}
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
        </a>
      ))}
    </div>
  );
};

// Logo Component
export const NavbarLogo = ({ className }) => {
  return (
    <a href="/" className={cn("flex items-center gap-2", className)}>
      <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-serif font-bold text-lg">
        T
      </div>
      <span className="text-lg font-bold text-white">ToftSolutions</span>
    </a>
  );
};

// Button Component
export const NavbarButton = ({ children, variant = "primary", className, onClick }) => {
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200",
    secondary: "bg-transparent border border-white/20 text-white hover:bg-white/5",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

// Mobile Nav Container
export const MobileNav = ({ children, className }) => {
  return (
    <div className={cn("md:hidden", className)}>
      {children}
    </div>
  );
};

// Mobile Nav Header
export const MobileNavHeader = ({ children, className }) => {
  return (
    <div className={cn("flex items-center justify-between py-4", className)}>
      {children}
    </div>
  );
};

// Mobile Nav Toggle Button
export const MobileNavToggle = ({ isOpen, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn("text-white p-2 relative w-10 h-10 flex items-center justify-center", className)}
    >
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -4 }}
        className="absolute w-5 h-0.5 bg-white"
      />
      <motion.span
        animate={{ opacity: isOpen ? 0 : 1 }}
        className="absolute w-5 h-0.5 bg-white"
      />
      <motion.span
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 4 }}
        className="absolute w-5 h-0.5 bg-white"
      />
    </button>
  );
};

// Mobile Nav Menu
export const MobileNavMenu = ({ isOpen, onClose, children, className }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/5",
            className
          )}
        >
          <div className="flex flex-col gap-4 py-6 px-4">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
