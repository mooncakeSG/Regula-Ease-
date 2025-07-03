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
      icon: '📊',
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
    { number: '500+', label: t('about.stats.businesses') },
    { number: '95%', label: t('about.stats.compliance') },
    { number: '9', label: t('about.stats.provinces') },
    { number: '24/7', label: t('about.stats.availability') }
  ];

  return (
    <section id="about" className="section-padding bg-neutral-gray-light dark:bg-neutral-black transition-colors duration-500">
      <div className="container-max">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center space-x-2 bg-primary-blue/20 dark:bg-primary-blue/10 px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold text-primary-blue drop-shadow-glow dark:drop-shadow-glow-dark">
              {t('about.badge')}
            </span>
          </motion.div>
          
          <motion.h2
            className="heading-secondary text-neutral-black dark:text-neutral-white mb-6 drop-shadow-glow dark:drop-shadow-glow-dark transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t('about.title')}
          </motion.h2>
          
          <motion.p
            className="text-body text-neutral-gray-medium dark:text-neutral-white/80 max-w-3xl mx-auto transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('about.subtitle')}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Mission Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl font-bold text-neutral-black dark:text-neutral-white mb-4 transition-colors duration-300">
                {t('about.mission.title')}
              </h3>
              <p className="text-neutral-gray-medium dark:text-neutral-white/80 mb-6 transition-colors duration-300">
                {t('about.mission.description')}
              </p>
              <ul className="space-y-3">
                {[
                  t('about.mission.points.empowerment'),
                  t('about.mission.points.compliance'),
                  t('about.mission.points.growth'),
                  t('about.mission.points.accessibility')
                ].map((point, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-primary-blue text-lg mt-1">✓</span>
                    <span className="text-neutral-gray-medium dark:text-neutral-white/80 transition-colors duration-300">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-neutral-black dark:text-neutral-white mb-4 transition-colors duration-300">
                {t('about.vision.title')}
              </h3>
              <p className="text-neutral-gray-medium dark:text-neutral-white/80 transition-colors duration-300">
                {t('about.vision.description')}
              </p>
            </div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-neutral-white dark:bg-neutral-gray-medium rounded-2xl p-8 shadow-2xl dark:shadow-accent-blue/20 transition-all duration-300">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🇿🇦</span>
                </div>
                <h4 className="text-xl font-bold text-neutral-black dark:text-neutral-white transition-colors duration-300">
                  {t('about.visual.title')}
                </h4>
                <p className="text-neutral-gray-medium dark:text-neutral-white/80 transition-colors duration-300">
                  {t('about.visual.subtitle')}
                </p>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-blue/20 dark:bg-primary-blue/10 rounded-2xl -z-10 transition-colors duration-300"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-orange/20 dark:bg-accent-orange/10 rounded-2xl -z-10 transition-colors duration-300"></div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card text-center hover:drop-shadow-glow dark:hover:drop-shadow-glow-dark"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-lg font-bold text-neutral-black dark:text-neutral-white mb-2 transition-colors duration-300">
                {feature.title}
              </h4>
              <p className="text-neutral-gray-medium dark:text-neutral-white/80 text-sm transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neutral-black dark:text-neutral-white mb-12 transition-colors duration-300">
            {t('about.impact.title')}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary-blue mb-2 drop-shadow-glow dark:drop-shadow-glow-dark">
                  {stat.number}
                </div>
                <div className="text-neutral-gray-medium dark:text-neutral-white/80 font-medium transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 