import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') }
  ];

  const resources = [
    { label: t('footer.resources.compliance'), href: '#' },
    { label: t('footer.resources.skills'), href: '#' },
    { label: t('footer.resources.support'), href: '#' },
    { label: t('footer.resources.community'), href: '#' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-gradient-dark text-neutral-white">
      {/* Main Footer Content */}
      <div className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-neutral-black">R</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-white">RegulaEase</h3>
                  <p className="text-neutral-white opacity-75">🇿🇦 {t('footer.tagline')}</p>
                </div>
              </div>
              
              <p className="text-neutral-white opacity-90 mb-6 max-w-md leading-relaxed">
                {t('footer.description')}
              </p>
              
              {/* Social/Contact Links */}
              <div className="flex space-x-4">
                {[
                  { icon: '📧', label: t('footer.contact.email') },
                  { icon: '📱', label: t('footer.contact.phone') },
                  { icon: '🌐', label: t('footer.contact.website') }
                ].map((contact, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-2 bg-neutral-white bg-opacity-10 rounded-lg p-3"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-lg">{contact.icon}</span>
                    <span className="text-sm font-medium">{contact.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-neutral-white mb-6">{t('footer.quickLinks')}</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <motion.button
                      onClick={() => scrollToSection(link.href)}
                      className="text-neutral-white opacity-75 hover:opacity-100 hover:text-primary-yellow transition-all duration-200"
                      whileHover={{ x: 5 }}
                    >
                      {link.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-neutral-white mb-6">{t('footer.resources.title')}</h4>
              <ul className="space-y-3">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <motion.a
                      href={resource.href}
                      className="text-neutral-white opacity-75 hover:opacity-100 hover:text-primary-yellow transition-all duration-200"
                      whileHover={{ x: 5 }}
                    >
                      {resource.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Stats/Features Section */}
          <motion.div 
            className="border-t border-neutral-white border-opacity-20 mt-12 pt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { icon: '📋', title: t('footer.features.compliance'), desc: t('footer.features.complianceDesc') },
                { icon: '📚', title: t('footer.features.skills'), desc: t('footer.features.skillsDesc') },
                { icon: '🤖', title: t('footer.features.ai'), desc: t('footer.features.aiDesc') },
                { icon: '🌍', title: t('footer.features.multilingual'), desc: t('footer.features.multilingualDesc') }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="p-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h5 className="font-bold text-neutral-white mb-2">{feature.title}</h5>
                  <p className="text-sm text-neutral-white opacity-75">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div 
        className="border-t border-neutral-white border-opacity-20 py-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="container-max">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-neutral-white opacity-75">
                {t('footer.copyright')}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-primary-yellow">🇿🇦</span>
                <span className="text-sm text-neutral-white opacity-75">{t('footer.madeIn')}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <motion.button
                onClick={() => scrollToSection('#home')}
                className="flex items-center space-x-2 text-neutral-white opacity-75 hover:opacity-100 hover:text-primary-yellow transition-all duration-200"
                whileHover={{ y: -2 }}
              >
                <span>{t('footer.backToTop')}</span>
                <span>↑</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer; 