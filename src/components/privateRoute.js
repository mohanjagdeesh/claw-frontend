import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("username"); // Your auth logic

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
