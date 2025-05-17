import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 py-6 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <span className="text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Mindful Diary
            </span>
          </div>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <div className="flex items-center">
              Made with <Heart className="mx-1 text-red-500" size={14} /> for your mental wellbeing
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;