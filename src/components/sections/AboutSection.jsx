import React from 'react';
import { motion } from 'framer-motion';
import { MonitorSmartphone, BookOpen, Briefcase } from 'lucide-react';

const AboutSection = ({ DATA, fadeInUp, staggerContainer }) => {
  return (
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
      </div>
    </section>
  );
};

export default AboutSection;
