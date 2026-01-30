/**
 * API Configuration
 * Uses environment variable for backend server URL
 * 
 * Environment variables in Create React App:
 * - Must start with REACT_APP_ prefix
 * - Are available at build time
 * - Default to production URL if not set
 */
const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL ||
    'https://portfolio-video-editing-server.vercel.app';

export { API_BASE_URL };
export default API_BASE_URL;