import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
const AUTH_SESSION_KEY = 'admin_authenticated';

export default function AuthGate({ onAuthenticated }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      onAuthenticated();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-8 ${shaking ? 'animate-shake' : ''}`}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-[#0EA5E9]/10 rounded-full flex items-center justify-center mb-4">
            <Lock size={24} className="text-[#0EA5E9]" />
          </div>
          <h1 className="text-xl font-heading font-bold text-[#0F172A]">Admin Panel</h1>
          <p className="text-sm text-[#94A3B8] mt-1">Masukkan password untuk melanjutkan</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className={`w-full bg-white border rounded-xl px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 ${
                error
                  ? 'border-red-400 focus:ring-red-400/40'
                  : 'border-gray-200 focus:ring-[#0EA5E9]/40 focus:border-[#0EA5E9]'
              }`}
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-xs mt-2 font-medium"
                >
                  Password salah. Coba lagi.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <button
            type="submit"
            className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white py-3 rounded-xl font-semibold text-sm transition-colors shadow-lg shadow-[#0EA5E9]/30"
          >
            Masuk
          </button>
        </form>
        <a href="/" className="block text-center text-xs text-[#94A3B8] mt-4 hover:text-[#0EA5E9] transition-colors">
          ← Kembali ke Portfolio
        </a>
      </motion.div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
}
