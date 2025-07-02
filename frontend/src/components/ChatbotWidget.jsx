import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chatbot from './Chatbot';
import './ChatbotWidget.css';

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  // Close chatbot
  const closeChatbot = () => {
    setIsOpen(false);
  };

  // Add keyboard support for accessibility
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeChatbot();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Add subtle notification animation for new messages
  useEffect(() => {
    if (!isOpen && !hasNewMessage) {
      const timer = setTimeout(() => {
        setHasNewMessage(true);
      }, 5000); // Show pulse animation after 5 seconds of inactivity

      return () => clearTimeout(timer);
    }
  }, [isOpen, hasNewMessage]);

  return (
    <>
      {/* Overlay for mobile to close chatbot when clicking outside */}
      {isOpen && <div className="chatbot-overlay" onClick={closeChatbot}></div>}
      
      {/* Main Chatbot Widget Container */}
      <div className="chatbot-widget">
        {/* Toggle Button */}
        <motion.button
          className={`chatbot-toggle ${isOpen ? 'active' : ''} ${hasNewMessage ? 'pulse' : ''}`}
          onClick={toggleChatbot}
          aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
          aria-expanded={isOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="toggle-icon">
            {isOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 9h-2v2h2V9z" fill="currentColor"/>
                <path d="M13 13h-2v4h2v-4z" fill="currentColor"/>
              </svg>
            )}
          </div>
          
          {/* Status indicator */}
          {!isOpen && (
            <div className="status-indicator">
              <span className="status-dot"></span>
            </div>
          )}
        </motion.button>

        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="chatbot-window"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                duration: 0.3
              }}
            >
              {/* Chat Header */}
              <div className="chatbot-header">
                <div className="header-info">
                  <div className="bot-avatar">🤖</div>
                  <div className="header-text">
                    <h3>AI Business Assistant</h3>
                    <span className="status">Online • Ready to help</span>
                  </div>
                </div>
                <button
                  className="close-button"
                  onClick={closeChatbot}
                  aria-label="Close chat"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Chat Content */}
              <div className="chatbot-content">
                <Chatbot />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ChatbotWidget; 