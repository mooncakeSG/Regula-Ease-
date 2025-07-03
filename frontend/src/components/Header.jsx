import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-neutral-white dark:bg-neutral-gray-dark shadow-lg border-b-4 border-primary-blue transition-colors duration-300"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-max">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-neutral-white">R</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-black dark:text-neutral-white drop-shadow-glow dark:drop-shadow-glow-dark transition duration-300 hover:drop-shadow-glow-strong dark:hover:drop-shadow-glow-dark-strong">
                RegulaEase
              </h1>
              <p className="text-sm text-neutral-gray-medium dark:text-neutral-white/70">🇿🇦 {t('header.tagline')}</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-neutral-black dark:text-neutral-white font-medium hover:text-primary-blue dark:hover:text-primary-blue transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Header Controls */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-neutral-gray-light dark:bg-neutral-gray-medium hover:bg-primary-blue dark:hover:bg-primary-blue transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center">
                <span className={`block h-0.5 w-6 bg-neutral-black dark:bg-neutral-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-neutral-black dark:bg-neutral-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'my-1'}`}></span>
                <span className={`block h-0.5 w-6 bg-neutral-black dark:bg-neutral-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div 
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 border-t border-neutral-gray-light dark:border-neutral-gray-medium">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left py-3 px-4 text-neutral-black dark:text-neutral-white font-medium hover:bg-primary-blue dark:hover:bg-primary-blue hover:text-neutral-white dark:hover:text-neutral-white transition-colors duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}
            <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-neutral-gray-light dark:border-neutral-gray-medium sm:hidden">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header; 