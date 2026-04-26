import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const ProjectsSection = ({ DATA, activeFilter, setActiveFilter, PROJECT_STATUS, fadeInUp }) => {
  return (
    <section id="projects" className="py-14 md:py-24 bg-white/30">
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
            {DATA.projects.filter(p => activeFilter === 'all' || p.status === activeFilter).map((project) => (
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
                    width={400} height={300}
                    loading="lazy"
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
  );
};

export default ProjectsSection;
