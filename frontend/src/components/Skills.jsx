import React, { useState } from 'react';
import axios from 'axios';

const Skills = () => {
  const [category, setCategory] = useState('finance');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'finance', label: 'Finance & Accounting' },
    { value: 'digital', label: 'Digital & Marketing' },
    { value: 'management', label: 'Management & Leadership' },
    { value: 'legal', label: 'Legal & Compliance' }
  ];

  const fetchSkills = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:5000/skills?category=${category}`);
      setResources(response.data.resources);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to fetch skills resources');
      } else {
        setError('Unable to connect to the server. Make sure the Flask backend is running.');
      }
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return '#27ae60';
      case 'intermediate': return '#f39c12';
      case 'advanced': return '#e74c3c';
      default: return '#34495e';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'online_course': return '💻';
      case 'workshop': return '🏛️';
      case 'certification': return '🏆';
      case 'webinar': return '📹';
      default: return '📚';
    }
  };

  return (
    <div className="skills-container">
      <div className="controls">
        <div className="input-group">
          <label htmlFor="category">Select Skills Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select-input"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={fetchSkills}
          disabled={loading}
          className="fetch-button"
        >
          {loading ? 'Loading...' : 'Get Resources'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {resources.length > 0 && (
        <div className="skills-results">
          <h3>Learning Resources for {categories.find(c => c.value === category)?.label}</h3>
          <div className="resources-grid">
            {resources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <div className="resource-header">
                  <div className="resource-title">
                    <span className="type-icon">{getTypeIcon(resource.type)}</span>
                    <h4>{resource.title}</h4>
                  </div>
                  <span 
                    className="level-badge"
                    style={{ backgroundColor: getLevelColor(resource.level) }}
                  >
                    {resource.level}
                  </span>
                </div>
                
                <p className="resource-description">{resource.description}</p>
                
                <div className="resource-details">
                  <div className="detail-row">
                    <strong>Provider:</strong> {resource.provider}
                  </div>
                  <div className="detail-row">
                    <strong>Duration:</strong> {resource.duration}
                  </div>
                  <div className="detail-row">
                    <strong>Cost:</strong> {resource.cost}
                  </div>
                  
                  {resource.skills_covered && (
                    <div className="detail-row">
                      <strong>Skills Covered:</strong>
                      <div className="skills-tags">
                        {resource.skills_covered.map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {resource.url && (
                    <div className="resource-link">
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="link-button"
                      >
                        Visit Provider Website →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && resources.length === 0 && !error && (
        <div className="empty-state">
          <p>Select a skills category and click "Get Resources" to see learning opportunities.</p>
        </div>
      )}
    </div>
  );
};

export default Skills; 