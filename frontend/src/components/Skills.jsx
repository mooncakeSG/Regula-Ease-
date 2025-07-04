import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { API_ENDPOINTS } from '../config/api';

const Skills = () => {
  const { t } = useTranslation();
  const [category, setCategory] = useState('finance');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookmarkedResources, setBookmarkedResources] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  const categories = [
    { value: 'finance', label: 'Finance & Accounting' },
    { value: 'digital', label: 'Digital & Marketing' },
    { value: 'management', label: 'Management & Leadership' },
    { value: 'legal', label: 'Legal & Compliance' }
  ];

  // Load bookmarked resources from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('regulaease-bookmarked-resources');
    if (saved) {
      try {
        setBookmarkedResources(new Set(JSON.parse(saved)));
      } catch (error) {
        console.error('Failed to load bookmarked resources:', error);
      }
    }
  }, []);

  // Save bookmarked resources to localStorage
  useEffect(() => {
    if (bookmarkedResources.size > 0) {
      localStorage.setItem('regulaease-bookmarked-resources', JSON.stringify([...bookmarkedResources]));
    }
  }, [bookmarkedResources]);

  // Toggle bookmark for a resource
  const toggleBookmark = (resourceId) => {
    setBookmarkedResources(prev => {
      const newSet = new Set(prev);
      if (newSet.has(resourceId)) {
        newSet.delete(resourceId);
      } else {
        newSet.add(resourceId);
      }
      return newSet;
    });
  };

  // Filter resources based on search and filters
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || resource.level === levelFilter;
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    const matchesBookmark = !showBookmarksOnly || bookmarkedResources.has(resource.id);
    
    return matchesSearch && matchesLevel && matchesType && matchesBookmark;
  });

  // Export resources as CSV
  const exportToCSV = () => {
    const headers = ['Title', 'Provider', 'Level', 'Type', 'Duration', 'Cost', 'Skills Covered', 'URL', 'Bookmarked'];
    const csvData = filteredResources.map(resource => [
      resource.title,
      resource.provider,
      resource.level,
      resource.type,
      resource.duration,
      resource.cost,
      resource.skills_covered ? resource.skills_covered.join('; ') : '',
      resource.url || '',
      bookmarkedResources.has(resource.id) ? 'Yes' : 'No'
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${category}-skills-resources.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Export skills progress report as PDF
  const exportToPDF = async () => {
    try {
      setLoading(true);
      
      // Prepare skills progress data for PDF generation
      const categories = ['Finance', 'Digital', 'Management', 'Legal'];
      const categoryBookmarks = categories.map(cat => 
        resources.filter(resource => 
          resource.title.toLowerCase().includes(cat.toLowerCase()) && 
          bookmarkedResources.has(resource.id)
        ).length
      );
      
      const progressData = {
        skills: {
          totalResources: resources.length,
          bookmarked: bookmarkedResources.size,
          category: category,
          categories,
          categoryBookmarks,
          filteredCount: filteredResources.length
        }
      };
      
      const response = await axios.post(API_ENDPOINTS.exportPdf, {
        type: 'skills',
        progressData,
        businessType: category,
        language: i18n.language || 'en'  // Include current language
      }, {
        responseType: 'blob'
      });
      
      // Create download link
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${category}-skills-progress-report.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error exporting PDF:', error);
      setError('Failed to generate PDF report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Clear all bookmarks
  const clearBookmarks = () => {
    setBookmarkedResources(new Set());
    localStorage.removeItem('regulaease-bookmarked-resources');
  };

  // Get unique resource types for filter
  const getResourceTypes = () => {
    const types = new Set(resources.map(resource => resource.type));
    return Array.from(types).map(type => ({
      value: type,
      label: type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
    }));
  };

  const fetchSkills = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`${API_ENDPOINTS.skills}?category=${category}`);
      setResources(response.data.resources);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to fetch skills resources');
      } else {
        setError('Unable to load skills resources. Please refresh or try again later.');
      }
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return '#27ae60';
      case 'intermediate': return '#3498db';
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
    <motion.div 
      className="skills-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
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

      {/* Advanced Filters and Search */}
      {resources.length > 0 && (
        <div className="advanced-controls">
          <div className="search-filter-row">
            <div className="input-group">
              <label htmlFor="searchTerm">🔍 Search Resources:</label>
              <input
                id="searchTerm"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, description, or provider..."
                className="search-input"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="levelFilter">📊 Level:</label>
              <select
                id="levelFilter"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="select-input"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="typeFilter">🎯 Type:</label>
              <select
                id="typeFilter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="select-input"
              >
                <option value="all">All Types</option>
                {getResourceTypes().map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="action-buttons">
            <button 
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`bookmark-filter-btn ${showBookmarksOnly ? 'active' : ''}`}
              title={showBookmarksOnly ? 'Show all resources' : 'Show bookmarked only'}
            >
              {showBookmarksOnly ? '⭐ Showing Bookmarks' : '⭐ Show Bookmarks'}
              {bookmarkedResources.size > 0 && (
                <span className="bookmark-count">({bookmarkedResources.size})</span>
              )}
            </button>

            <button 
              onClick={exportToCSV}
              disabled={filteredResources.length === 0}
              className="export-button"
              title="Export resources to CSV"
            >
              📥 Export CSV
            </button>
            
            <button 
              onClick={exportToPDF}
              disabled={resources.length === 0 || loading}
              className="export-button pdf-button"
              title="Export skills progress report with charts"
            >
              📊 Export PDF Report
            </button>
            
            <button 
              onClick={clearBookmarks}
              disabled={bookmarkedResources.size === 0}
              className="clear-button"
              title="Clear all bookmarks"
            >
              🗑️ Clear Bookmarks
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

      {resources.length > 0 && (
        <div className="skills-results">
          <div className="results-header">
            <h3>Learning Resources for {categories.find(c => c.value === category)?.label}</h3>
            
            {/* Bookmark Statistics */}
            {bookmarkedResources.size > 0 && (
              <div className="bookmark-stats">
                <span className="stat-badge bookmarked">
                  ⭐ {bookmarkedResources.size} Bookmarked
                </span>
              </div>
            )}
          </div>

          {/* Filter Results Info */}
          {(searchTerm || levelFilter !== 'all' || typeFilter !== 'all' || showBookmarksOnly) && (
            <div className="filter-info">
              <span>
                {filteredResources.length === resources.length 
                  ? `Showing all ${resources.length} resources`
                  : `Showing ${filteredResources.length} of ${resources.length} resources`
                }
                {searchTerm && ` matching "${searchTerm}"`}
                {levelFilter !== 'all' && ` at ${levelFilter} level`}
                {typeFilter !== 'all' && ` of type ${typeFilter.replace('_', ' ')}`}
                {showBookmarksOnly && ` (bookmarked only)`}
              </span>
              {(searchTerm || levelFilter !== 'all' || typeFilter !== 'all' || showBookmarksOnly) && (
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setLevelFilter('all');
                    setTypeFilter('all');
                    setShowBookmarksOnly(false);
                  }}
                  className="clear-filters-btn"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}

          <div className="resources-grid">
            {filteredResources.map((resource) => (
              <div key={resource.id} className={`resource-card ${bookmarkedResources.has(resource.id) ? 'bookmarked' : ''}`}>
                <div className="resource-header">
                  <div className="resource-title">
                    <span className="type-icon">{getTypeIcon(resource.type)}</span>
                    <h4>{resource.title}</h4>
                  </div>
                  <div className="resource-badges">
                    <span 
                      className="level-badge"
                      style={{ backgroundColor: getLevelColor(resource.level) }}
                    >
                      {resource.level}
                    </span>
                    <button
                      onClick={() => toggleBookmark(resource.id)}
                      className={`bookmark-btn ${bookmarkedResources.has(resource.id) ? 'bookmarked' : ''}`}
                      title={bookmarkedResources.has(resource.id) ? 'Remove from bookmarks' : 'Add to bookmarks'}
                    >
                      {bookmarkedResources.has(resource.id) ? '⭐' : '☆'}
                    </button>
                  </div>
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

          {filteredResources.length === 0 && (
            <div className="no-results">
              <p>No resources match your current filters.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setLevelFilter('all');
                  setTypeFilter('all');
                  setShowBookmarksOnly(false);
                }}
                className="clear-filters-btn"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {!loading && resources.length === 0 && !error && (
        <div className="empty-state">
          <p>Select a skills category and click "Get Resources" to see learning opportunities.</p>
        </div>
      )}
    </motion.div>
  );
};

export default Skills; 