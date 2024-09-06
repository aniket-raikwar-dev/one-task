import React from "react";
import { Navigate, Outlet } from "react-router-dom";

console.log("is running: ");

const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  console.log("isAuthenticated", isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
