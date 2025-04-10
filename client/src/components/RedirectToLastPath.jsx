import React from "react";
import { Navigate } from "react-router-dom";

const RedirectToLastPath = () => {
  const lastPath = localStorage.getItem("lastVisited") || "/dashboard";

  return <Navigate to={lastPath}>RedirectToLastPath</Navigate>;
};

export default RedirectToLastPath;
