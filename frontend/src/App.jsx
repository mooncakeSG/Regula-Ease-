import React from 'react';
import { useTranslation } from 'react-i18next';
import Checklist from './components/Checklist';
import Skills from './components/Skills';
import ChatbotWidget from './components/ChatbotWidget';
import ThemeToggle from './components/ThemeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <div className="header-main">
              <h1>{t('header.title')} 🇿🇦</h1>
              <p>{t('header.description')}</p>
            </div>
            <div className="header-controls">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="app-main">
          <div className="app-grid">
            {/* Business Checklist Section */}
            <section className="app-section">
              <div className="section-header">
                <h2>📋 {t('checklist.title')}</h2>
                <p>{t('checklist.description')}</p>
              </div>
              <Checklist />
            </section>

            {/* Skills Resources Section */}
            <section className="app-section">
              <div className="section-header">
                <h2>📚 {t('skills.title')}</h2>
                <p>{t('skills.description')}</p>
              </div>
              <Skills />
            </section>

            {/* AI Assistant Call-to-Action */}
            <section className="app-section full-width ai-cta">
              <div className="section-header">
                <h2>🤖 {t('chatbot.title')}</h2>
                <p>{t('chatbot.description')}</p>
              </div>
              <div className="cta-content">
                <div className="cta-features">
                  <div className="feature-item">
                    <span className="feature-icon">💡</span>
                    <span>{t('cta.features.guidance')}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">📋</span>
                    <span>{t('cta.features.compliance')}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">💰</span>
                    <span>{t('cta.features.support')}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🏛️</span>
                    <span>{t('cta.features.growth')}</span>
                  </div>
                </div>
                <div className="cta-action">
                  <p className="cta-text">
                    <strong>{t('cta.action')}</strong>
                  </p>
                  <div className="cta-arrow">
                    <span>💬</span>
                    <span className="arrow">↘️</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer className="app-footer">
          <p>{t('footer.copyright')}</p>
        </footer>
      </div>
      
      {/* Floating Chat Widget */}
      <ChatbotWidget />
    </>
  );
}

export default App; 