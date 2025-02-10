import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const isAdminAuthenticated = localStorage.getItem("adminToken");

  return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin/adminlogin" />;
};

export default ProtectedRoute;