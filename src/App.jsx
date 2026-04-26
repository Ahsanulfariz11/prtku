import React, { useState, useEffect, useMemo } from 'react';
import { useData } from './useData';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Clock, Lightbulb, Globe, ChevronUp
} from 'lucide-react';

// Import Modular Components
import Navbar from './components/ui/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/ui/Footer';
import { SOCIAL_ICON_MAP } from './components/icons';

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

// --- LOADING SPINNER ---
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// --- KOMPONEN UTAMA ---
export default function App() {
  const { data: rawData, loading } = useData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

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

  // Show loading spinner while data is being fetched from Firebase
  if (loading) return <PageLoader />;

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] text-[#0F172A] font-sans selection:bg-[#BAE6FD] selection:text-[#0F172A] overflow-x-hidden">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] bg-[#0EA5E9] text-white px-4 py-2 rounded-lg font-medium shadow-xl">Skip to main content</a>

      <Navbar 
        isScrolled={isScrolled} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        scrollTo={scrollTo} 
      />

      <main id="main-content">
        <HeroSection 
          DATA={DATA} 
          scrollTo={scrollTo} 
          fadeInUp={fadeInUp} 
          scaleIn={scaleIn} 
        />

        <AboutSection 
          DATA={DATA} 
          fadeInUp={fadeInUp} 
          staggerContainer={staggerContainer} 
        />

        <SkillsSection 
          DATA={DATA} 
          fadeInUp={fadeInUp} 
          scaleIn={scaleIn} 
          staggerContainer={staggerContainer} 
        />

        <ProjectsSection 
          DATA={DATA} 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
          PROJECT_STATUS={PROJECT_STATUS} 
          fadeInUp={fadeInUp} 
        />

        <ContactSection 
          DATA={DATA} 
          fadeInUp={fadeInUp} 
          scaleIn={scaleIn} 
          staggerContainer={staggerContainer} 
        />
      </main>

      <AnimatePresence>
        {isScrolled && (
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[40] w-10 h-10 md:w-12 md:h-12 bg-[#0EA5E9] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#0284C7] hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EA5E9]"
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <Footer name={DATA.profile.name} />
    </div>
  );
}
