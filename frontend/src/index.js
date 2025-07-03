import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './contexts/ThemeContext';
import './i18n'; // Initialize i18n
import { GlobalErrorProvider } from './contexts/GlobalErrorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalErrorProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GlobalErrorProvider>
  </React.StrictMode>
); 