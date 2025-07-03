import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Hero = () => {
  const { t } = useTranslation();

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-neutral-white to-neutral-gray-light dark:from-neutral-gray-dark dark:to-neutral-black section-padding flex items-center overflow-hidden transition-colors duration-500">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div 
            className="space-y-8 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-primary-blue dark:bg-primary-blue/90 px-4 py-2 rounded-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-semibold text-neutral-white">🇿🇦</span>
              <span className="text-sm font-semibold text-neutral-white">{t('hero.badge')}</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="heading-primary text-neutral-black dark:text-neutral-white transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block">{t('hero.title.line1')}</span>
              <span className="block text-gradient drop-shadow-glow dark:drop-shadow-glow-dark">{t('hero.title.line2')}</span>
              <span className="block">{t('hero.title.line3')}</span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p 
              className="text-body text-neutral-gray-medium dark:text-neutral-white/80 max-w-2xl transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {t('hero.description')}
            </motion.p>

            {/* Feature Highlights */}
            <motion.div 
              className="grid sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: '📋', text: t('hero.features.compliance') },
                { icon: '📚', text: t('hero.features.skills') },
                { icon: '🤖', text: t('hero.features.ai') },
                { icon: '🌍', text: t('hero.features.multilingual') }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-neutral-gray-medium dark:text-neutral-white/70 font-medium transition-colors duration-300">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={() => scrollToSection('#projects')}
                className="btn-primary text-lg px-8 py-4 hover:drop-shadow-glow-strong dark:hover:drop-shadow-glow-dark-strong transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.cta.primary')} →
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('#about')}
                className="btn-secondary text-lg px-8 py-4 bg-neutral-black dark:bg-neutral-white text-neutral-white dark:text-neutral-black hover:bg-neutral-gray-medium dark:hover:bg-neutral-gray-light transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.cta.secondary')}
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap gap-8 pt-8 border-t border-neutral-gray-light dark:border-neutral-gray-medium transition-colors duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { number: '1000+', label: t('hero.stats.entrepreneurs') },
                { number: '4', label: t('hero.stats.languages') },
                { number: '24/7', label: t('hero.stats.support') }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-neutral-black dark:text-neutral-white transition-colors duration-300">{stat.number}</div>
                  <div className="text-sm text-neutral-gray-medium dark:text-neutral-white/70 transition-colors duration-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            className="relative lg:justify-self-end w-full max-w-lg mx-auto lg:mx-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Main Visual Card */}
            <div className="relative z-20 bg-neutral-white dark:bg-neutral-gray-medium rounded-2xl shadow-2xl dark:shadow-accent-blue/20 p-6 lg:p-8 border-4 border-primary-blue mx-4 lg:mx-0 transition-all duration-300">
              <div className="space-y-6">
                {/* Mock Dashboard Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex-shrink-0"></div>
                    <span className="font-bold text-neutral-black dark:text-neutral-white text-sm lg:text-base transition-colors duration-300">RegulaEase Dashboard</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-accent-green rounded-full"></div>
                    <div className="w-3 h-3 bg-primary-blue rounded-full"></div>
                    <div className="w-3 h-3 bg-accent-red rounded-full"></div>
                  </div>
                </div>

                {/* Mock Content */}
                <div className="space-y-4">
                  <div className="h-3 bg-neutral-gray-light dark:bg-neutral-gray-dark rounded-md transition-colors duration-300"></div>
                  <div className="h-3 bg-neutral-gray-light dark:bg-neutral-gray-dark rounded-md w-3/4 transition-colors duration-300"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-14 lg:h-16 bg-primary-blue rounded-lg flex items-center justify-center">
                      <span className="text-xl lg:text-2xl">📋</span>
                    </div>
                    <div className="h-14 lg:h-16 bg-accent-green rounded-lg flex items-center justify-center">
                      <span className="text-xl lg:text-2xl">📚</span>
                    </div>
                  </div>
                  <div className="h-8 bg-accent-blue rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium text-sm lg:text-base">🤖 AI Assistant Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 w-16 lg:w-24 h-16 lg:h-24 bg-primary-blue/20 dark:bg-primary-blue/10 rounded-2xl z-10 transition-colors duration-300"></div>
            <div className="absolute -bottom-2 -left-2 lg:-bottom-4 lg:-left-4 w-20 lg:w-32 h-20 lg:h-32 bg-accent-orange/20 dark:bg-accent-orange/10 rounded-2xl z-10 transition-colors duration-300"></div>
            
            {/* Floating Elements - Better positioned and responsive */}
            <motion.div 
              className="absolute top-0 lg:-top-4 left-0 lg:-left-12 bg-neutral-white dark:bg-neutral-gray-medium rounded-xl shadow-lg dark:shadow-accent-blue/20 p-3 lg:p-4 z-30 hidden lg:block transition-all duration-300"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-base lg:text-lg">🚀</span>
                <span className="text-xs lg:text-sm font-medium text-neutral-black dark:text-neutral-white whitespace-nowrap transition-colors duration-300">{t('hero.floating.growth')}</span>
              </div>
            </motion.div>

            <motion.div 
              className="absolute -bottom-6 lg:-bottom-8 left-1/2 transform -translate-x-1/2 lg:left-auto lg:transform-none lg:-right-12 bg-neutral-white dark:bg-neutral-gray-medium rounded-xl shadow-lg dark:shadow-accent-blue/20 p-3 lg:p-4 z-30 hidden lg:block transition-all duration-300"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-base lg:text-lg">✅</span>
                <span className="text-xs lg:text-sm font-medium text-neutral-black dark:text-neutral-white whitespace-nowrap transition-colors duration-300">{t('hero.floating.compliant')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 