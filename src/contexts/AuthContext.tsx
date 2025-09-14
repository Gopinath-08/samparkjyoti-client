import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getCurrentUser, login, register, logout, setUser } from '../store/slices/authSlice';
import { useAuthPersistence } from '../hooks/useAuthPersistence';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { name: string; email: string; password: string; phone: string; isAgent?: boolean }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  const { isInitialized } = useAuthPersistence();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setHasToken(!!token);
  }, []);

  useEffect(() => {
    if (isInitialized && hasToken) {
      // Try to validate token with backend (non-blocking)
      dispatch(getCurrentUser()).catch((error) => {
        console.warn('Token validation failed, but keeping session:', error);
        // Keep user logged in even if validation fails
      });
    }
  }, [isInitialized, hasToken, dispatch]);

  const loginUser = async (credentials: { email: string; password: string }) => {
    await dispatch(login(credentials)).unwrap();
  };

  const registerUser = async (userData: { name: string; email: string; password: string; phone: string; isAgent?: boolean }) => {
    await dispatch(register(userData)).unwrap();
  };

  const logoutUser = async () => {
    await dispatch(logout()).unwrap();
  };

  // Check if we have a valid token and user data
  const hasValidToken = !!localStorage.getItem('token');
  const hasValidUser = !!localStorage.getItem('user');
  const shouldBeAuthenticated = isAuthenticated || (hasValidToken && hasValidUser);

  console.log('AuthContext - State check:', {
    isAuthenticated,
    hasValidToken,
    hasValidUser,
    shouldBeAuthenticated,
    user,
    isInitialized
  });

  const value = {
    user,
    isAuthenticated: shouldBeAuthenticated,
    isLoading: isLoading || !isInitialized,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
  };

  console.log('AuthContext - Final state:', {
    user,
    isAuthenticated: value.isAuthenticated,
    isLoading: value.isLoading,
    hasToken,
    isInitialized
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
