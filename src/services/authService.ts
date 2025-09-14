import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  location?: string;
  roles?: string[];
  primaryRole?: string;
  languages?: string[];
  preferredLanguage?: string;
  labourProfile?: {
    age: number;
    workRole: string;
    speciality: string;
    minimumWage: number;
  };
  farmerProfile?: {
    farmingType: string;
    landSize?: number;
  };
  employerProfile?: {
    businessDetails: {
      businessName: string;
      businessType: string;
    };
  };
  isAgent?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location?: string;
  roles?: string[];
  primaryRole?: string;
  languages?: string[];
  preferredLanguage?: string;
  labourProfile?: {
    age: number;
    workRole: string;
    speciality: string;
    minimumWage: number;
  };
  farmerProfile?: {
    farmingType: string;
    landSize?: number;
  };
  employerProfile?: {
    businessDetails: {
      businessName: string;
      businessType: string;
    };
  };
  isAgent: boolean;
  profileComplete: boolean;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    console.log('AuthService - Login attempt with:', credentials);
    const response = await api.post('/auth/login', credentials);
    console.log('AuthService - Login response:', response.data);
    
    // Backend returns: { status: "success", data: { user: {...}, token: "..." } }
    const responseData = response.data.data || response.data;
    
    if (responseData.token) {
      console.log('AuthService - Storing token:', responseData.token);
      console.log('AuthService - Storing user:', responseData.user);
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('user', JSON.stringify(responseData.user));
      console.log('AuthService - Token stored:', !!localStorage.getItem('token'));
      console.log('AuthService - User stored:', !!localStorage.getItem('user'));
    } else {
      console.error('AuthService - No token in response:', response.data);
    }
    return response;
  },

  async register(userData: RegisterData) {
    console.log('AuthService - Register attempt with:', userData);
    const response = await api.post('/auth/register', userData);
    console.log('AuthService - Register response:', response.data);
    
    // Backend returns: { status: "success", data: { user: {...}, token: "..." } }
    const responseData = response.data.data || response.data;
    
    if (responseData.token) {
      console.log('AuthService - Storing token:', responseData.token);
      console.log('AuthService - Storing user:', responseData.user);
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('user', JSON.stringify(responseData.user));
      console.log('AuthService - Token stored:', !!localStorage.getItem('token'));
      console.log('AuthService - User stored:', !!localStorage.getItem('user'));
    } else {
      console.error('AuthService - No token in response:', response.data);
    }
    return response;
  },

  async logout() {
    try {
      // Call backend logout endpoint first
      await api.post('/auth/logout');
    } catch (error) {
      // Even if backend call fails, we should still clear local storage
      console.warn('Backend logout failed, but clearing local storage:', error);
    } finally {
      // Always clear local storage regardless of backend response
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('Local storage cleared on logout');
    }
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response;
  },

  async updateProfile(userData: Partial<User>) {
    const response = await api.put('/auth/profile', userData);
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },
};

