import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <>
      <div className="App font-inter">
        {/* Sticky Header */}
        <Header />

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
}

export default App; 