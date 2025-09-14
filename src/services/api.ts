import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://samparkjyoti.onrender.com/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('API Error:', error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      // Only clear tokens for specific authentication errors
      const errorMessage = error.response?.data?.message?.toLowerCase() || '';
      const isAuthError = errorMessage.includes('token') || 
                         errorMessage.includes('unauthorized') ||
                         errorMessage.includes('invalid') ||
                         errorMessage.includes('expired');
      
      if (isAuthError) {
        console.log('Clearing tokens due to auth error:', errorMessage);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else {
        console.log('401 error but not clearing tokens:', errorMessage);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

