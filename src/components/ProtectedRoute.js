import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, isAdminRoute }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Optionally, render a loading indicator while waiting for the check to complete
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    // after the loading (authentication check) has completed
    return isAdminRoute ? <Navigate to="/admin/login" /> : <Navigate to="/exam" />;
  }

  return children;
};

export default ProtectedRoute;
