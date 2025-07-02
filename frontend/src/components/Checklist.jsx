import React, { useState } from 'react';
import axios from 'axios';

const Checklist = () => {
  const [businessType, setBusinessType] = useState('retail');
  const [checklist, setChecklist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const businessTypes = [
    { value: 'retail', label: 'Retail Business' },
    { value: 'services', label: 'Service Business' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'technology', label: 'Technology/Software' }
  ];

  const fetchChecklist = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`http://localhost:5000/checklist?type=${businessType}`);
      setChecklist(response.data.checklist);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to fetch checklist');
      } else {
        setError('Unable to connect to the server. Make sure the Flask backend is running.');
      }
      setChecklist([]);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#34495e';
    }
  };

  return (
    <div className="checklist-container">
      <div className="controls">
        <div className="input-group">
          <label htmlFor="businessType">Select Business Type:</label>
          <select
            id="businessType"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="select-input"
          >
            {businessTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={fetchChecklist}
          disabled={loading}
          className="fetch-button"
        >
          {loading ? 'Loading...' : 'Get Checklist'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {checklist.length > 0 && (
        <div className="checklist-results">
          <h3>Compliance Steps for {businessTypes.find(t => t.value === businessType)?.label}</h3>
          <div className="checklist-items">
            {checklist.map((item) => (
              <div key={item.id} className="checklist-item">
                <div className="item-header">
                  <h4>{item.title}</h4>
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(item.priority) }}
                  >
                    {item.priority} priority
                  </span>
                </div>
                
                <p className="item-description">{item.description}</p>
                
                <div className="item-details">
                  <div className="detail-item">
                    <strong>Time Required:</strong> {item.estimated_time}
                  </div>
                  <div className="detail-item">
                    <strong>Cost Estimate:</strong> {item.cost_estimate}
                  </div>
                  
                  {item.required_documents && (
                    <div className="detail-item">
                      <strong>Required Documents:</strong>
                      <ul className="document-list">
                        {item.required_documents.map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && checklist.length === 0 && !error && (
        <div className="empty-state">
          <p>Select a business type and click "Get Checklist" to see compliance requirements.</p>
        </div>
      )}
    </div>
  );
};

export default Checklist; 