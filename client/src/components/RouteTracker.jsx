import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    const isAuthPage =
      path.startsWith("/login") || path.startsWith("/register");

    if (!isAuthPage) {
      localStorage.setItem("lastVisitedPath", path);
    }
  }, [location]);
  return null;
};

export default RouteTracker;
