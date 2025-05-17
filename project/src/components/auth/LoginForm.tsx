import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      
      if (success) {
        navigate('/diary');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-all">
      <div className="flex justify-center mb-6">
        <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
          <LogIn className="h-8 w-8 text-blue-600 dark:text-blue-300" />
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        Welcome Back
      </h2>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label 
            htmlFor="username" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter your username"
          />
        </div>
        
        <div className="mb-6">
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter your password"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Don't have an account?{' '}
        <button 
          onClick={() => navigate('/register')}
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;