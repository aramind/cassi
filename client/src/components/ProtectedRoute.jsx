import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import UnAuthorizedPage from "../pages/UnAuthorizedPage";

const ProtectedRoute = (allowedRoles) => {
  const location = useLocation();
  const { auth } = useAuth();

  console.log(auth);
  return !auth?.token ? (
    <Navigate to="/signin" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
