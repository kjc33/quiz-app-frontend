import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Adjust the path as needed

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Optionally, render a loading indicator while waiting for the check to complete
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    // after the loading (authentication check) has completed
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;