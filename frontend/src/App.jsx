import React from 'react';
import Checklist from './components/Checklist';
import Skills from './components/Skills';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Small Business Support Assistant 🇿🇦</h1>
        <p>Your guide to South African business compliance and skills development</p>
      </header>

      <main className="app-main">
        <div className="app-grid">
          {/* Business Checklist Section */}
          <section className="app-section">
            <div className="section-header">
              <h2> Business Compliance Checklist</h2>
              <p>Get step-by-step compliance guides for your business type</p>
            </div>
            <Checklist />
          </section>

          {/* Skills Resources Section */}
          <section className="app-section">
            <div className="section-header">
              <h2> Skills Development Resources</h2>
              <p>Find learning resources to grow your business skills</p>
            </div>
            <Skills />
          </section>

          {/* AI Chatbot Section */}
          <section className="app-section full-width">
            <div className="section-header">
              <h2> AI Business Assistant</h2>
              <p>Ask questions about South African business compliance and get expert advice</p>
            </div>
            <Chatbot />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Small Business Support Assistant | Made for South African SMMEs</p>
      </footer>
    </div>
  );
}

export default App; 