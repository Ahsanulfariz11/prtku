import React, { useState, useEffect } from 'react';
import { useData } from './useData';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save, Download, RotateCcw, Plus, Trash2, ChevronLeft,
  User, BookOpen, Briefcase, Wrench, FolderOpen, X, Check,
  ArrowLeft, Wand2
} from 'lucide-react';

const TABS = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'educations', label: 'Pendidikan', icon: BookOpen },
  { id: 'experiences', label: 'Pengalaman', icon: Briefcase },
  { id: 'expertise', label: 'Skills & Tools', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
];

// Toast notification component
function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 2500);
      return () => clearTimeout(t);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed top-6 right-6 z-[9999] bg-[#0F172A] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2"
        >
          <Check size={18} className="text-emerald-400" />
          <span className="text-sm font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Input field component
function Field({ label, value, onChange, type = 'text', placeholder = '', textarea = false, rows = 3 }) {
  const baseClass = "w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/40 focus:border-[#0EA5E9] transition-all placeholder:text-gray-400";
  return (
    <div>
      <label className="block text-xs font-semibold text-[#334155] mb-1.5 uppercase tracking-wider">{label}</label>
      {textarea ? (
        <textarea className={baseClass} value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder} />
      ) : (
        <input type={type} className={baseClass} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );
}

// Card wrapper for list items
function ItemCard({ children, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-5 shadow-sm relative group">
      {onDelete && (
        <button onClick={onDelete} className="absolute top-3 right-3 w-7 h-7 bg-red-50 text-red-400 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-all" title="Hapus">
          <Trash2 size={14} />
        </button>
      )}
      {children}
    </div>
  );
}

export default function Admin() {
  const { data, saveData, resetData, exportJSON, defaultData } = useData();
  const [draft, setDraft] = useState(JSON.parse(JSON.stringify(data)));
  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState({ show: false, message: '' });
  const [mobileTabOpen, setMobileTabOpen] = useState(false);
  const [generatingId, setGeneratingId] = useState(null);

  const showToast = (message) => setToast({ show: true, message });

  const handleSave = () => {
    saveData(draft);
    showToast('Data berhasil disimpan!');
  };

  const handleReset = () => {
    if (confirm('Yakin ingin reset semua data ke default?')) {
      resetData();
      setDraft(JSON.parse(JSON.stringify(defaultData)));
      showToast('Data berhasil direset!');
    }
  };

  const handleExport = () => {
    // Export the current draft
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('File JSON berhasil diunduh!');
  };

  // Update helpers
  const updateProfile = (key, value) => {
    setDraft(prev => ({ ...prev, profile: { ...prev.profile, [key]: value } }));
  };

  const updateListItem = (listKey, index, field, value) => {
    setDraft(prev => {
      const list = [...prev[listKey]];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [listKey]: list };
    });
  };

  const addListItem = (listKey, template) => {
    setDraft(prev => ({ ...prev, [listKey]: [...prev[listKey], template] }));
  };

  const removeListItem = (listKey, index) => {
    setDraft(prev => ({ ...prev, [listKey]: prev[listKey].filter((_, i) => i !== index) }));
  };

  // Expertise helpers
  const updateExpertiseCategory = (catIdx, value) => {
    setDraft(prev => {
      const expertise = [...prev.expertise];
      expertise[catIdx] = { ...expertise[catIdx], category: value };
      return { ...prev, expertise };
    });
  };

  const updateExpertiseItem = (catIdx, itemIdx, field, value) => {
    setDraft(prev => {
      const expertise = [...prev.expertise];
      const items = [...expertise[catIdx].items];
      items[itemIdx] = { ...items[itemIdx], [field]: value };
      expertise[catIdx] = { ...expertise[catIdx], items };
      return { ...prev, expertise };
    });
  };

  const addExpertiseItem = (catIdx) => {
    setDraft(prev => {
      const expertise = [...prev.expertise];
      const items = [...expertise[catIdx].items, { name: '', icon: '' }];
      expertise[catIdx] = { ...expertise[catIdx], items };
      return { ...prev, expertise };
    });
  };

  const removeExpertiseItem = (catIdx, itemIdx) => {
    setDraft(prev => {
      const expertise = [...prev.expertise];
      expertise[catIdx] = {
        ...expertise[catIdx],
        items: expertise[catIdx].items.filter((_, i) => i !== itemIdx)
      };
      return { ...prev, expertise };
    });
  };

  const addExpertiseCategory = () => {
    setDraft(prev => ({
      ...prev,
      expertise: [...prev.expertise, { category: 'KATEGORI BARU', items: [] }]
    }));
  };

  const removeExpertiseCategory = (catIdx) => {
    setDraft(prev => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== catIdx)
    }));
  };

  // Project helpers
  const updateProject = (index, field, value) => {
    setDraft(prev => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [field]: value };
      return { ...prev, projects };
    });
  };

  const updateProjectTech = (index, techStr) => {
    updateProject(index, 'tech', techStr.split(',').map(t => t.trim()).filter(Boolean));
  };

  const addProject = () => {
    const maxId = draft.projects.reduce((max, p) => Math.max(max, p.id), 0);
    addListItem('projects', {
      id: maxId + 1,
      title: '',
      desc: '',
      tech: [],
      image: '',
      demo: '#',
      github: '#',
      status: 'konsep'
    });
  };

  const autoFillProject = async (index) => {
    const url = draft.projects[index].demo;
    if (!url || url === '#' || url === '') {
      alert('Masukkan URL demo yang valid (lengkap dengan https://) terlebih dahulu!');
      return;
    }
    
    if (!url.startsWith('http')) {
      alert('URL harus diawali dengan http:// atau https://');
      return;
    }

    setGeneratingId(index);
    try {
      // Ambil metadata dari Microlink
      const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
      const result = await response.json();
      
      // Fallback URL Screenshot (WordPress mshots) jika Microlink tidak ada gambar
      const screenshotUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=800`;
      
      if (result.status === 'success') {
        const { title, description, image } = result.data;
        
        setDraft(prev => {
          const projects = [...prev.projects];
          projects[index] = {
            ...projects[index],
            title: title || projects[index].title,
            desc: description || projects[index].desc,
            // Prioritaskan screenshot halaman (Home look) daripada logo/OG Image
            image: screenshotUrl || image?.url
          };
          return { ...prev, projects };
        });
        showToast('Data & Thumbnail berhasil di-generate!');
      } else {
        // Jika Microlink gagal total tapi URL valid, set minimal screenshot-nya saja
        setDraft(prev => {
          const projects = [...prev.projects];
          projects[index] = {
            ...projects[index],
            image: screenshotUrl
          };
          return { ...prev, projects };
        });
        showToast('Hanya thumbnail yang berhasil di-generate.');
      }
    } catch (error) {
      console.error(error);
      alert('Gagal mengambil data otomatis. Coba lagi nanti atau isi manual.');
    } finally {
      setGeneratingId(null);
    }
  };

  const activeTabData = TABS.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-[#F0F9FF] text-[#0F172A] font-sans">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap');
        h1, h2, h3, h4, h5, h6, .font-heading { font-family: 'Poppins', sans-serif; }
        body { font-family: 'Inter', sans-serif; }
        @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}} />

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: '' })} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0F172A] text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors" title="Kembali ke Portfolio">
              <ArrowLeft size={18} />
            </a>
            <div>
              <h1 className="font-heading font-bold text-base md:text-lg">Admin Panel</h1>
              <p className="text-[10px] md:text-xs text-white/50">Content Management</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleExport} className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors">
              <Download size={14} /> Export
            </button>
            <button onClick={handleReset} className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-medium transition-colors">
              <RotateCcw size={14} /> Reset
            </button>
            <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 bg-[#0EA5E9] hover:bg-[#0284C7] rounded-lg text-xs md:text-sm font-semibold transition-colors shadow-lg shadow-[#0EA5E9]/30">
              <Save size={14} /> Simpan
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex gap-6">
        {/* Sidebar - desktop */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-2 space-y-1">
            {TABS.map((tab, i) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#0EA5E9] text-white shadow-md shadow-[#0EA5E9]/20'
                      : 'text-[#334155] hover:bg-[#F0F9FF]'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </aside>

        {/* Mobile tab selector */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 flex justify-around py-2 px-1 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                  activeTab === tab.id ? 'text-[#0EA5E9]' : 'text-[#94A3B8]'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 pb-20 md:pb-0">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-[#0F172A]">
              {activeTabData?.label}
            </h2>
            <p className="text-xs md:text-sm text-[#94A3B8] mt-1">Kelola data {activeTabData?.label.toLowerCase()} portfolio Anda</p>
          </div>

          <AnimatePresence mode="wait">
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <motion.div 
                key="profile"
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
            )}

            {/* EDUCATIONS TAB */}
            {activeTab === 'educations' && (
              <motion.div 
                key="educations"
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
            )}

            {/* EXPERIENCES TAB */}
            {activeTab === 'experiences' && (
              <motion.div 
                key="experiences"
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
            )}

            {/* EXPERTISE TAB */}
            {activeTab === 'expertise' && (
              <motion.div 
                key="expertise"
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
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <motion.div 
                key="projects"
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
            )}
          </AnimatePresence>

          {/* Mobile action buttons */}
          <div className="flex sm:hidden items-center gap-2 mt-6">
            <button onClick={handleExport} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-[#334155]">
              <Download size={14} /> Export JSON
            </button>
            <button onClick={handleReset} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium text-red-500">
              <RotateCcw size={14} /> Reset Data
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
