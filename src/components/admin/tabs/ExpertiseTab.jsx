import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import Field from '../ui/Field';

export default function ExpertiseTab({ draft, updateExpertiseCategory, removeExpertiseCategory, updateExpertiseItem, removeExpertiseItem, addExpertiseItem, addExpertiseCategory }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {draft.expertise.map((cat, catIdx) => (
        <div key={catIdx} className="bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <input className="font-heading font-bold text-sm text-[#0F172A] bg-transparent border-0 focus:ring-b-2 focus:ring-[#0EA5E9] p-0" value={cat.category} onChange={e => updateExpertiseCategory(catIdx, e.target.value)} />
            <button onClick={() => removeExpertiseCategory(catIdx)} className="text-red-400 hover:text-red-600 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cat.items.map((item, itemIdx) => (
              <div key={itemIdx} className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg relative group">
                <button onClick={() => removeExpertiseItem(catIdx, itemIdx)} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all">
                  <Trash2 size={12} />
                </button>
                <Field label="Nama Tool" value={item.name} onChange={v => updateExpertiseItem(catIdx, itemIdx, 'name', v)} />
                <Field label="URL Icon" value={item.icon} onChange={v => updateExpertiseItem(catIdx, itemIdx, 'icon', v)} placeholder="e.g. https://cdn..." />
              </div>
            ))}
            <button onClick={() => addExpertiseItem(catIdx)} className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-lg p-4 text-xs font-medium text-gray-400 hover:border-[#BAE6FD] hover:text-[#0EA5E9] transition-all">
              <Plus size={14} /> Item
            </button>
          </div>
        </div>
      ))}
      <motion.button 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={addExpertiseCategory} 
        className="w-full py-3 border-2 border-dashed border-[#BAE6FD] rounded-xl text-sm font-medium text-[#0EA5E9] hover:bg-[#0EA5E9]/5 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={16} /> Tambah Kategori Baru
      </motion.button>
    </motion.div>
  );
}
