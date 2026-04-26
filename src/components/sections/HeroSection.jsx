import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ DATA, scrollTo, fadeInUp, scaleIn }) => {
  return (
    <section id="home" className="min-h-screen flex flex-col pt-16 md:pt-20 relative overflow-hidden">
      {/* Background Decorative Blob */}
      <motion.div 
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-20 w-60 md:w-96 h-60 md:h-96 bg-[#BAE6FD]/40 rounded-full blur-3xl -z-10"
      />
      <motion.div 
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -left-20 w-48 md:w-72 h-48 md:h-72 bg-[#0EA5E9]/20 rounded-full blur-3xl -z-10"
      />

      <div className="container mx-auto px-5 md:px-12 flex flex-col-reverse md:flex-row items-center md:items-stretch justify-between gap-4 md:gap-12 relative z-10 flex-1 pb-6 md:pb-0">
        
        {/* BAGIAN KIRI: TEKS & CTA */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left flex flex-col md:justify-center"
        >
          <div className="flex justify-center md:justify-start mb-4 md:mb-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/60 backdrop-blur-md text-[#0284C7] font-bold text-[10px] md:text-sm border border-[#0EA5E9]/20 shadow-[0_4px_15px_rgba(14,165,233,0.1)] relative overflow-hidden group hover:border-[#0EA5E9]/40 transition-colors"
            >
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0EA5E9] opacity-75"></span>
                <span className="relative inline-flex rounded-full w-2 h-2 bg-[#0EA5E9]"></span>
              </span>
              <span className="tracking-[0.15em] uppercase">{DATA.profile.role}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </motion.div>
          </div>
          <h1 className="text-[1.65rem] sm:text-4xl md:text-7xl font-bold mb-2 md:mb-6 text-[#0F172A] font-heading leading-tight">
            Hi, I'm<br className="md:hidden" /> {DATA.profile.name}.
          </h1>
          <p className="text-sm sm:text-base md:text-2xl text-[#334155] mb-4 md:mb-8 font-light max-w-2xl mx-auto md:mx-0">
            {DATA.profile.tagline}
          </p>
          
          <div className="flex flex-row gap-2 sm:gap-4 justify-center md:justify-start items-center mb-4 md:mb-8 w-full sm:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('projects')} 
              className="px-4 sm:px-6 md:px-8 py-2 md:py-3 rounded-full bg-[#0EA5E9] text-white font-medium text-xs sm:text-sm md:text-base hover:bg-[#0284C7] hover:shadow-lg hover:shadow-[#0EA5E9]/30 transition-all duration-300 flex-1 sm:flex-none"
            >
              Lihat Project
            </motion.button>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={DATA.profile.cv_id} target="_blank" rel="noreferrer" className="px-4 sm:px-5 md:px-6 py-2 md:py-3 rounded-full border-2 border-[#0EA5E9] text-[#334155] font-medium text-xs sm:text-sm md:text-base hover:bg-[#BAE6FD]/30 transition-all duration-300 flex-1 sm:flex-none text-center inline-block"
            >
              CV (ID)
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={DATA.profile.cv_en} target="_blank" rel="noreferrer" className="px-4 sm:px-5 md:px-6 py-2 md:py-3 rounded-full border-2 border-[#0EA5E9] text-[#334155] font-medium text-xs sm:text-sm md:text-base hover:bg-[#BAE6FD]/30 transition-all duration-300 flex-1 sm:flex-none text-center inline-block"
            >
              CV (EN)
            </motion.a>
          </div>

          {/* SOSIAL MEDIA DI HOME */}
          <div className="flex gap-3 md:gap-4 justify-center md:justify-start items-center">
            {DATA.socials.map((social) => (
              <motion.a 
                key={social.name} 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, backgroundColor: social.hex, color: 'white' }}
                href={social.url} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 md:w-10 md:h-10 bg-white/40 rounded-full flex items-center justify-center text-[#334155] shadow-sm transition-all duration-300" 
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* BAGIAN KANAN: FOTO PROFIL */}
        <motion.div 
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex-1 flex justify-center md:justify-end md:self-end"
        >
          <div className="relative w-full max-w-[16rem] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl flex items-end justify-center">
            
            {/* Dekorasi Blob / Lingkaran Solid di Belakang */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] bg-gradient-to-tr from-[#0EA5E9]/20 to-[#BAE6FD]/40 rounded-full border-2 border-white/50 backdrop-blur-sm -z-10"></div>
            
            {/* Efek glow tambahan */}
            <div className="absolute inset-x-0 bottom-0 w-full h-2/3 bg-gradient-to-t from-[#BAE6FD]/60 to-transparent rounded-full blur-3xl animate-pulse -z-20"></div>
            
            {/* Floating Icons Gained Depth */}
            
            {/* VS Code - Paling Dekat (Paling Besar) */}
            <div 
              className="absolute top-[38%] -left-1 sm:-left-3 md:-left-8 lg:-left-12 -rotate-12 z-40 drop-shadow-2xl"
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" alt="VS Code" width={56} height={56} className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain hover:scale-110 transition-transform cursor-pointer" />
            </div>

            {/* Premiere Pro - Jarak Menengah */}
            <div 
              className="absolute bottom-[24%] -right-1 sm:-right-2 md:-right-8 lg:-right-12 rotate-6 z-40 drop-shadow-lg"
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg" alt="Premiere Pro" width={56} height={56} className="w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 object-contain hover:scale-110 transition-transform cursor-pointer" />
            </div>

            {/* Figma - Paling Jauh (Kecil, Blurry di Mobile) */}
            <div 
              className="absolute top-[22%] right-4 sm:right-2 md:-right-6 lg:-right-10 rotate-12 z-20 drop-shadow-sm opacity-80"
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" alt="Figma" width={64} height={64} className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 object-contain hover:scale-110 transition-transform cursor-pointer blur-[1px] md:blur-none" />
            </div>

            {/* Foto Utama */}
            <img 
              src={DATA.profile.image} 
              alt={DATA.profile.name} 
              width={600} height={600}
              className="relative z-10 w-full h-auto object-bottom"
            />
            {/* Efek pudar di bawah foto */}
            <div className="absolute bottom-0 left-0 right-0 h-32 md:h-44 bg-gradient-to-t from-[#F0F9FF] via-[#F0F9FF]/80 to-transparent z-30 pointer-events-none"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
