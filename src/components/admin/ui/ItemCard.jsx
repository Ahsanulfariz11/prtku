import React from 'react';
import { Trash2 } from 'lucide-react';

export default function ItemCard({ children, onDelete }) {
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
