import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  // Load conversation from localStorage on component mount
  useEffect(() => {
    const savedConversation = localStorage.getItem('regulaease-chat-history');
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
  }, []);

  // Save conversation to localStorage whenever it changes
  useEffect(() => {
    if (conversation.length > 0) {
      localStorage.setItem('regulaease-chat-history', JSON.stringify(conversation));
    }
  }, [conversation]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const sampleQuestions = [
    "What are the basic requirements to start a retail business in South Africa?",
    "How do I register my business with CIPC?",
    "What tax obligations do small businesses have?",
    "Do I need a business bank account?",
    "What licenses do I need for a restaurant?"
  ];

  const sendMessage = async () => {
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }

    setLoading(true);
    setError('');

    // Add user message to conversation
    const userMessage = {
      id: Date.now() + Math.random(), // Unique ID for animations
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/chatbot', {
        message: currentMessage
      });

      // Add AI response to conversation
      const aiMessage = {
        id: Date.now() + Math.random(), // Unique ID for animations
        type: 'ai',
        content: response.data.bot_response,
        timestamp: new Date()
      };

      setConversation(prev => [...prev, aiMessage]);
    } catch (err) {
      let errorMessage = 'Failed to get response from AI assistant';
      
      if (err.response && err.response.data) {
        errorMessage = err.response.data.message || errorMessage;
      } else if (err.message) {
        errorMessage = 'Unable to connect to the server. Make sure the Flask backend is running.';
      }

      // Add error message to conversation
      const errorResponse = {
        id: Date.now() + Math.random(), // Unique ID for animations
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

  const clearConversation = () => {
    setConversation([]);
    setError('');
    localStorage.removeItem('regulaease-chat-history');
    
    // Add visual feedback
    const button = document.querySelector('.clear-button');
    if (button) {
      button.textContent = '✅ Cleared!';
      setTimeout(() => {
        button.textContent = 'Clear Chat';
      }, 2000);
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <div className="chat-title">
          <h3>💬 Ask Your Business Questions</h3>
          {conversation.length > 0 && (
            <span className="message-count">
              {conversation.length} message{conversation.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <button onClick={clearConversation} className="clear-button" disabled={conversation.length === 0}>
          Clear Chat
        </button>
      </div>

      {conversation.length === 0 && (
        <div className="sample-questions">
          <h4>Try asking:</h4>
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
                {msg.type === 'user' ? '👤 You' : msg.type === 'ai' ? '🤖 AI Assistant' : '⚠️ Error'}
              </span>
              <span className="message-time">
                {formatTimestamp(msg.timestamp)}
              </span>
            </div>
            <div className="message-content">
              {msg.content}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="message ai loading">
            <div className="message-header">
              <span className="message-sender">🤖 AI Assistant</span>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              Thinking...
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
            placeholder="Ask about business registration, compliance, taxes, licenses..."
            className="message-input"
            rows="3"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !message.trim()}
            className="send-button"
          >
            {loading ? '⏳' : '📤'} Send
          </button>
        </div>
        
        <p className="input-hint">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default Chatbot; 