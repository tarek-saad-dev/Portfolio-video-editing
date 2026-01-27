/**
 * API Service
 * Centralized API service with examples using fetch and axios
 * All requests use the production API base URL
 */

import API_BASE_URL from '../config/api';
import axios from 'axios';

// ============================================
// FETCH EXAMPLES
// ============================================

/**
 * Generic fetch wrapper for GET requests
 * @param {string} endpoint - API endpoint (e.g., '/api/projects')
 * @returns {Promise} - Response data
 */
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Generic fetch wrapper for POST requests
 * @param {string} endpoint - API endpoint
 * @param {object} data - Data to send
 * @returns {Promise} - Response data
 */
export const postData = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
};

// ============================================
// AXIOS EXAMPLES
// ============================================

// Create axios instance with base URL
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios GET request example
 * @param {string} endpoint - API endpoint
 * @returns {Promise} - Response data
 */
export const axiosGet = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Axios POST request example
 * @param {string} endpoint - API endpoint
 * @param {object} data - Data to send
 * @returns {Promise} - Response data
 */
export const axiosPost = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Error posting to ${endpoint}:`, error);
    throw error;
  }
};

// ============================================
// SPECIFIC API ENDPOINTS
// ============================================

export const api = {
  // Fetch projects
  getProjects: () => fetchData('/api/projects'),
  
  // Fetch skills
  getSkills: () => fetchData('/api/skills'),
  
  // Fetch tools
  getTools: () => fetchData('/api/tools'),
  
  // Fetch experiences
  getExperiences: () => fetchData('/api/experiences'),
  
  // Fetch certificates
  getCertificates: () => fetchData('/api/certificates'),
};

// Export the base URL for direct use if needed
export { API_BASE_URL };

