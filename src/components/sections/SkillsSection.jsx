import React from 'react';
import { motion } from 'framer-motion';

const SkillsSection = ({ DATA, fadeInUp, scaleIn, staggerContainer }) => {
  return (
    <section className="py-14 md:py-24">
      <div className="container mx-auto px-5 md:px-12">
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
                        width={28} height={28}
                        loading="lazy"
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
  );
};

export default SkillsSection;
