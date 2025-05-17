import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DiaryProvider } from './contexts/DiaryContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DiaryPage from './pages/DiaryPage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <DiaryProvider>
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/diary" element={<DiaryPage />} />
                  <Route path="/game" element={<GamePage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </DiaryProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;