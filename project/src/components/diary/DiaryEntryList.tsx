import React, { useState } from 'react';
import { format } from 'date-fns';
import { DiaryEntry } from '../../types';
import DiaryEntryCard from './DiaryEntryCard';
import { Book, SortDesc, SortAsc, CalendarRange } from 'lucide-react';

interface DiaryEntryListProps {
  entries: DiaryEntry[];
  onEditEntry: (entry: DiaryEntry) => void;
  onDeleteEntry: (id: string) => void;
}

type SortOrder = 'newest' | 'oldest';

const DiaryEntryList: React.FC<DiaryEntryListProps> = ({ 
  entries,
  onEditEntry,
  onDeleteEntry 
}) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [filter, setFilter] = useState('');
  
  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };
  
  const sortedEntries = [...entries].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });
  
  const filteredEntries = filter
    ? sortedEntries.filter(entry => 
        entry.title.toLowerCase().includes(filter.toLowerCase()) || 
        entry.content.toLowerCase().includes(filter.toLowerCase()) ||
        entry.mood.toLowerCase().includes(filter.toLowerCase())
      )
    : sortedEntries;

  // Group entries by date
  const groupedEntries: { [date: string]: DiaryEntry[] } = {};
  
  filteredEntries.forEach(entry => {
    const date = format(new Date(entry.createdAt), 'MMMM d, yyyy');
    if (!groupedEntries[date]) {
      groupedEntries[date] = [];
    }
    groupedEntries[date].push(entry);
  });

  const groupDates = Object.keys(groupedEntries);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center">
            <Book className="mr-2 text-blue-600 dark:text-blue-400" size={20} />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Your Diary
            </h2>
            <div className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium">
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search entries..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-1.5 pr-8 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
            
            <button
              onClick={handleSortToggle}
              className="flex items-center px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              {sortOrder === 'newest' ? (
                <>
                  <SortDesc size={16} className="mr-1" /> Newest
                </>
              ) : (
                <>
                  <SortAsc size={16} className="mr-1" /> Oldest
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {filteredEntries.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <CalendarRange className="mx-auto text-gray-400 dark:text-gray-500" size={48} />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            {filter ? 'No entries found' : 'No diary entries yet'}
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            {filter 
              ? `Try a different search term or clear the filter.`
              : `Start writing your thoughts and feelings to create your first diary entry.`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {groupDates.map((date) => (
            <div key={date} className="space-y-4">
              <div className="flex items-center">
                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-grow mr-3"></div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                  <CalendarRange size={16} className="mr-1" /> {date}
                </span>
                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-grow ml-3"></div>
              </div>
              
              <div className="grid gap-4 grid-cols-1">
                {groupedEntries[date].map((entry) => (
                  <DiaryEntryCard
                    key={entry.id}
                    entry={entry}
                    onEdit={onEditEntry}
                    onDelete={onDeleteEntry}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiaryEntryList;