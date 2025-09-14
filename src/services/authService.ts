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
    
    if (response.data.token) {
      console.log('AuthService - Storing token:', response.data.token);
      console.log('AuthService - Storing user:', response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
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
    
    if (response.data.token) {
      console.log('AuthService - Storing token:', response.data.token);
      console.log('AuthService - Storing user:', response.data.user);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log('AuthService - Token stored:', !!localStorage.getItem('token'));
      console.log('AuthService - User stored:', !!localStorage.getItem('user'));
    } else {
      console.error('AuthService - No token in response:', response.data);
    }
    return response;
  },

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return api.post('/auth/logout');
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

