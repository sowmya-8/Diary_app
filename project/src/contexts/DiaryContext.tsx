import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from '../utils/uuid';
import { DiaryContextType, DiaryEntry } from '../types';
import { getEntries as getEntriesFromLocalStorage, saveEntries } from '../utils/localStorage';
import { useAuth } from './AuthContext';

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const DiaryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const { currentUser } = useAuth();

  // Load entries when user changes
  useEffect(() => {
    if (currentUser) {
      getUserEntries();
    } else {
      setEntries([]);
    }
  }, [currentUser]);

  const getUserEntries = () => {
    if (!currentUser) return;
    const userEntries = getEntriesFromLocalStorage(currentUser.id);
    setEntries(userEntries);
  };

  const addEntry = (entry: Omit<DiaryEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!currentUser) return;

    const now = new Date().toISOString();
    const newEntry: DiaryEntry = {
      id: uuidv4(),
      userId: currentUser.id,
      ...entry,
      createdAt: now,
      updatedAt: now
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    saveEntries(currentUser.id, updatedEntries);
  };

  const updateEntry = (id: string, updatedFields: Partial<DiaryEntry>) => {
    if (!currentUser) return;
    
    const updatedEntries = entries.map(entry => 
      entry.id === id 
        ? { ...entry, ...updatedFields, updatedAt: new Date().toISOString() } 
        : entry
    );
    
    setEntries(updatedEntries);
    saveEntries(currentUser.id, updatedEntries);
  };

  const deleteEntry = (id: string) => {
    if (!currentUser) return;
    
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    saveEntries(currentUser.id, updatedEntries);
  };

  const getEntryById = (id: string) => {
    return entries.find(entry => entry.id === id);
  };

  return (
    <DiaryContext.Provider value={{ 
      entries, 
      getEntries: getUserEntries, 
      addEntry, 
      updateEntry, 
      deleteEntry, 
      getEntryById 
    }}>
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = (): DiaryContextType => {
  const context = useContext(DiaryContext);
  if (context === undefined) {
    throw new Error('useDiary must be used within a DiaryProvider');
  }
  return context;
};