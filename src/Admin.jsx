import React, { useState } from 'react';
import { useData } from './useData';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save, Download, RotateCcw,
  User, BookOpen, Briefcase, Wrench, FolderOpen,
  ArrowLeft, LogOut
} from 'lucide-react';

// Import UI Components
import Toast from './components/admin/ui/Toast';
import AuthGate from './components/admin/ui/AuthGate';

// Import Tab Components
import ProfileTab from './components/admin/tabs/ProfileTab';
import EducationsTab from './components/admin/tabs/EducationsTab';
import ExperiencesTab from './components/admin/tabs/ExperiencesTab';
import ExpertiseTab from './components/admin/tabs/ExpertiseTab';
import ProjectsTab from './components/admin/tabs/ProjectsTab';

const AUTH_SESSION_KEY = 'admin_authenticated';

const TABS = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'educations', label: 'Pendidikan', icon: BookOpen },
  { id: 'experiences', label: 'Pengalaman', icon: Briefcase },
  { id: 'expertise', label: 'Skills & Tools', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_SESSION_KEY) === 'true'
  );

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AuthGate onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return <AdminPanel onLogout={handleLogout} />;
}

function AdminPanel({ onLogout }) {
  const { data, saveData, resetData, defaultData } = useData();
  const [draft, setDraft] = useState(JSON.parse(JSON.stringify(data)));
  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState({ show: false, message: '' });
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
      const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
      const result = await response.json();
      const screenshotUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=800`;
      
      if (result.status === 'success') {
        const { title, description, image } = result.data;
        setDraft(prev => {
          const projects = [...prev.projects];
          projects[index] = {
            ...projects[index],
            title: title || projects[index].title,
            desc: description || projects[index].desc,
            image: screenshotUrl || image?.url
          };
          return { ...prev, projects };
        });
        showToast('Data & Thumbnail berhasil di-generate!');
      } else {
        setDraft(prev => {
          const projects = [...prev.projects];
          projects[index] = { ...projects[index], image: screenshotUrl };
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
            <button onClick={onLogout} className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:text-red-200 rounded-lg text-xs font-medium transition-colors">
              <LogOut size={14} /> Logout
            </button>
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
            {activeTab === 'profile' && (
              <ProfileTab draft={draft} setDraft={setDraft} updateProfile={updateProfile} />
            )}
            {activeTab === 'educations' && (
              <EducationsTab draft={draft} removeListItem={removeListItem} updateListItem={updateListItem} addListItem={addListItem} />
            )}
            {activeTab === 'experiences' && (
              <ExperiencesTab draft={draft} removeListItem={removeListItem} updateListItem={updateListItem} addListItem={addListItem} />
            )}
            {activeTab === 'expertise' && (
              <ExpertiseTab 
                draft={draft} 
                updateExpertiseCategory={updateExpertiseCategory} 
                removeExpertiseCategory={removeExpertiseCategory} 
                updateExpertiseItem={updateExpertiseItem} 
                removeExpertiseItem={removeExpertiseItem} 
                addExpertiseItem={addExpertiseItem} 
                addExpertiseCategory={addExpertiseCategory} 
              />
            )}
            {activeTab === 'projects' && (
              <ProjectsTab 
                draft={draft} 
                removeListItem={removeListItem} 
                updateProject={updateProject} 
                generatingId={generatingId} 
                autoFillProject={autoFillProject} 
                updateProjectTech={updateProjectTech} 
                addProject={addProject} 
              />
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
