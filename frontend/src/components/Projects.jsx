import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Checklist from './Checklist';
import Skills from './Skills';
import Chatbot from './Chatbot';
import Quiz from './Quiz';

const Projects = () => {
  const { t } = useTranslation();
  const [activeFeature, setActiveFeature] = useState(null);

  const features = [
    {
      id: 'compliance',
      icon: '📋',
      title: 'Business Compliance',
      description: 'Interactive compliance checklists tailored to your business type with progress tracking and export capabilities.',
      features: ['Dynamic checklists', 'Progress tracking', 'CSV export', 'Priority management'],
      color: 'bg-primary-blue',
      component: 'checklist'
    },
    {
      id: 'skills',
      icon: '📚',
      title: 'Skills Development',
      description: 'Curated learning resources from SEDA, IDC, and other trusted providers with advanced filtering.',
      features: ['Resource filtering', 'Bookmark system', 'Multi-format learning', 'Provider integration'],
      color: 'bg-accent-green',
      component: 'skills'
    },
    {
      id: 'ai-assistant',
      icon: '🤖',
      title: 'AI Business Assistant',
      description: 'Context-aware AI guidance with tone adaptation and industry-specific knowledge.',
      features: ['Context memory', 'Tone adjustment', 'Industry specialization', 'Multi-language'],
      color: 'bg-accent-blue',
      component: 'chatbot'
    },
    {
      id: 'quiz',
      icon: '🧠',
      title: 'Business Knowledge Quiz',
      description: 'Test your understanding of South African business compliance with our interactive quiz.',
      features: ['5 SA-focused questions', 'Instant feedback', 'Detailed explanations', 'Progress tracking'],
      color: 'bg-purple-600',
      component: 'quiz'
    }
  ];

  const handleFeatureClick = (featureId) => {
    setActiveFeature(featureId);
  };

  const handleBackToOverview = () => {
    setActiveFeature(null);
  };

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderFeatureComponent = () => {
    const feature = features.find(f => f.id === activeFeature);
    if (!feature) return null;

    switch (feature.component) {
      case 'checklist':
        return <Checklist />;
      case 'skills':
        return <Skills />;
      case 'chatbot':
        return <Chatbot />;
      case 'quiz':
        return <Quiz />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="section-padding bg-neutral-white dark:bg-neutral-gray-dark transition-colors duration-500">
      <div className="container-max">
        <AnimatePresence mode="wait">
          {!activeFeature ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center space-x-2 bg-accent-blue/20 dark:bg-accent-blue/10 px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-accent-blue drop-shadow-glow dark:drop-shadow-glow-dark">
              {t('projects.badge')}
            </span>
          </motion.div>
          
          <motion.h2
            className="heading-secondary text-neutral-black dark:text-neutral-white mb-6 drop-shadow-glow dark:drop-shadow-glow-dark transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t('projects.title')}
          </motion.h2>
          
          <motion.p
            className="text-body text-neutral-gray-medium dark:text-neutral-white/80 max-w-3xl mx-auto transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('projects.subtitle')}
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="card h-full hover:drop-shadow-glow-strong dark:hover:drop-shadow-glow-dark-strong transition-all duration-300">
                {/* Feature Icon */}
                <div className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-neutral-black dark:text-neutral-white mb-4 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-neutral-gray-medium dark:text-neutral-white/80 mb-6 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Feature List */}
                <ul className="space-y-2 mb-6">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="text-primary-blue">✓</span>
                      <span className="text-sm text-neutral-gray-medium dark:text-neutral-white/70 transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <motion.button
                  onClick={() => handleFeatureClick(feature.id)}
                  className="w-full bg-neutral-gray-light dark:bg-neutral-gray-dark text-neutral-black dark:text-neutral-white py-3 px-4 rounded-lg font-medium hover:bg-primary-blue dark:hover:bg-primary-blue hover:text-neutral-white transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>{t('projects.explore')}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="relative bg-gradient-to-br from-primary-blue to-accent-blue dark:from-primary-blue/90 dark:to-accent-blue/90 rounded-3xl p-12 text-center overflow-hidden transition-colors duration-500"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-neutral-white rounded-full"></div>
            <div className="absolute top-8 right-8 w-6 h-6 border-2 border-neutral-white rounded-full"></div>
            <div className="absolute bottom-8 left-8 w-4 h-4 border-2 border-neutral-white rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-neutral-white rounded-full"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-neutral-white mb-4 drop-shadow-glow-strong">
              {t('cta.title')}
            </h3>
            <p className="text-lg text-neutral-white/80 mb-8">
              {t('cta.description')}
            </p>

            {/* Feature highlights */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: '🎯', text: t('cta.features.guidance') },
                { icon: '🚀', text: t('cta.features.support') },
                { icon: '🇿🇦', text: t('cta.features.compliance') },
                { icon: '📈', text: t('cta.features.growth') }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 bg-neutral-white/20 dark:bg-neutral-black/20 rounded-lg p-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium text-neutral-white">{item.text}</span>
                </div>
              ))}
            </div>

            <p className="text-lg font-semibold text-neutral-white mb-4">
              {t('cta.action')}
            </p>

            {/* Arrow pointing down */}
            <motion.div
              className="text-4xl text-neutral-white"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↓
            </motion.div>
            
            <p className="text-sm text-neutral-white/80 mt-2">
              {t('cta.arrow')}
            </p>
          </div>
        </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="feature"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {/* Back Button */}
              <div className="mb-8">
                <motion.button
                  onClick={handleBackToOverview}
                  className="flex items-center space-x-2 text-primary-blue hover:text-primary-blue-dark transition-colors duration-200 group"
                  whileHover={{ x: -5 }}
                >
                  <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                  <span className="font-medium">Back to Features Overview</span>
                </motion.button>
              </div>

              {/* Feature Component */}
              <div className="bg-neutral-white dark:bg-neutral-gray-medium rounded-2xl shadow-xl dark:shadow-accent-blue/20 overflow-hidden transition-colors duration-300">
                {renderFeatureComponent()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects; 