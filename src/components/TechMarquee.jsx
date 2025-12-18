import React from 'react';

const TechMarquee = () => {
  const techs = [
    { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "n8n", url: "https://cdn.simpleicons.org/n8n/EE4F27" },
    { name: "Make", url: "https://cdn.simpleicons.org/make/6842FF" },
    { name: "Zapier", url: "https://cdn.simpleicons.org/zapier/FF4A00" },
    { name: "OpenAI", url: "https://cdn.simpleicons.org/openai/39C09E" },
    { name: "Gemini", url: "https://cdn.simpleicons.org/googlegemini/4285F4" },
    { name: "Hostinger", url: "https://cdn.simpleicons.org/hostinger/674CC4" },
    { name: "DigitalOcean", url: "https://cdn.simpleicons.org/digitalocean/0080FF" },
    { name: "Supabase", url: "https://cdn.simpleicons.org/supabase/3ECF8E" },
    { name: "Firebase", url: "https://cdn.simpleicons.org/firebase/FFCA28" },
    { name: "PostgreSQL", url: "https://cdn.simpleicons.org/postgresql/4169E1" },
    { name: "Redis", url: "https://cdn.simpleicons.org/redis/DC382D" },
  ];

  return (
    <div className="py-16 border-t border-white/5 bg-[#000000] overflow-hidden relative w-full">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.25em]">Stack Tecnológica & Integrações</p>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#000000] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#000000] to-transparent z-10 pointer-events-none"></div>
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-24 px-10">
          {[...techs, ...techs, ...techs].map((tech, index) => (
            <div key={index} className="flex items-center gap-4 group/item cursor-default opacity-60 hover:opacity-100 transition-opacity duration-300">
               <img src={tech.url} alt={tech.name} width={32} height={32} className="w-8 h-8 object-contain filter grayscale group-hover/item:grayscale-0 transition-all duration-300" />
               <span className="text-lg font-sans font-semibold tracking-tight text-gray-400 group-hover/item:text-white transition-colors duration-300">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechMarquee;
