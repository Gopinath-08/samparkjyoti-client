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
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    const token = localStorage.getItem('token');
    if (token) {
      console.log('API Request - Adding token to headers');
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log('API Request - No token found');
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log('API Error:', error.response?.status, error.response?.data);
    console.log('API Error URL:', error.config?.url);
    console.log('API Error Method:', error.config?.method);
    
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

