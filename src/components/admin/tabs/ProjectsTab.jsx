import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Wand2 } from 'lucide-react';
import ItemCard from '../ui/ItemCard';
import Field from '../ui/Field';

export default function ProjectsTab({ draft, removeListItem, updateProject, generatingId, autoFillProject, updateProjectTech, addProject }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      {draft.projects.map((project, i) => (
        <ItemCard key={i} onDelete={() => removeListItem('projects', i)}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 flex justify-between items-center mb-1">
              <h4 className="text-xs font-bold text-[#0EA5E9] uppercase tracking-widest">Project #{i + 1}</h4>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => autoFillProject(i)} 
                disabled={generatingId === i} 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${generatingId === i ? 'bg-gray-100 text-gray-400' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
              >
                {generatingId === i ? (
                  <>
                    <div className="w-3 h-3 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 size={13} />
                    Auto-Generate
                  </>
                )}
              </motion.button>
            </div>
            <Field label="Judul Project" value={project.title} onChange={v => updateProject(i, 'title', v)} />
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5 uppercase tracking-wider">Status</label>
              <select className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40 transition-all" value={project.status} onChange={e => updateProject(i, 'status', e.target.value)}>
                <option value="rilis">Udah Rilis</option>
                <option value="progress">Dikerjakan</option>
                <option value="konsep">Konsep</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <Field label="Deskripsi" value={project.desc} onChange={v => updateProject(i, 'desc', v)} textarea rows={3} />
            </div>
            <Field label="Tags / Tech (pisah koma)" value={project.tech.join(', ')} onChange={v => updateProjectTech(i, v)} placeholder="Vite, React, Tailwind" />
            <Field label="URL Thumbnail" value={project.image} onChange={v => updateProject(i, 'image', v)} />
            <Field label="URL Demo" value={project.demo} onChange={v => updateProject(i, 'demo', v)} placeholder="https://..." />
            <Field label="URL GitHub" value={project.github} onChange={v => updateProject(i, 'github', v)} placeholder="https://github.com/..." />
          </div>
        </ItemCard>
      ))}
      <motion.button 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={addProject} 
        className="w-full py-3 border-2 border-dashed border-[#BAE6FD] rounded-xl text-sm font-medium text-[#0EA5E9] hover:bg-[#0EA5E9]/5 transition-all flex items-center justify-center gap-2"
      >
        <Plus size={16} /> Tambah Project
      </motion.button>
    </motion.div>
  );
}
