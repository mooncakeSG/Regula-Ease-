import React, { createContext, useContext, useState, useCallback } from 'react';

const GlobalErrorContext = createContext();

export const useGlobalError = () => useContext(GlobalErrorContext);

export const GlobalErrorProvider = ({ children }) => {
  const [error, setError] = useState('');

  const showError = useCallback((msg) => {
    setError(msg);
  }, []);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  return (
    <GlobalErrorContext.Provider value={{ error, showError, clearError }}>
      {children}
      {error && (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
          <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 rounded-b-lg shadow-lg flex items-center max-w-xl w-full mx-2 mt-2">
            <span className="flex-1 text-center">{error}</span>
            <button onClick={clearError} className="ml-4 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </GlobalErrorContext.Provider>
  );
}; 