import React from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { DiaryEntry, Mood } from '../../types';

interface DiaryEntryCardProps {
  entry: DiaryEntry;
  onEdit: (entry: DiaryEntry) => void;
  onDelete: (id: string) => void;
}

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

const getMoodColor = (mood: Mood): string => {
  switch (mood) {
    case 'happy': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
    case 'calm': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
    case 'sad': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
    case 'angry': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
    case 'anxious': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200';
    case 'neutral': return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
  }
};

const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({ entry, onEdit, onDelete }) => {
  const formattedDate = format(new Date(entry.createdAt), 'MMMM d, yyyy');
  const formattedTime = format(new Date(entry.createdAt), 'h:mm a');
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {entry.title}
          </h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formattedDate} at {formattedTime}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${getMoodColor(entry.mood)}`}>
              {getMoodEmoji(entry.mood)} {entry.mood}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(entry)}
            className="p-1 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          >
            <Pencil size={18} />
          </button>
          <button 
            onClick={() => onDelete(entry.id)}
            className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="mt-3 text-gray-700 dark:text-gray-300 prose dark:prose-invert">
        <p className="whitespace-pre-line">
          {entry.content.length > 150 
            ? `${entry.content.substring(0, 150)}...` 
            : entry.content}
        </p>
      </div>
      
      {entry.content.length > 150 && (
        <button 
          onClick={() => onEdit(entry)}
          className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Read more
        </button>
      )}
    </div>
  );
};

export default DiaryEntryCard;