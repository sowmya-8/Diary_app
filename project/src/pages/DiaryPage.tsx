import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import DiaryEntryList from '../components/diary/DiaryEntryList';
import DiaryEntryForm from '../components/diary/DiaryEntryForm';
import { useAuth } from '../contexts/AuthContext';
import { useDiary } from '../contexts/DiaryContext';
import { DiaryEntry } from '../types';

const DiaryPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { entries, getEntries, addEntry, updateEntry, deleteEntry } = useDiary();
  const navigate = useNavigate();
  
  const [showForm, setShowForm] = useState(false);
  const [editEntry, setEditEntry] = useState<DiaryEntry | null>(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    getEntries();
  }, [isAuthenticated, navigate, getEntries]);
  
  const handleAddEntry = (entry: Omit<DiaryEntry, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    addEntry(entry);
    setShowForm(false);
  };
  
  const handleUpdateEntry = (id: string, updatedFields: Partial<DiaryEntry>) => {
    updateEntry(id, updatedFields);
    setEditEntry(null);
  };
  
  const handleEditEntry = (entry: DiaryEntry) => {
    setEditEntry(entry);
  };
  
  const handleCancelEdit = () => {
    setEditEntry(null);
  };
  
  const handleDeleteEntry = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(id);
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-12rem)] bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Diary
          </h1>
          
          {!showForm && !editEntry && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <PlusCircle className="mr-2" size={18} />
              New Entry
            </button>
          )}
        </div>
        
        {showForm && (
          <div className="mb-8">
            <DiaryEntryForm 
              onSubmit={handleAddEntry} 
              onCancel={() => setShowForm(false)} 
            />
          </div>
        )}
        
        {editEntry && (
          <div className="mb-8">
            <DiaryEntryForm 
              initialEntry={editEntry}
              onSubmit={(updatedFields) => handleUpdateEntry(editEntry.id, updatedFields)}
              onCancel={handleCancelEdit}
              isEditMode
            />
          </div>
        )}
        
        <DiaryEntryList 
          entries={entries}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
        />
      </div>
    </div>
  );
};

export default DiaryPage;