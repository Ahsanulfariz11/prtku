import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import ItemCard from '../ui/ItemCard';
import Field from '../ui/Field';

export default function ExperiencesTab({ draft, removeListItem, updateListItem, addListItem }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      {draft.experiences.map((exp, i) => (
        <ItemCard key={i} onDelete={() => removeListItem('experiences', i)}>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Periode" value={exp.year} onChange={v => updateListItem('experiences', i, 'year', v)} placeholder="2025 – Sekarang" />
            <Field label="Jabatan / Role" value={exp.role} onChange={v => updateListItem('experiences', i, 'role', v)} />
            <Field label="Perusahaan" value={exp.company} onChange={v => updateListItem('experiences', i, 'company', v)} />
            <div className="sm:col-span-2">
              <Field label="Deskripsi" value={exp.desc} onChange={v => updateListItem('experiences', i, 'desc', v)} textarea rows={4} />
            </div>
          </div>
        </ItemCard>
      ))}
      <motion.button 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => addListItem('experiences', { year: '', role: '', company: '', desc: '' })} 
        className="w-full py-3 border-2 border-dashed border-[#BAE6FD] rounded-xl text-sm font-medium text-[#0EA5E9] hover:bg-[#0EA5E9]/5 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={16} /> Tambah Pengalaman
      </motion.button>
    </motion.div>
  );
}
