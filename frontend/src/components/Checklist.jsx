import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS } from '../config/api';

const Checklist = () => {
  const { t } = useTranslation();
  const [businessType, setBusinessType] = useState('retail');
  const [checklist, setChecklist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [completedItems, setCompletedItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [filters, setFilters] = useState({
    priority: '',
    category: '',
    status: '',
    searchTerm: ''
  });

  const businessTypes = [
    { value: 'retail', label: 'Retail Business' },
    { value: 'services', label: 'Service Business' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'technology', label: 'Technology/Software' }
  ];

  // Load completed items from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem(`regulaease-checklist-${businessType}`);
    if (saved) {
      try {
        setCompletedItems(new Set(JSON.parse(saved)));
      } catch (error) {
        console.error('Failed to load completed items:', error);
      }
    }
  }, [businessType]);

  // Save completed items to localStorage when they change
  useEffect(() => {
    if (completedItems.size > 0) {
      localStorage.setItem(
        `regulaease-checklist-${businessType}`, 
        JSON.stringify([...completedItems])
      );
    }
  }, [completedItems, businessType]);

  // Toggle item completion
  const toggleItemCompletion = (itemId) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Calculate progress statistics
  const getProgressStats = () => {
    const total = filteredChecklist.length;
    const completed = filteredChecklist.filter(item => completedItems.has(item.id)).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percentage };
  };

  // Filter checklist based on search and priority
  const filteredChecklist = checklist.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  // Export checklist as CSV
  const exportToCSV = () => {
    const headers = ['Task', 'Priority', 'Status', 'Time Required', 'Cost Estimate', 'Required Documents'];
    const csvData = filteredChecklist.map(item => [
      item.title,
      item.priority,
      completedItems.has(item.id) ? 'Completed' : 'Pending',
      item.estimated_time,
      item.cost_estimate,
      item.required_documents ? item.required_documents.join('; ') : ''
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${businessType}-compliance-checklist.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Clear all completed items
  const clearProgress = () => {
    setCompletedItems(new Set());
    localStorage.removeItem(`regulaease-checklist-${businessType}`);
  };

  const fetchChecklist = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`${API_ENDPOINTS.checklist}?type=${businessType}`);
      setChecklist(response.data.checklist);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to fetch checklist');
      } else {
        setError('Unable to load checklist. Please refresh or try again later.');
      }
      setChecklist([]);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#3498db';
      case 'low': return '#27ae60';
      default: return '#34495e';
    }
  };

  const progressStats = getProgressStats();

  // Get unique values for filters
  const getUniqueValues = (key) => {
    const values = checklist.map(item => item[key]).filter(Boolean);
    return [...new Set(values)].sort();
  };

  return (
    <motion.div 
      className="checklist-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
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

      {/* Advanced Filters and Search */}
      {checklist.length > 0 && (
        <div className="advanced-controls">
          <div className="search-filter-row">
            <div className="input-group">
              <label htmlFor="searchTerm">🔍 Search Tasks:</label>
              <input
                id="searchTerm"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or description..."
                className="search-input"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="priorityFilter">📊 Filter by Priority:</label>
              <select
                id="priorityFilter"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="select-input"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>

          <div className="action-buttons">
            <button 
              onClick={exportToCSV}
              disabled={filteredChecklist.length === 0}
              className="export-button"
              title="Export checklist to CSV"
            >
              📥 Export CSV
            </button>
            
            <button 
              onClick={clearProgress}
              disabled={completedItems.size === 0}
              className="clear-button"
              title="Clear all progress"
            >
              🗑️ Clear Progress
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md flex justify-between items-start">
          <p className="text-sm flex-1">{error}</p>
          <button 
            onClick={() => setError('')}
            className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {checklist.length > 0 && (
        <div className="checklist-results">
          <div className="results-header">
            <h3>Compliance Steps for {businessTypes.find(t => t.value === businessType)?.label}</h3>
            
            {/* Progress Statistics */}
            <div className="progress-stats">
              <div className="progress-bar-container">
                <div className="progress-info">
                  <span className="progress-text">
                    {progressStats.completed} of {progressStats.total} completed ({progressStats.percentage}%)
                  </span>
                  <span className="progress-percentage">{progressStats.percentage}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progressStats.percentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="stats-badges">
                <span className="stat-badge completed">
                  ✅ {progressStats.completed} Done
                </span>
                <span className="stat-badge remaining">
                  ⏳ {progressStats.total - progressStats.completed} Left
                </span>
              </div>
            </div>
          </div>

          {/* Filter Results Info */}
          {(searchTerm || priorityFilter !== 'all') && (
            <div className="filter-info">
              <span>
                {filteredChecklist.length === checklist.length 
                  ? `Showing all ${checklist.length} tasks`
                  : `Showing ${filteredChecklist.length} of ${checklist.length} tasks`
                }
                {searchTerm && ` matching "${searchTerm}"`}
                {priorityFilter !== 'all' && ` with ${priorityFilter} priority`}
              </span>
              {(searchTerm || priorityFilter !== 'all') && (
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setPriorityFilter('all');
                  }}
                  className="clear-filters-btn"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          <div className="checklist-items">
            {filteredChecklist.map((item) => (
              <div key={item.id} className={`checklist-item ${completedItems.has(item.id) ? 'completed' : ''}`}>
                <div className="item-header">
                  <div className="item-title-section">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={completedItems.has(item.id)}
                        onChange={() => toggleItemCompletion(item.id)}
                        className="item-checkbox"
                      />
                      <span className="checkmark"></span>
                    </label>
                    <h4 className={completedItems.has(item.id) ? 'completed-title' : ''}>{item.title}</h4>
                  </div>
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

          {filteredChecklist.length === 0 && (
            <div className="no-results">
              <p>No tasks match your current filters.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setPriorityFilter('all');
                }}
                className="clear-filters-btn"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}

      {!loading && checklist.length === 0 && !error && (
        <div className="empty-state">
          <p>Select a business type and click "Get Checklist" to see compliance requirements.</p>
        </div>
      )}
    </motion.div>
  );
};

export default Checklist; 