import axios from 'axios';
import { appConfig } from './config';

// Create axios instance (career app uses full paths like /api/v1/...)
export const api = axios.create({
  baseURL: `${appConfig.apiUrl}`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage as fallback
    let token: string | null = null;
    try {
      const storedAuth = localStorage.getItem('auth-store');
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        token = authData.state?.access_token;
      }
    } catch (error) {
      console.error('Error getting token from storage:', error);
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access - please login');
      // Clear localStorage and redirect to login
      try {
        localStorage.removeItem('auth-store');
      } catch (error) {
        console.error('Error clearing auth storage:', error);
      }
      window.location.href = '/auth/login';
    } else if (error.response?.status === 429) {
      // Handle rate limiting - add more specific error info
      console.error('Rate limit exceeded - too many requests');
      // Add the error details to help with frontend handling
      error.isRateLimit = true;
      error.rateLimitMessage = 'Rate limit exceeded. Please wait before making more requests.';
    }
    return Promise.reject(error);
  }
);