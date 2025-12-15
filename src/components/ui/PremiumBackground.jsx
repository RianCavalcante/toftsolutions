export const PremiumBackground = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Gradient radial principal */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0a0a0a] via-black to-black"></div>
      
      {/* Subtle glow spots */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-emerald-500/[0.02] rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/[0.015] rounded-full blur-[100px]"></div>
      
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at center, transparent 0%, transparent 60%, rgba(0,0,0,0.3) 100%)'
      }}></div>
    </div>
  );
};
