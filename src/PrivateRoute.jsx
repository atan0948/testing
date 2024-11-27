import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ element, isAuthenticated, ...rest }) {
  // If user is authenticated, render the element; otherwise, redirect to login
  return isAuthenticated ? element : <Navigate to='/login' />;
}

export default PrivateRoute;
