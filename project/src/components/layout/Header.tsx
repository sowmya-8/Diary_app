import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, LogOut, User, Moon, Sun, GamepadIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Header: React.FC = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/"
              className="flex items-center text-xl font-semibold text-blue-600 dark:text-blue-400"
            >
              <Book className="mr-2" size={24} />
              <span>Mindful Diary</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/diary"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/diary' 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="hidden sm:inline">My Diary</span>
                  <Book className="sm:hidden" size={20} />
                </Link>
                
                <Link
                  to="/game"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/game' 
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="hidden sm:inline">Game</span>
                  <GamepadIcon className="sm:hidden" size={20} />
                </Link>
                
                <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <User className="mr-1" size={18} />
                  <span className="font-medium truncate max-w-[100px]">
                    {currentUser?.username}
                  </span>
                </div>
                
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  {isDarkMode ? (
                    <Sun size={20} />
                  ) : (
                    <Moon size={20} />
                  )}
                </button>
                
                <button
                  onClick={logout}
                  className="flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <span className="hidden sm:inline mr-1">Logout</span>
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  {isDarkMode ? (
                    <Sun size={20} />
                  ) : (
                    <Moon size={20} />
                  )}
                </button>
                
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/login' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  Login
                </Link>
                
                <Link
                  to="/register"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/register' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;