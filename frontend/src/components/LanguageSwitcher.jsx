import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    {
      code: 'en',
      name: 'English',
      flag: '🇬🇧',
      nativeName: 'English'
    },
    {
      code: 'af',
      name: 'Afrikaans',
      flag: '🇿🇦',
      nativeName: 'Afrikaans'
    },
    {
      code: 'zu',
      name: 'isiZulu',
      flag: '🇿🇦',
      nativeName: 'isiZulu'
    },
    {
      code: 'xh',
      name: 'isiXhosa',
      flag: '🇿🇦',
      nativeName: 'isiXhosa'
    }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-switcher')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="language-switcher">
      <button
        className="language-button"
        onClick={toggleDropdown}
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <span className="flag">{currentLanguage.flag}</span>
        <span className="language-name">{currentLanguage.nativeName}</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-option ${language.code === i18n.language ? 'active' : ''}`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <span className="flag">{language.flag}</span>
              <div className="language-info">
                <span className="native-name">{language.nativeName}</span>
                <span className="english-name">{language.name}</span>
              </div>
              {language.code === i18n.language && (
                <span className="checkmark">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 