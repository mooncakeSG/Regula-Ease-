import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Footer from './Footer';
import ChatbotWidget from './ChatbotWidget';

const HomePage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <>
      <div className={`HomePage font-inter min-h-screen bg-neutral-white dark:bg-neutral-gray-dark transition-colors duration-300 ${theme}`}>
        {/* Hero Section */}
        <Hero />

        {/* About/Mission Section */}
        <About />

        {/* Projects/Features Section */}
        <Projects />

        {/* Footer */}
        <Footer />
      </div>
      
      {/* Floating Chat Widget */}
      <ChatbotWidget />
    </>
  );
};

export default HomePage; 