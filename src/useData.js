/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from 'react';
import defaultData from './data.json';
import { database } from './firebase';
import { ref, set, onValue } from 'firebase/database';

const STORAGE_KEY = 'portfolio_data';
const DB_REF = ref(database, 'portfolio');

// Increment this number every time you update data.json and want to force-push to Firebase
const DATA_VERSION = 2;
const VERSION_REF = ref(database, 'data_version');

export function useData() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First, check the version in Firebase
    onValue(VERSION_REF, async (versionSnap) => {
      const remoteVersion = versionSnap.val();

      if (remoteVersion === null || remoteVersion < DATA_VERSION) {
        // Force push new data to Firebase (overwrite old/dummy data)
        console.log('🔄 Data version mismatch. Pushing new data...');
        try {
          await set(DB_REF, defaultData);
          await set(VERSION_REF, DATA_VERSION);
          setData(defaultData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
          localStorage.setItem('data_version', DATA_VERSION);
          console.log('✅ New data pushed to Firebase! Version:', DATA_VERSION);
        } catch (err) {
          console.error('❌ Error pushing new data:', err);
        }
        setLoading(false);
      }
    }, { onlyOnce: true });

    // Then listen for realtime updates
    const unsubscribe = onValue(DB_REF, (snapshot) => {
      if (snapshot.exists()) {
        const firebaseData = snapshot.val();
        setData(firebaseData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(firebaseData));
        console.log('✅ Data synced from Firebase!');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveData = async (newData) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    try {
      await set(DB_REF, newData);
      console.log('✅ Saved to Firebase!');
    } catch (error) {
      console.error('❌ Error saving to Firebase:', error);
      alert('Gagal menyimpan ke database.');
    }
  };

  const resetData = async () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(defaultData);
    try {
      await set(DB_REF, defaultData);
      console.log('🔄 Data reset to default!');
    } catch (error) {
      console.error('Error resetting Firebase:', error);
    }
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

  return { data, saveData, resetData, exportJSON, defaultData, loading };
}
