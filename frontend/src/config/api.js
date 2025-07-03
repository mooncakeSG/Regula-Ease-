// API Configuration
const getApiBaseUrl = () => {
  // In production, use the same domain as the frontend
  if (process.env.NODE_ENV === 'production' || window.location.hostname !== 'localhost') {
    return window.location.origin;
  }
  
  // In development, use localhost backend
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();

// API endpoints
export const API_ENDPOINTS = {
  checklist: `${API_BASE_URL}/checklist`,
  skills: `${API_BASE_URL}/skills`,
  chatbot: `${API_BASE_URL}/chatbot`,
  health: `${API_BASE_URL}/health`,
  exportPdf: `${API_BASE_URL}/export-pdf`
}; 