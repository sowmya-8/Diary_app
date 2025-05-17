import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MemoryGame from '../components/game/MemoryGame';
import { useAuth } from '../contexts/AuthContext';

const GamePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-[calc(100vh-12rem)] bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mind Refresher
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Take a break and play a quick game to refresh your mind.
          </p>
        </div>
        
        <MemoryGame />
      </div>
    </div>
  );
};

export default GamePage;