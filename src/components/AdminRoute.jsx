import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
const AdminRoute = ({ children }) => {
  return (
    // <ProtectedRoute requiredRole="ADMIN">
          <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
};

export default AdminRoute;
