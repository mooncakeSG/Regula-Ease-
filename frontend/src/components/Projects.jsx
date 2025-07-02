import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Checklist from './Checklist';
import Skills from './Skills';

const Projects = () => {
  const { t } = useTranslation();

  const projectFeatures = [
    {
      icon: '📋',
      title: t('checklist.title'),
      description: t('checklist.description'),
      color: 'from-primary-yellow to-primary-yellow-light',
      component: 'checklist'
    },
    {
      icon: '📚',
      title: t('skills.title'),
      description: t('skills.description'),
      color: 'from-accent-green to-accent-blue',
      component: 'skills'
    },
    {
      icon: '🤖',
      title: t('chatbot.title'),
      description: t('chatbot.description'),
      color: 'from-accent-orange to-accent-red',
      component: 'chatbot'
    }
  ];

  const aiFeatures = [
    { icon: '💡', text: t('cta.features.guidance') },
    { icon: '📋', text: t('cta.features.compliance') },
    { icon: '💰', text: t('cta.features.support') },
    { icon: '🏛️', text: t('cta.features.growth') }
  ];

  return (
    <section id="projects" className="section-padding bg-neutral-gray-light">
      <div className="container-max">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-primary-yellow px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-neutral-black">🚀</span>
            <span className="text-sm font-semibold text-neutral-black">{t('projects.badge')}</span>
          </motion.div>
          
          <h2 className="heading-secondary mb-6">{t('projects.title')}</h2>
          <p className="text-body max-w-3xl mx-auto">{t('projects.subtitle')}</p>
        </motion.div>

        {/* Project Features Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {projectFeatures.map((project, index) => (
            <motion.div 
              key={index}
              className="card relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${project.color}`}></div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${project.color} rounded-xl flex items-center justify-center`}>
                    <span className="text-2xl">{project.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-black">{project.title}</h3>
                  </div>
                </div>
                
                <p className="text-neutral-gray-medium mb-6">{project.description}</p>
                
                <motion.button
                  className="btn-primary w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const element = document.querySelector('.app-main');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {t('projects.explore')} →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live Features Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Business Checklist */}
          <motion.div 
            className="bg-neutral-white rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary-yellow rounded-lg flex items-center justify-center">
                <span className="text-xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-black">{t('checklist.title')}</h3>
            </div>
            <Checklist />
          </motion.div>

          {/* Skills Resources */}
          <motion.div 
            className="bg-neutral-white rounded-2xl p-8 shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-accent-green rounded-lg flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>
              <h3 className="text-xl font-bold text-neutral-black">{t('skills.title')}</h3>
            </div>
            <Skills />
          </motion.div>
        </div>

        {/* AI Assistant CTA */}
        <motion.div 
          className="bg-gradient-dark rounded-3xl p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-primary-yellow rounded-xl flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-3xl font-bold text-neutral-white">{t('chatbot.title')}</h3>
            </div>
            
            <p className="text-xl text-neutral-white mb-8">{t('chatbot.description')}</p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {aiFeatures.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3 bg-neutral-white bg-opacity-10 rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-neutral-white font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <p className="text-xl font-semibold text-neutral-white">{t('cta.action')}</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💬</span>
                <span className="text-2xl">↘️</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 