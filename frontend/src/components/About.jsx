import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const About = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: '🎯',
      title: t('about.features.mission.title'),
      description: t('about.features.mission.description')
    },
    {
      icon: '🌍',
      title: t('about.features.impact.title'),
      description: t('about.features.impact.description')
    },
    {
      icon: '🚀',
      title: t('about.features.innovation.title'),
      description: t('about.features.innovation.description')
    },
    {
      icon: '🤝',
      title: t('about.features.community.title'),
      description: t('about.features.community.description')
    }
  ];

  const stats = [
    { number: '50,000+', label: t('about.stats.businesses') },
    { number: '95%', label: t('about.stats.compliance') },
    { number: '4', label: t('about.stats.provinces') },
    { number: '24/7', label: t('about.stats.availability') }
  ];

  return (
    <section id="about" className="section-padding bg-neutral-white">
      <div className="container-max">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-secondary mb-6">{t('about.title')}</h2>
          <p className="text-body max-w-3xl mx-auto">{t('about.subtitle')}</p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-3xl font-bold text-neutral-black mb-4">{t('about.mission.title')}</h3>
              <p className="text-body mb-6">{t('about.mission.description')}</p>
            </div>

            <div className="space-y-4">
              {[
                t('about.mission.points.empowerment'),
                t('about.mission.points.compliance'),
                t('about.mission.points.growth'),
                t('about.mission.points.accessibility')
              ].map((point, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-6 h-6 bg-primary-yellow rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-neutral-black text-sm font-bold">✓</span>
                  </div>
                  <p className="text-neutral-gray-medium">{point}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="bg-gradient-primary p-6 rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-neutral-black rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-neutral-black mb-2">{t('about.vision.title')}</h4>
                  <p className="text-neutral-gray-medium">{t('about.vision.description')}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* South Africa Map Visual */}
            <div className="relative bg-gradient-to-br from-primary-yellow to-accent-orange rounded-3xl p-8 h-96 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-8xl">🇿🇦</div>
                <h4 className="text-2xl font-bold text-neutral-black">{t('about.visual.title')}</h4>
                <p className="text-neutral-gray-medium font-medium">{t('about.visual.subtitle')}</p>
              </div>
              
              {/* Floating Stats */}
              {stats.slice(0, 2).map((stat, index) => (
                <motion.div 
                  key={index}
                  className="absolute bg-neutral-white rounded-xl shadow-lg p-4"
                  style={{
                    top: index === 0 ? '10%' : 'auto',
                    bottom: index === 1 ? '10%' : 'auto',
                    right: index === 0 ? '-10%' : 'auto',
                    left: index === 1 ? '-10%' : 'auto'
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 1.5 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neutral-black">{stat.number}</div>
                    <div className="text-sm text-neutral-gray-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="card text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-primary-yellow rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h4 className="text-xl font-bold text-neutral-black mb-3">{feature.title}</h4>
              <p className="text-neutral-gray-medium">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="bg-gradient-dark rounded-3xl p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-neutral-white mb-8">{t('about.impact.title')}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold text-primary-yellow mb-2">{stat.number}</div>
                <div className="text-neutral-white">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 