import React from "react";
import { Navigate } from "react-router-dom";

const RedirectToLastPath = () => {
  const lastPath = localStorage.getItem("lastVisitedPath") || "/dashboard";

  console.log("IN REDIRECT COMP");
  return <Navigate to={lastPath}>RedirectToLastPath</Navigate>;
};

export default RedirectToLastPath;
