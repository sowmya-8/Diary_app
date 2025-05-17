import React, { createContext, useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from '../utils/uuid';
import { AuthContextType, User } from '../types';
import { verifyUser, saveUser, findUserByUsername } from '../utils/localStorage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const user = verifyUser(username, password);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    if (findUserByUsername(username)) {
      return false; // Username already exists
    }

    const newUser: User = {
      id: uuidv4(),
      username,
      password,
    };

    saveUser(newUser);
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};