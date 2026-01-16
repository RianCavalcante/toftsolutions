export const PremiumBackground = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className} overflow-hidden`}>
      {/* Gradient radial principal - Static, hardware accelerated */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0a0a0a] via-black to-black translate-z-0"></div>
      
      {/* Optimized Glow Spots - Reduced blur radius and removed frequent animation */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[80px] translate-z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/[0.02] rounded-full blur-[60px] translate-z-0"></div>
      
      {/* Static Noise Overlay - Replaces expensive SVG filter */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      ></div>
      
      {/* Vignette using CSS gradients only */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_60%,rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>
    </div>
  );
};
