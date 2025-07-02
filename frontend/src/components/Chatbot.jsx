import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Chatbot = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [aiSettings, setAiSettings] = useState({
    tone: 'professional',
    businessType: '',
    experienceLevel: 'intermediate'
  });
  const chatEndRef = useRef(null);

  // Load conversation and settings from localStorage on component mount
  useEffect(() => {
    const savedConversation = localStorage.getItem('regulaease-chat-history');
    const savedSettings = localStorage.getItem('regulaease-ai-settings');
    
    if (savedConversation) {
      try {
        const parsedConversation = JSON.parse(savedConversation).map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setConversation(parsedConversation);
      } catch (error) {
        console.error('Failed to load chat history:', error);
        localStorage.removeItem('regulaease-chat-history');
      }
    }

    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setAiSettings({ ...aiSettings, ...parsedSettings });
      } catch (error) {
        console.error('Failed to load AI settings:', error);
        localStorage.removeItem('regulaease-ai-settings');
      }
    }
  }, []);

  // Save conversation to localStorage whenever it changes
  useEffect(() => {
    if (conversation.length > 0) {
      localStorage.setItem('regulaease-chat-history', JSON.stringify(conversation));
    }
  }, [conversation]);

  // Save AI settings when they change
  useEffect(() => {
    localStorage.setItem('regulaease-ai-settings', JSON.stringify(aiSettings));
  }, [aiSettings]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const sampleQuestions = [
    t('chatbot.samples.registration'),
    t('chatbot.samples.cipc'),
    t('chatbot.samples.tax'),
    t('chatbot.samples.bank'),
    t('chatbot.samples.licenses')
  ];

  const sendMessage = async () => {
    if (!message.trim()) {
      setError(t('chatbot.errors.emptyMessage'));
      return;
    }

    setLoading(true);
    setError('');

    // Add user message to conversation
    const userMessage = {
      id: Date.now() + Math.random(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage('');

    try {
      // Send enhanced request with conversation context and settings
      const response = await axios.post('http://localhost:5000/chatbot', {
        message: currentMessage,
        conversation_history: conversation,
        tone: aiSettings.tone,
        business_type: aiSettings.businessType,
        user_preferences: {
          experience_level: aiSettings.experienceLevel,
          language_preference: localStorage.getItem('i18nextLng') || 'en'
        }
      });

      // Add AI response to conversation
      const aiMessage = {
        id: Date.now() + Math.random(),
        type: 'ai',
        content: response.data.bot_response,
        timestamp: new Date(),
        context: response.data.context
      };

      setConversation(prev => [...prev, aiMessage]);
    } catch (err) {
      let errorMessage = t('chatbot.errors.aiError');
      
      if (err.response && err.response.data) {
        errorMessage = err.response.data.message || errorMessage;
      } else if (err.message) {
        errorMessage = t('chatbot.errors.connectionError');
      }

      // Add error message to conversation
      const errorResponse = {
        id: Date.now() + Math.random(),
        type: 'error',
        content: errorMessage,
        timestamp: new Date()
      };

      setConversation(prev => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSampleQuestion = (question) => {
    setMessage(question);
  };

  const [isClearing, setIsClearing] = useState(false);

  const clearConversation = () => {
    // Show confirmation dialog
    const confirmed = window.confirm(t('chatbot.confirmClear'));
    if (!confirmed) return;

    setIsClearing(true);
    setConversation([]);
    setError('');
    setShowSettings(false); // Close settings panel
    localStorage.removeItem('regulaease-chat-history');
    
    // Visual feedback with state management
    setTimeout(() => {
      setIsClearing(false);
    }, 2000);
  };

  const updateAiSettings = (newSettings) => {
    setAiSettings(prev => ({ ...prev, ...newSettings }));
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getToneIcon = (tone) => {
    const icons = {
      professional: '👔',
      casual: '💬', 
      friendly: '😊'
    };
    return icons[tone] || '💬';
  };

  const getBusinessTypeIcon = (type) => {
    const icons = {
      retail: '🏪',
      services: '🛠️',
      manufacturing: '🏭',
      technology: '💻',
      food: '🍽️',
      hospitality: '🏨'
    };
    return icons[type] || '💼';
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <div className="chat-title">
          <h3>💬 {t('chatbot.title')}</h3>
          <div className="ai-status">
            <span className="ai-indicator">
              {getToneIcon(aiSettings.tone)} {t(`chatbot.tones.${aiSettings.tone}`)}
              {aiSettings.businessType && (
                <span className="business-context">
                  {getBusinessTypeIcon(aiSettings.businessType)} {t(`chatbot.businessTypes.${aiSettings.businessType}`)}
                </span>
              )}
            </span>
          </div>
          {conversation.length > 0 && (
            <span className="message-count">
              {conversation.length} {t('chatbot.messageCount', { count: conversation.length })}
            </span>
          )}
        </div>
        <div className="header-controls">
          <button 
            onClick={() => setShowSettings(!showSettings)} 
            className={`settings-button ${showSettings ? 'active' : ''}`}
            title={t('chatbot.settings')}
          >
            ⚙️
          </button>
          <button 
            onClick={clearConversation} 
            className={`clear-button ${isClearing ? 'success-feedback' : ''}`}
            disabled={conversation.length === 0 || isClearing}
            title={t('chatbot.confirmClear')}
          >
            {isClearing ? (
              <>✅ {t('chatbot.cleared')}</>
            ) : (
              <>🔄 {t('chatbot.clearChat')}</>
            )}
        </button>
        </div>
      </div>

      {/* AI Settings Panel */}
      {showSettings && (
        <div className="ai-settings-panel">
          <div className="settings-section">
            <h4>🎭 {t('chatbot.settings.toneTitle')}</h4>
            <div className="tone-selector">
              {['professional', 'casual', 'friendly'].map(tone => (
                <button
                  key={tone}
                  onClick={() => updateAiSettings({ tone })}
                  className={`tone-option ${aiSettings.tone === tone ? 'active' : ''}`}
                >
                  {getToneIcon(tone)} {t(`chatbot.tones.${tone}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-section">
            <h4>🏢 {t('chatbot.settings.businessTypeTitle')}</h4>
            <select
              value={aiSettings.businessType}
              onChange={(e) => updateAiSettings({ businessType: e.target.value })}
              className="business-type-selector"
            >
              <option value="">{t('chatbot.settings.selectBusinessType')}</option>
              <option value="retail">🏪 {t('chatbot.businessTypes.retail')}</option>
              <option value="services">🛠️ {t('chatbot.businessTypes.services')}</option>
              <option value="manufacturing">🏭 {t('chatbot.businessTypes.manufacturing')}</option>
              <option value="technology">💻 {t('chatbot.businessTypes.technology')}</option>
              <option value="food">🍽️ {t('chatbot.businessTypes.food')}</option>
              <option value="hospitality">🏨 {t('chatbot.businessTypes.hospitality')}</option>
            </select>
          </div>

          <div className="settings-section">
            <h4>📚 {t('chatbot.settings.experienceTitle')}</h4>
            <div className="experience-selector">
              {['beginner', 'intermediate', 'advanced'].map(level => (
                <button
                  key={level}
                  onClick={() => updateAiSettings({ experienceLevel: level })}
                  className={`experience-option ${aiSettings.experienceLevel === level ? 'active' : ''}`}
                >
                  {t(`chatbot.experienceLevels.${level}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-info">
            <p>💡 {t('chatbot.settings.helpText')}</p>
          </div>
        </div>
      )}

      {conversation.length === 0 && (
        <div className="sample-questions">
          <h4>{t('chatbot.tryAsking')}</h4>
          <div className="questions-grid">
            {sampleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSampleQuestion(question)}
                className="sample-question"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="chat-messages">
        {conversation.map((msg, index) => (
          <div key={msg.id || index} className={`message ${msg.type} message-animate`}>
            <div className="message-header">
              <span className="message-sender">
                {msg.type === 'user' ? '👤 ' + t('chatbot.you') : 
                 msg.type === 'ai' ? '🤖 ' + t('chatbot.assistant') : 
                 '⚠️ ' + t('chatbot.error')}
              </span>
              <span className="message-time">
                {formatTimestamp(msg.timestamp)}
              </span>
              {msg.context && (
                <span className="message-context" title={t('chatbot.contextInfo')}>
                  {getToneIcon(msg.context.tone)}
                </span>
              )}
            </div>
            <div className="message-content">
              {msg.content}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="message ai loading">
            <div className="message-header">
              <span className="message-sender">🤖 {t('chatbot.assistant')}</span>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              {t('chatbot.thinking')}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        {error && (
          <div className="error-message small">
            {error}
          </div>
        )}
        
        <div className="input-container">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('chatbot.placeholder')}
            className="message-input"
            rows="3"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !message.trim()}
            className="send-button"
          >
            {loading ? '⏳' : '📤'} {t('chatbot.send')}
          </button>
        </div>
        
        <p className="input-hint">
          {t('chatbot.inputHint')}
        </p>
      </div>
    </div>
  );
};

export default Chatbot; 