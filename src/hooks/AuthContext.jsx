import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile,logout as logoutService } from '../services/Authentication';
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    if (!authChecked) {
      checkAuthStatus();
    }
  }, [authChecked]); // Only run when authChecked changes

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      // const savedUser = localStorage.getItem('user');
      
      if (token) {
        // First, try to use saved user data for immediate display
        try {
          const userData = await getProfile();
          console.log("userData Tu day ne",userData);
          setUser(userData.data);
          setIsAuthenticated(true);
        } catch (parseError) {
          console.error('Error parsing saved user:', parseError);
          // Clear invalid data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setUser(null);
          return;
        }
        
        // Then, verify with server (only once)
        try {
          const response = await getProfile();
          if (response && response.data) {
            // Update with fresh data from server
            setUser(response.data);
            setIsAuthenticated(true);
            // Save fresh data to localStorage
            localStorage.setItem('user', JSON.stringify(response.data));
          } else {
            // Token invalid, clear everything
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (serverError) {
          console.error('Server verification failed:', serverError);
          // Keep local data but don't log continuously
          console.warn('Using cached user data, server verification failed');
        }
      } else {
        // No token or user data
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setAuthChecked(true);
    // Save user data to localStorage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      // Call logout service to invalidate token on server
      await logoutService();
    } catch (error) {
      console.error('Logout service error:', error);
    } finally {
      // Clear local state and storage regardless of server response
      setUser(null);
      setIsAuthenticated(false);
      setAuthChecked(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to home page
      window.location.href = '/';
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    authChecked,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
