import { useState, useEffect } from 'react';
import defaultData from './data.json';

const STORAGE_KEY = 'portfolio_data';

export function useData() {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse stored data:', e);
    }
    return defaultData;
  });

  useEffect(() => {
    // Force reset if detecting old placeholder data to sync with new data.json
    if (data.profile.email === 'hello@johndoe.com' || data.profile.whatsapp === '6281234567890') {
      console.log('Dummy data detected, resetting to latest data.json...');
      resetData();
    }
  }, [data]);

  const saveData = (newData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const resetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return { data, saveData, resetData, exportJSON, defaultData };
}
