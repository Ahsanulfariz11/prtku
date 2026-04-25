import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useData } from './useData';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ExternalLink, Code2, Layout, Database, Terminal,
  GitBranch, MonitorSmartphone, Send, Briefcase, Mail,
  CheckCircle2, Clock, Lightbulb, Globe, Image, UserCircle, BookOpen
} from 'lucide-react';

// Brand icons were removed in recent Lucide versions.
// Mapping missing icons to standard ones as placeholders.
const Github = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const Instagram = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const Facebook = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Figma = Layout;

// Memperbaiki ReferenceError untuk tailwind di beberapa environment
if (typeof window !== 'undefined') {
  window.tailwind = window.tailwind || {};
}

// Komponen SVG Logo WhatsApp Spesifik
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

// Komponen SVG Logo TikTok
const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// --- ICON MAP UNTUK SOSIAL MEDIA ---
const SOCIAL_ICON_MAP = {
  TikTok: TikTokIcon,
  GitHub: Github,
  Instagram: Instagram,
  Facebook: Facebook,
  LinkedIn: Linkedin,
  WhatsApp: WhatsAppIcon,
};

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

// --- KONFIGURASI STATUS PROJECT ---
const PROJECT_STATUS = {
  rilis: { label: "Udah Rilis", icon: <CheckCircle2 size={14} />, style: "bg-[#BAE6FD] text-[#0F172A]" },
  progress: { label: "Dikerjakan", icon: <Clock size={14} />, style: "bg-yellow-200 text-yellow-800" },
  konsep: { label: "Konsep", icon: <Lightbulb size={14} />, style: "bg-gray-200 text-gray-700" }
};

