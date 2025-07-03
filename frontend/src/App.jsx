import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AuthLanding from './components/AuthLanding';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-white via-blue-50 to-neutral-white dark:from-neutral-gray-dark dark:via-neutral-gray-medium dark:to-neutral-gray-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-neutral-gray-medium dark:text-neutral-white/70">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <AuthLanding />;
};

// Main App Content
const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  return (
    <div className={`App font-inter min-h-screen bg-neutral-white dark:bg-neutral-gray-dark transition-colors duration-300 ${theme}`}>
      {/* Only show header for authenticated users */}
      {isAuthenticated && <Header />}

      {/* Route-based Content */}
      <Routes>
        {/* Root redirects to protected home page */}
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        
        {/* All other routes also require authentication */}
        <Route path="*" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
};

function App() {
  const { t } = useTranslation();

  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App; 