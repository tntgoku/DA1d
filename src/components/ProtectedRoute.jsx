import React, { useEffect, useState } from 'react';
import{useAuth} from '../hooks/AuthContext';
import { Navigate } from 'react-router-dom';
import { getProfile } from '../services/Authentication';
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, loading, user, logout } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsValidToken(false);
        setIsVerifying(false);
        return;
      }

      try {
        // Verify token với server
        const response = await getProfile();
        if (response && response.data) {
          setIsValidToken(true);
          
          // Kiểm tra role nếu cần
          if (requiredRole && response.data.role !== requiredRole) {
            setIsValidToken(false);
          }
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        setIsValidToken(false);
        // Clear invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        logout();
      } finally {
        setIsVerifying(false);
      }
    };

    if (isAuthenticated) {
      verifyToken();
    } else {
      setIsVerifying(false);
    }
  }, [isAuthenticated, requiredRole, logout]);

  if (loading || isVerifying) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Verifying authentication...</span>
        </div>
      </div>
    );
  }

  // if (!isAuthenticated || !isValidToken) {
  //   return <Navigate to="/auth" replace />;
  // }

  return children;
};

export default ProtectedRoute;
