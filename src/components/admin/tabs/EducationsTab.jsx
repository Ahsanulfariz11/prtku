import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import ItemCard from '../ui/ItemCard';
import Field from '../ui/Field';

export default function EducationsTab({ draft, removeListItem, updateListItem, addListItem }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      {draft.educations.map((edu, i) => (
        <ItemCard key={i} onDelete={() => removeListItem('educations', i)}>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Periode" value={edu.year} onChange={v => updateListItem('educations', i, 'year', v)} placeholder="2024 – Sekarang" />
            <Field label="Jabatan / Role" value={edu.role} onChange={v => updateListItem('educations', i, 'role', v)} />
            <Field label="Institusi" value={edu.company} onChange={v => updateListItem('educations', i, 'company', v)} />
            <div className="sm:col-span-2">
              <Field label="Deskripsi" value={edu.desc} onChange={v => updateListItem('educations', i, 'desc', v)} textarea rows={4} />
            </div>
          </div>
        </ItemCard>
      ))}
      <motion.button 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => addListItem('educations', { year: '', role: '', company: '', desc: '' })} 
        className="w-full py-3 border-2 border-dashed border-[#BAE6FD] rounded-xl text-sm font-medium text-[#0EA5E9] hover:bg-[#0EA5E9]/5 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={16} /> Tambah Pendidikan
      </motion.button>
    </motion.div>
  );
}
