import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = ({ isScrolled, mobileMenuOpen, setMobileMenuOpen, scrollTo }) => {
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#F0F9FF]/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <img src="/itku-logo.png" alt="ITku Logo" width={150} height={40} className="h-8 md:h-10 w-auto" />
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-medium">
          {['Home', 'About', 'Projects', 'Contact'].map((item, i) => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={(e) => { e.preventDefault(); scrollTo(item.toLowerCase()); }} 
              className="hover:text-[#0EA5E9] transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0EA5E9] transition-all group-hover:w-full"></span>
            </motion.a>
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
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={(e) => { e.preventDefault(); scrollTo(item.toLowerCase()); }} 
                className="text-left py-3 px-4 font-medium hover:text-[#0EA5E9] hover:bg-[#BAE6FD]/20 rounded-xl transition-all block w-full"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
