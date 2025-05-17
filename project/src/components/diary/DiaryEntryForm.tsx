import React, { useState, useEffect } from 'react';
import { DiaryEntry, Mood } from '../../types';
import { X } from 'lucide-react';

interface DiaryEntryFormProps {
  onSubmit: (entry: Partial<DiaryEntry>) => void;
  onCancel: () => void;
  initialEntry?: DiaryEntry;
  isEditMode?: boolean;
}

const moods: Mood[] = ['happy', 'calm', 'sad', 'angry', 'anxious', 'neutral'];

const getMoodEmoji = (mood: Mood): string => {
  switch (mood) {
    case 'happy': return '😊';
    case 'calm': return '😌';
    case 'sad': return '😢';
    case 'angry': return '😠';
    case 'anxious': return '😰';
    case 'neutral': return '😐';
    default: return '😐';
  }
};

const DiaryEntryForm: React.FC<DiaryEntryFormProps> = ({ 
  onSubmit, 
  onCancel, 
  initialEntry,
  isEditMode = false 
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<Mood>('neutral');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialEntry) {
      setTitle(initialEntry.title);
      setContent(initialEntry.content);
      setMood(initialEntry.mood);
    }
  }, [initialEntry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    
    if (!content.trim()) {
      setError('Please write some content');
      return;
    }
    
    onSubmit({ title, content, mood });
    
    if (!isEditMode) {
      setTitle('');
      setContent('');
      setMood('neutral');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {isEditMode ? 'Edit Entry' : 'New Entry'}
        </h2>
        <button 
          onClick={onCancel}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="title" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Give your entry a title"
          />
        </div>
        
        <div className="mb-4">
          <label 
            htmlFor="content" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            placeholder="Write your thoughts..."
          />
        </div>
        
        <div className="mb-6">
          <label 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            How are you feeling?
          </label>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                className={`flex items-center px-3 py-2 rounded-full border transition-all ${
                  mood === m 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                <span className="mr-1">{getMoodEmoji(m)}</span>
                <span className="capitalize">{m}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {isEditMode ? 'Save Changes' : 'Save Entry'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiaryEntryForm;