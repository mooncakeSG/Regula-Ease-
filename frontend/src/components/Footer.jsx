import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.projects'), href: '#projects' }
  ];

  const resources = [
    { name: 'Business Compliance', href: '#projects' },
    { name: 'Skills Development', href: '#projects' },
    { name: 'AI Assistant', href: '#projects' }
  ];

  const support = [
    { name: 'SEDA', href: 'https://www.seda.org.za', external: true },
    { name: 'IDC', href: 'https://www.idc.co.za', external: true },
    { name: 'CIPC', href: 'https://www.cipc.co.za', external: true },
    { name: 'SARS', href: 'https://www.sars.gov.za', external: true }
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <footer id="contact" className="bg-neutral-gray-dark dark:bg-neutral-black border-t-4 border-primary-blue transition-colors duration-500">
      <div className="container-max">
        {/* Main Footer Content */}
        <div className="section-padding">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            {/* Brand Section */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-neutral-white">R</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-white drop-shadow-glow dark:drop-shadow-glow-dark">
                    RegulaEase
                  </h3>
                  <p className="text-sm text-neutral-white/70">🇿🇦 {t('header.tagline')}</p>
                </div>
              </div>
              <p className="text-neutral-white/80 transition-colors duration-300">
                {t('header.description')}
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-primary-blue rounded-lg flex items-center justify-center">
                  <span className="text-sm">🇿🇦</span>
                </div>
                <div className="w-8 h-8 bg-accent-green rounded-lg flex items-center justify-center">
                  <span className="text-sm">🚀</span>
                </div>
                <div className="w-8 h-8 bg-accent-blue rounded-lg flex items-center justify-center">
                  <span className="text-sm">🤖</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold text-neutral-white">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-neutral-white/80 hover:text-primary-blue transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold text-neutral-white">Resources</h4>
              <ul className="space-y-2">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(resource.href)}
                      className="text-neutral-white/80 hover:text-primary-blue transition-colors duration-200 text-left"
                    >
                      {resource.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Partners */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold text-neutral-white">SA Business Support</h4>
              <ul className="space-y-2">
                {support.map((partner, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(partner.href)}
                      className="text-neutral-white/80 hover:text-primary-blue transition-colors duration-200 text-left flex items-center space-x-1"
                    >
                      <span>{partner.name}</span>
                      {partner.external && <span className="text-xs">↗</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <motion.div
            className="bg-neutral-white/5 dark:bg-neutral-white/10 rounded-2xl p-8 mb-12 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="text-center space-y-4">
              <h4 className="text-2xl font-bold text-neutral-white">Stay Updated</h4>
              <p className="text-neutral-white/80 max-w-2xl mx-auto">
                Get the latest updates on South African business regulations and growth opportunities.
              </p>
              <div className="flex max-w-md mx-auto space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-neutral-white/10 border border-neutral-white/20 text-neutral-white placeholder-neutral-white/60 focus:outline-none focus:border-primary-blue transition-colors duration-200"
                />
                <button className="px-6 py-3 bg-primary-blue text-neutral-white font-semibold rounded-lg hover:bg-primary-blue-light transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { number: '1000+', label: 'Entrepreneurs Helped' },
              { number: '4', label: 'Languages Supported' },
              { number: '9', label: 'Provinces Covered' },
              { number: '24/7', label: 'AI Support Available' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary-blue mb-2 drop-shadow-glow dark:drop-shadow-glow-dark">
                  {stat.number}
                </div>
                <div className="text-neutral-white/80 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral-white/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              className="text-neutral-white/60 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              © 2025 RegulaEase. Empowering South African entrepreneurs with smart business solutions.
            </motion.p>
            
            <motion.div
              className="flex items-center space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <button className="text-neutral-white/60 hover:text-primary-blue text-sm transition-colors duration-200">
                Privacy Policy
              </button>
              <button className="text-neutral-white/60 hover:text-primary-blue text-sm transition-colors duration-200">
                Terms of Service
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-neutral-white/60 text-sm">Made with</span>
                <span className="text-primary-blue">💙</span>
                <span className="text-neutral-white/60 text-sm">in South Africa</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 