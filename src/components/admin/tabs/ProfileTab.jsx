import React from 'react';
import { motion } from 'framer-motion';
import { User, Wrench, FolderOpen, Plus, Trash2 } from 'lucide-react';
import Field from '../ui/Field';

export default function ProfileTab({ draft, setDraft, updateProfile }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm">
        <h3 className="font-heading font-semibold text-sm mb-4 text-[#0F172A] flex items-center gap-2">
          <User size={16} className="text-[#0EA5E9]" /> Informasi Dasar
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nama Lengkap" value={draft.profile.name} onChange={v => updateProfile('name', v)} />
          <Field label="Role / Jabatan" value={draft.profile.role} onChange={v => updateProfile('role', v)} />
          <div className="sm:col-span-2">
            <Field label="Tagline" value={draft.profile.tagline} onChange={v => updateProfile('tagline', v)} placeholder="One liner tentang diri Anda" />
          </div>
          <div className="sm:col-span-2">
            <Field label="Tentang Saya" value={draft.profile.about} onChange={v => updateProfile('about', v)} textarea rows={6} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm">
        <h3 className="font-heading font-semibold text-sm mb-4 text-[#0F172A] flex items-center gap-2">
          <Wrench size={16} className="text-[#0EA5E9]" /> Kontak & File
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email" value={draft.profile.email} onChange={v => updateProfile('email', v)} type="email" />
          <Field label="WhatsApp (format: 62xxx)" value={draft.profile.whatsapp} onChange={v => updateProfile('whatsapp', v)} />
          <Field label="URL Foto Profil" value={draft.profile.image} onChange={v => updateProfile('image', v)} placeholder="/profile.png" />
          <Field label="CV Bahasa Indonesia" value={draft.profile.cv_id} onChange={v => updateProfile('cv_id', v)} placeholder="/cv-id.pdf" />
          <Field label="CV Bahasa Inggris" value={draft.profile.cv_en} onChange={v => updateProfile('cv_en', v)} placeholder="/cv-en.pdf" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-sm text-[#0F172A] flex items-center gap-2">
            <FolderOpen size={16} className="text-[#0EA5E9]" /> Sosial Media
          </h3>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDraft(prev => ({ ...prev, socials: [...prev.socials, { name: '', url: '', hex: '#333333' }] }))} 
            className="flex items-center gap-1 px-3 py-1.5 bg-[#0EA5E9]/10 text-[#0EA5E9] rounded-lg text-xs font-medium hover:bg-[#0EA5E9]/20 transition-colors"
          >
            <Plus size={14} /> Tambah
          </motion.button>
        </div>
        <div className="space-y-3">
          {draft.socials.map((social, i) => (
            <div key={i} className="flex items-center gap-2">
              <input className="w-24 bg-white border border-gray-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40" value={social.name} onChange={e => {
                const socials = [...draft.socials];
                socials[i] = { ...socials[i], name: e.target.value };
                setDraft(prev => ({ ...prev, socials }));
              }} placeholder="Nama" />
              <input className="flex-1 bg-white border border-gray-200 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40" value={social.url} onChange={e => {
                const socials = [...draft.socials];
                socials[i] = { ...socials[i], url: e.target.value };
                setDraft(prev => ({ ...prev, socials }));
              }} placeholder="URL" />
              <input type="color" className="w-8 h-8 rounded cursor-pointer border-0" value={social.hex} onChange={e => {
                const socials = [...draft.socials];
                socials[i] = { ...socials[i], hex: e.target.value };
                setDraft(prev => ({ ...prev, socials }));
              }} />
              <button onClick={() => setDraft(prev => ({ ...prev, socials: prev.socials.filter((_, j) => j !== i) }))} className="w-8 h-8 bg-red-50 text-red-400 rounded-lg flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-all">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
