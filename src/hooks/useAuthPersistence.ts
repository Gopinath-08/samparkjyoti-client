import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/store';
import { setUser } from '../store/slices/authSlice';

export const useAuthPersistence = () => {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      console.log('Auth Persistence - Token exists:', !!token);
      console.log('Auth Persistence - User exists:', !!storedUser);
      console.log('Auth Persistence - Token value:', token);
      console.log('Auth Persistence - User value:', storedUser);
      
      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          console.log('Auth Persistence - Restoring user:', userData);
          
          // Immediately restore user to Redux state
          dispatch(setUser(userData));
        } catch (error) {
          console.error('Auth Persistence - Failed to parse user data:', error);
          // Don't clear tokens on parse error, just log it
          console.warn('Keeping tokens despite parse error');
        }
      } else {
        console.log('Auth Persistence - No valid token or user data found');
      }
      
      setIsInitialized(true);
    };

    // Add a small delay to ensure localStorage is available
    const timer = setTimeout(initializeAuth, 100);
    
    return () => clearTimeout(timer);
  }, [dispatch]);

  return { isInitialized };
};
