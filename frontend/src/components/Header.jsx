import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import AuthModal from './AuthModal';
import UserProfile from './UserProfile';

const Header = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, signOut } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Navigation items for authenticated users only
  const navItems = [
    { href: '#about', label: t('nav.about'), isRoute: false },
    { href: '#projects', label: t('nav.projects'), isRoute: false },
    { href: '#contact', label: t('nav.contact'), isRoute: false }
  ];

  const handleNavigation = (item) => {
    // Scroll to section
    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    setProfileModalOpen(true);
    setUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }
    return user?.email?.split('@')[0] || 'User';
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
          <Link to="/">
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavigation(item)}
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
            
            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-primary-blue text-white hover:bg-primary-blue-dark transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {getUserDisplayName().charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{getUserDisplayName()}</span>
                  <svg className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-gray-dark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                  >
                    <div className="py-1">
                      <button
                        onClick={handleProfileClick}
                        className="w-full text-left px-4 py-2 text-sm text-neutral-black dark:text-neutral-white hover:bg-gray-100 dark:hover:bg-neutral-gray-medium transition-colors"
                      >
                        Account Settings
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-neutral-gray-medium transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => handleAuthClick('login')}
                  className="px-4 py-2 text-sm font-medium text-neutral-black dark:text-neutral-white hover:text-primary-blue dark:hover:text-primary-blue transition-colors duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="px-4 py-2 text-sm font-medium bg-primary-blue text-white rounded-lg hover:bg-primary-blue-dark transition-colors duration-200"
                >
                  Sign Up
                </button>
              </div>
            )}
            
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
                onClick={() => handleNavigation(item)}
                className="block w-full text-left py-3 px-4 text-neutral-black dark:text-neutral-white font-medium hover:bg-primary-blue dark:hover:bg-primary-blue hover:text-neutral-white dark:hover:text-neutral-white transition-colors duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}
            {/* Mobile Authentication */}
            <div className="mt-4 pt-4 border-t border-neutral-gray-light dark:border-neutral-gray-medium">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {getUserDisplayName().charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-neutral-black dark:text-neutral-white">
                      {getUserDisplayName()}
                    </span>
                  </div>
                  <button
                    onClick={handleProfileClick}
                    className="block w-full text-left py-3 px-4 text-neutral-black dark:text-neutral-white font-medium hover:bg-primary-blue dark:hover:bg-primary-blue hover:text-neutral-white dark:hover:text-neutral-white transition-colors duration-200"
                  >
                    Account Settings
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left py-3 px-4 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="block w-full text-left py-3 px-4 text-neutral-black dark:text-neutral-white font-medium hover:bg-primary-blue dark:hover:bg-primary-blue hover:text-neutral-white dark:hover:text-neutral-white transition-colors duration-200"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="block w-full text-left py-3 px-4 bg-primary-blue text-white font-medium hover:bg-primary-blue-dark transition-colors duration-200 rounded-lg mx-4"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-neutral-gray-light dark:border-neutral-gray-medium sm:hidden">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </motion.div>

        {/* Dropdown background overlay */}
        {userMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40"
            onClick={() => setUserMenuOpen(false)}
          />
        )}
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {authModalOpen && (
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            mode={authMode}
            onSwitchMode={setAuthMode}
          />
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {profileModalOpen && (
          <UserProfile
            isOpen={profileModalOpen}
            onClose={() => setProfileModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 