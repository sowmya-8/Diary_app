import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, UserCheck, Shield, PenTool, Brain, Heart, GamepadIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-[calc(100vh-12rem)] bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Your Digital Safe Space
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Document your thoughts, track your feelings, and refresh your mind with Mindful Diary.
            </p>
            
            <div className="mt-8">
              {isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/diary"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <BookOpen className="mr-2" size={20} />
                    Go to My Diary
                  </Link>
                  <Link
                    to="/game"
                    className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <GamepadIcon className="mr-2" size={20} />
                    Play Games
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <UserCheck className="mr-2" size={20} />
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <BookOpen className="mr-2" size={20} />
                    Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Features
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Everything you need for mindful self-reflection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Private Journaling
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Document your thoughts and feelings in a secure, private environment that only you can access.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Mood Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Capture your emotional state with each entry to help you recognize patterns and improve self-awareness.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Mind Refreshing Games
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Take a break and rejuvenate your mind with built-in brain games designed to reduce stress.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Games Preview Section */}
      {isAuthenticated && (
        <section className="py-12 bg-gray-100 dark:bg-gray-800/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Mind Refreshing Games
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Take a break and play some games to refresh your mind
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mr-3">
                    <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Memory Game
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Test and improve your memory by matching pairs of cards. Challenge yourself to complete the game in fewer moves!
                </p>
                <Link
                  to="/game"
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                >
                  <GamepadIcon className="mr-2" size={18} />
                  Play Now
                </Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md flex items-center justify-center">
                <div className="text-center">
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <GamepadIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    More games coming soon!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;