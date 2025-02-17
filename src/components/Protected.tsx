import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem("user"); 
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the protected component
  return <Outlet />;
};

export default ProtectedRoute;