// --- KOMPONEN UTAMA ---
export default function App() {
  const { data: rawData } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate AJAX Request
    try {
      // In production, you would use fetch('your-endpoint', { method: 'POST', ... })
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    } catch (err) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  // Merge data with social icons (icons can't be stored in JSON)
  const DATA = useMemo(() => ({
    ...rawData,
    socials: (rawData.socials || []).map(s => ({
      ...s,
      icon: (() => {
        const IconComp = SOCIAL_ICON_MAP[s.name];
        return IconComp ? <IconComp size={20} /> : <Globe size={20} />;
      })()
    }))
  }), [rawData]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] text-[#0F172A] font-sans selection:bg-[#BAE6FD] selection:text-[#0F172A] overflow-x-hidden">
      {/* Injecting Fonts */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Poppins:wght@500;600;700&display=swap');
        h1, h2, h3, h4, h5, h6, .font-heading { font-family: 'Poppins', sans-serif; }
        body { font-family: 'Inter', sans-serif; }
        html { scroll-behavior: smooth; }
      `}} />

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#F0F9FF]/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <img src="/itku-logo.png" alt="ITku Logo" className="h-8 md:h-10 w-auto" />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 font-medium">
            {['Home', 'About', 'Projects', 'Contact'].map((item, i) => (
              <motion.button 
                key={item} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollTo(item.toLowerCase())} 
                className="hover:text-[#0EA5E9] transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0EA5E9] transition-all group-hover:w-full"></span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-[#0F172A]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-[#F0F9FF]/95 backdrop-blur-xl shadow-xl flex flex-col py-6 px-6 gap-1 md:hidden border-t border-[#BAE6FD]/30 overflow-hidden"
            >
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-left py-3 px-4 font-medium hover:text-[#0EA5E9] hover:bg-[#BAE6FD]/20 rounded-xl transition-all">
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
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
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-[#BAE6FD]/30 text-[#334155] font-medium text-xs md:text-sm mb-3 md:mb-6 border border-[#BAE6FD]/50">
                {DATA.profile.role}
              </span>
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
              {DATA.socials.map((social, i) => (
                <motion.a 
                  key={i} 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
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
              
              {/* Floating Icons - hidden on mobile to prevent overlap */}
              <div 
                className="hidden sm:block absolute top-1/3 -left-1 md:-left-8 lg:-left-12 -rotate-6 z-40 hover:scale-110 transition-transform cursor-pointer drop-shadow-lg"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" alt="VS Code" className="w-10 h-10 md:w-14 md:h-14 object-contain" />
              </div>
              <div 
                className="hidden sm:block absolute bottom-20 md:bottom-32 -right-2 md:-right-8 lg:-right-12 rotate-6 z-40 hover:scale-110 transition-transform cursor-pointer drop-shadow-lg"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg" alt="Premiere Pro" className="w-10 h-10 md:w-14 md:h-14 object-contain" />
              </div>
              <div 
                className="hidden sm:block absolute top-16 md:top-24 right-0 md:-right-6 lg:-right-10 rotate-12 z-40 hover:scale-110 transition-transform cursor-pointer drop-shadow-lg"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" alt="Figma" className="w-10 h-10 md:w-16 md:h-16 object-contain" />
              </div>

              {/* Foto Utama */}
              <img 
                src={DATA.profile.image} 
                alt={DATA.profile.name} 
                className="relative z-10 w-full h-auto object-bottom"
              />
              {/* Efek pudar di bawah foto */}
              <div className="absolute bottom-0 left-0 right-0 h-32 md:h-44 bg-gradient-to-t from-[#F0F9FF] via-[#F0F9FF]/80 to-transparent z-30 pointer-events-none"></div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ABOUT & SKILLS SECTION */}
      <section id="about" className="py-14 md:py-24 bg-white/50">
        <div className="container mx-auto px-5 md:px-12">
          
          <div className="max-w-4xl mx-auto mb-14 md:mb-24 space-y-10 md:space-y-16">
            {/* TENTANG SAYA */}
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="reveal-element"
            >
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 font-heading flex items-center justify-center gap-2 md:gap-3 text-center">
                <MonitorSmartphone size={22} className="text-[#0EA5E9]" /> Tentang Saya
              </h2>
              <p className="text-[#0F172A]/80 leading-relaxed text-sm md:text-lg text-justify md:text-center whitespace-pre-line">
                {DATA.profile.about}
              </p>
            </motion.div>

            {/* PENDIDIKAN & PENGALAMAN KERJA */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-12">
              {/* PENDIDIKAN */}
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-lg md:text-3xl font-bold mb-4 md:mb-8 font-heading flex items-center gap-2 md:gap-3">
                  <BookOpen size={18} className="text-[#0EA5E9] shrink-0" /> Pendidikan
                </h3>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4 md:space-y-6">
                  {DATA.educations.map((edu, i) => (
                    <motion.div 
                      key={i} 
                      variants={fadeInUp}
                      className="flex flex-col gap-2 md:gap-4 bg-white p-3.5 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-[#BAE6FD]/20 hover:border-[#0EA5E9] transition-colors group"
                    >
                      <div>
                        <span className="inline-block px-2.5 py-0.5 md:px-3 md:py-1 bg-[#F0F9FF] text-[#334155] rounded-md text-[10px] md:text-xs font-bold tracking-wider mb-1.5 md:mb-2 border border-[#BAE6FD]/50">
                          {edu.year}
                        </span>
                        <h4 className="font-heading font-bold text-sm md:text-lg text-[#0F172A] group-hover:text-[#334155] transition-colors">{edu.role}</h4>
                        <span className="text-[#0EA5E9] font-medium text-xs md:text-sm">{edu.company}</span>
                      </div>
                      <div className="pt-2.5 md:pt-4 border-t border-[#BAE6FD]/30">
                        <p className="text-[#0F172A]/80 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                          {edu.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* PENGALAMAN */}
              <motion.div 
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-lg md:text-3xl font-bold mb-4 md:mb-8 font-heading flex items-center gap-2 md:gap-3">
                  <Briefcase size={18} className="text-[#0EA5E9] shrink-0" /> Pengalaman
                </h3>
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4 md:space-y-6">
                  {DATA.experiences.map((exp, i) => (
                    <motion.div 
                      key={i} 
                      variants={fadeInUp}
                      className="flex flex-col gap-2 md:gap-4 bg-white p-3.5 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-[#BAE6FD]/20 hover:border-[#0EA5E9] transition-colors group"
                    >
                      <div>
                        <span className="inline-block px-2.5 py-0.5 md:px-3 md:py-1 bg-[#F0F9FF] text-[#334155] rounded-md text-[10px] md:text-xs font-bold tracking-wider mb-1.5 md:mb-2 border border-[#BAE6FD]/50">
                          {exp.year}
                        </span>
                        <h4 className="font-heading font-bold text-sm md:text-lg text-[#0F172A] group-hover:text-[#334155] transition-colors">{exp.role}</h4>
                        <span className="text-[#0EA5E9] font-medium text-xs md:text-sm">{exp.company}</span>
                      </div>
                      <div className="pt-2.5 md:pt-4 border-t border-[#BAE6FD]/30">
                        <p className="text-[#0F172A]/80 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                          {exp.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* KEAHLIAN & TOOLS (STYLE BARU) */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8 md:mb-14">
              <h2 className="text-2xl md:text-4xl font-bold font-heading text-[#0F172A]">
                Keahlian & <span className="text-[#0EA5E9]">Tools</span>
              </h2>
            </div>

            <div className="space-y-8 md:space-y-14">
              {DATA.expertise.map((group, idx) => (
                <div key={idx} className="text-center">
                  <h3 className="text-xs md:text-sm font-bold tracking-[0.15em] md:tracking-[0.2em] text-[#0F172A]/50 mb-5 md:mb-8 uppercase">
                    {group.category}
                  </h3>
                  <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2.5 md:gap-5"
                  >
                    {group.items.map((item, i) => (
                      <motion.div 
                        key={i} 
                        variants={scaleIn}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(107, 175, 146, 0.2)" }}
                        className="flex items-center gap-2 md:gap-3 px-3.5 md:px-6 py-2 md:py-3 bg-white rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 cursor-default group"
                      >
                        <img 
                          src={item.icon} 
                          alt={item.name} 
                          className="w-5 h-5 md:w-7 md:h-7 object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                        <span className="font-medium text-[#0F172A] text-xs md:text-base">{item.name}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-14 md:py-24">
        <div className="container mx-auto px-5 md:px-12">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-10"
          >
            <h2 className="text-2xl md:text-4xl font-bold font-heading mb-3 md:mb-4">Featured Projects</h2>
            <p className="text-[#334155] text-sm md:text-base">Beberapa karya terbaik yang memadukan estetika dan performa.</p>
          </motion.div>

          {/* FILTER BUTTONS */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
          >
            {['all', 'rilis', 'progress', 'konsep'].map((f) => (
              <motion.button 
                key={f}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(f)}
                className={`px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${activeFilter === f ? 'bg-[#0EA5E9] text-white shadow-md scale-105' : 'bg-white text-[#334155] border border-[#BAE6FD]/50 hover:bg-[#BAE6FD]/20'}`}
              >
                {f === 'all' ? 'Semua Project' : PROJECT_STATUS[f].label}
              </motion.button>
            ))}
          </motion.div>

          {/* Mobile: horizontal scroll slider / Desktop: grid */}
          <motion.div 
            layout
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth pb-4 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch'}}>
            <AnimatePresence mode="popLayout">
              {DATA.projects.filter(p => activeFilter === 'all' || p.status === activeFilter).map((project, i) => (
                <motion.div 
                  key={project.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="snap-center shrink-0 w-[85vw] sm:w-[70vw] md:w-auto group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#BAE6FD]/20 border border-transparent hover:border-[#BAE6FD]/40 transition-all duration-500"
                >
                  <div className="relative h-44 md:h-56 overflow-hidden">
                    
                    {/* BADGE STATUS */}
                    <div className={`absolute top-3 right-3 md:top-4 md:right-4 z-20 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1 md:gap-1.5 shadow-sm ${PROJECT_STATUS[project.status].style}`}>
                      {PROJECT_STATUS[project.status].icon}
                      {PROJECT_STATUS[project.status].label}
                    </div>

                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="font-heading font-bold text-lg md:text-xl mb-2 group-hover:text-[#334155] transition-colors">{project.title}</h3>
                    <p className="text-[#0F172A]/70 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="text-[10px] md:text-xs font-semibold px-2 py-0.5 md:py-1 bg-[#F0F9FF] text-[#334155] rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                    
                    {/* HIDE TOMBOL DEMO JIKA KONSEP */}
                    {project.status !== 'konsep' && (
                      <div className="flex gap-3">
                        <motion.a 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={project.demo} 
                          className="w-full flex items-center justify-center gap-2 bg-[#0EA5E9] text-white py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-[#0284C7] transition-colors"
                        >
                          <ExternalLink size={14} /> Live Demo
                        </motion.a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Slide indicator - mobile only */}
          <div className="flex md:hidden justify-center gap-1.5 mt-3">
            {DATA.projects.filter(p => activeFilter === 'all' || p.status === activeFilter).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#BAE6FD]"></div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-14 md:py-24 bg-white/50">
        <div className="container mx-auto px-5 md:px-12 max-w-4xl">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#F0F9FF] rounded-2xl md:rounded-3xl p-4 md:p-12 shadow-sm border border-[#BAE6FD]/30"
          >
            <div className="text-center mb-5 md:mb-10">
              <h2 className="text-xl md:text-4xl font-bold font-heading mb-1.5 md:mb-4">Mari Berkolaborasi</h2>
              <p className="text-[#334155] text-xs md:text-base">Pilih jalur komunikasi yang paling nyaman untuk Anda.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6 max-w-2xl mx-auto mb-8 md:mb-12">
              {/* WhatsApp Card */}
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(37, 211, 102, 0.2)" }}
                className="flex flex-col items-center bg-white p-3.5 md:p-8 rounded-xl md:rounded-2xl shadow-sm border border-[#BAE6FD]/40 transition-all duration-300"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-2 md:mb-4">
                  <WhatsAppIcon size={20} className="text-[#25D366] md:hidden" />
                  <WhatsAppIcon size={28} className="text-[#25D366] hidden md:block" />
                </div>
                <h3 className="text-sm md:text-lg font-bold font-heading mb-1 md:mb-2 text-[#0F172A]">WhatsApp</h3>
                <p className="text-center text-[#334155] text-[10px] md:text-sm mb-3 md:mb-6 flex-grow leading-relaxed">Fast response untuk diskusi cepat.</p>
                
                <a 
                  href={`https://wa.me/${DATA.profile.whatsapp}?text=Halo%20${DATA.profile.name},%20saya%20tertarik%20untuk%20berdiskusi%20tentang%20project!`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full bg-[#25D366] text-white py-2 md:py-3 rounded-lg md:rounded-xl font-medium text-xs md:text-base hover:bg-[#1EBE56] hover:shadow-lg hover:shadow-[#25D366]/30 flex justify-center items-center gap-1.5 md:gap-2 transition-all"
                >
                  <Send size={12} className="md:hidden" /><Send size={16} className="hidden md:block" /> Chat WA
                </a>
              </motion.div>

              {/* Email Card */}
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(14, 165, 233, 0.2)" }}
                className="flex flex-col items-center bg-white p-3.5 md:p-8 rounded-xl md:rounded-2xl shadow-sm border border-[#BAE6FD]/40 transition-all duration-300"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 bg-[#0EA5E9]/10 rounded-full flex items-center justify-center mb-2 md:mb-4">
                  <Mail size={20} className="text-[#0EA5E9] md:hidden" />
                  <Mail size={28} className="text-[#0EA5E9] hidden md:block" />
                </div>
                <h3 className="text-sm md:text-lg font-bold font-heading mb-1 md:mb-2 text-[#0F172A]">Email</h3>
                <p className="text-center text-[#334155] text-[10px] md:text-sm mb-3 md:mb-6 flex-grow leading-relaxed">Untuk penawaran dan urusan formal.</p>
                
                <a 
                  href={`mailto:${DATA.profile.email}`} 
                  className="w-full bg-[#0EA5E9] text-white py-2 md:py-3 rounded-lg md:rounded-xl font-medium text-xs md:text-base hover:bg-[#0284C7] hover:shadow-lg hover:shadow-[#0EA5E9]/30 flex justify-center items-center gap-1.5 md:gap-2 transition-all"
                >
                  <Mail size={12} className="md:hidden" /><Mail size={16} className="hidden md:block" /> Kirim Email
                </a>
              </motion.div>
            </div>

            {/* AJAX CONTACT FORM */}
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-5 bg-white/60 p-5 md:p-8 rounded-2xl md:rounded-3xl border border-[#BAE6FD]/40 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs md:text-sm font-semibold text-[#0F172A]">Nama Lengkap</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Masukkan nama Anda"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/40 focus:border-[#0EA5E9] outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs md:text-sm font-semibold text-[#0F172A]">Alamat Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/40 focus:border-[#0EA5E9] outline-none transition-all text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs md:text-sm font-semibold text-[#0F172A]">Pesan atau Pertanyaan</label>
                  <textarea 
                    required
                    rows="4" 
                    placeholder="Halo! Saya ingin bertanya tentang..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 md:py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0EA5E9]/40 focus:border-[#0EA5E9] outline-none transition-all text-sm resize-none"
                  ></textarea>
                </div>
                
                <AnimatePresence mode="wait">
                  {formStatus === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 md:p-4 bg-emerald-50 text-emerald-700 rounded-xl flex items-center gap-2 md:gap-3 text-xs md:text-sm border border-emerald-100"
                    >
                      <CheckCircle2 size={18} />
                      <span>Pesan Anda berhasil dikirim! Saya akan segera menghubungi Anda.</span>
                    </motion.div>
                  ) : formStatus === 'error' ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 md:p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 md:gap-3 text-xs md:text-sm border border-red-100"
                    >
                      <X size={18} />
                      <span>Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.</span>
                    </motion.div>
                  ) : (
                    <button 
                      disabled={formStatus === 'sending'}
                      type="submit" 
                      className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${formStatus === 'sending' ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0F172A] text-white hover:bg-[#1E293B] hover:shadow-xl hover:shadow-[#0F172A]/20 active:scale-[0.98]'}`}
                    >
                      {formStatus === 'sending' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          <span>Mengirim Pesan...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Kirim Pesan Langsung</span>
                        </>
                      )}
                    </button>
                  )}
                </AnimatePresence>
              </form>
            </div>

            <div className="mt-5 md:mt-12 pt-4 md:pt-8 border-t border-[#BAE6FD]/40 flex flex-col items-center">
              <p className="text-[10px] md:text-sm text-[#334155] mb-2 md:mb-4">Atau temukan saya di platform lain</p>
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex gap-3 md:gap-4">
                {DATA.socials.map((social, i) => (
                  <motion.a 
                    key={i} 
                    variants={scaleIn}
                    whileHover={{ y: -5, backgroundColor: social.hex, color: 'white' }}
                    href={social.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-9 h-9 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-[#334155] shadow-sm transition-all duration-300" 
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-[#334155] text-sm">
        <p>© {new Date().getFullYear()} {DATA.profile.name}.</p>
      </footer>
    </div>
  );
}
