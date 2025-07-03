import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg 
                 bg-neutral-gray-light dark:bg-neutral-gray-medium 
                 hover:bg-neutral-gray-medium dark:hover:bg-neutral-gray-light 
                 transition-all duration-200 
                 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 
                 dark:focus:ring-offset-neutral-gray-dark"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        {/* Sun icon */}
        <svg
          className={`absolute top-0 left-0 w-5 h-5 transition-all duration-300 transform
                     ${theme === 'dark' ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        
        {/* Moon icon */}
        <svg
          className={`absolute top-0 left-0 w-5 h-5 transition-all duration-300 transform
                     ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </div>
    </button>
  );
};

export default ThemeToggle; 