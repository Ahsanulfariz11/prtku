import React from 'react';

export default function Field({ label, value, onChange, type = 'text', placeholder = '', textarea = false, rows = 3 }) {
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
