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
    <section id="home" className="min-h-screen bg-gradient-to-br from-neutral-white to-neutral-gray-light section-padding flex items-center">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-primary-yellow px-4 py-2 rounded-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-semibold text-neutral-black">🇿🇦</span>
              <span className="text-sm font-semibold text-neutral-black">{t('hero.badge')}</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="heading-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="block">{t('hero.title.line1')}</span>
              <span className="block text-gradient">{t('hero.title.line2')}</span>
              <span className="block">{t('hero.title.line3')}</span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p 
              className="text-body max-w-2xl"
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
                  <span className="text-neutral-gray-medium font-medium">{feature.text}</span>
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
                className="btn-primary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.cta.primary')} →
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('#about')}
                className="btn-secondary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.cta.secondary')}
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap gap-8 pt-8 border-t border-neutral-gray-light"
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
                  <div className="text-2xl font-bold text-neutral-black">{stat.number}</div>
                  <div className="text-sm text-neutral-gray-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Main Visual Card */}
            <div className="relative z-10 bg-neutral-white rounded-2xl shadow-2xl p-8 border-4 border-primary-yellow">
              <div className="space-y-6">
                {/* Mock Dashboard Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
                    <span className="font-bold text-neutral-black">RegulaEase Dashboard</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-accent-green rounded-full"></div>
                    <div className="w-3 h-3 bg-primary-yellow rounded-full"></div>
                    <div className="w-3 h-3 bg-accent-red rounded-full"></div>
                  </div>
                </div>

                {/* Mock Content */}
                <div className="space-y-4">
                  <div className="h-4 bg-neutral-gray-light rounded-md"></div>
                  <div className="h-4 bg-neutral-gray-light rounded-md w-3/4"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-16 bg-primary-yellow rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📋</span>
                    </div>
                    <div className="h-16 bg-accent-green rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📚</span>
                    </div>
                  </div>
                  <div className="h-8 bg-accent-blue rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium">🤖 AI Assistant Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-yellow rounded-2xl opacity-20 -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-orange rounded-2xl opacity-20 -z-10"></div>
            
            {/* Floating Elements */}
            <motion.div 
              className="absolute top-8 -left-8 bg-neutral-white rounded-xl shadow-lg p-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">🚀</span>
                <span className="text-sm font-medium text-neutral-black">{t('hero.floating.growth')}</span>
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-8 -right-8 bg-neutral-white rounded-xl shadow-lg p-4"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">✅</span>
                <span className="text-sm font-medium text-neutral-black">{t('hero.floating.compliant')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 