import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail } from 'lucide-react';
import { WhatsAppIcon } from '../icons';

const ContactSection = ({ DATA, fadeInUp, scaleIn, staggerContainer }) => {
  return (
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

          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6 max-w-2xl mx-auto">
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

          <div className="mt-5 md:mt-12 pt-4 md:pt-8 border-t border-[#BAE6FD]/40 flex flex-col items-center">
            <p className="text-[10px] md:text-sm text-[#334155] mb-2 md:mb-4">Atau temukan saya di platform lain</p>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex gap-3 md:gap-4">
              {DATA.socials.map((social) => (
                <motion.a 
                  key={social.name} 
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
  );
};

export default ContactSection;
