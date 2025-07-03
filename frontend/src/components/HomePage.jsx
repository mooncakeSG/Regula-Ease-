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
      <div className={`HomePage font-inter min-h-screen bg-gradient-to-br from-[#E0F2FF] via-[#F0F8FF] to-[#E8F0FF] dark:from-neutral-gray-dark dark:via-neutral-gray-medium dark:to-neutral-gray-dark bg-[length:400%_400%] animate-gradient-flow transition-colors duration-300 relative overflow-hidden ${theme}`}>
        {/* Animated Background Shapes */}
        <div className="pointer-events-none absolute z-[-1] top-[-80px] left-[-80px] w-[320px] h-[320px] bg-[#DBEAFE] dark:bg-[#1e293b] blur-2xl opacity-40 dark:opacity-20 rounded-full animate-pulse" />
        <div className="pointer-events-none absolute z-[-1] bottom-[-100px] right-[-60px] w-[280px] h-[280px] bg-[#C7D2FE] dark:bg-[#334155] blur-2xl opacity-40 dark:opacity-20 rounded-full animate-spin-slow" />
        <div className="pointer-events-none absolute z-[-1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-[#E8F0FF] dark:bg-[#64748b] blur-2xl opacity-30 dark:opacity-10 rounded-full animate-float-slow" />
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