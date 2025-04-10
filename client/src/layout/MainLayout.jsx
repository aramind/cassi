import React from "react";
import { Outlet } from "react-router-dom";
import RouteTracker from "../components/RouteTracker";

const MainLayout = () => {
  return (
    <div>
      <RouteTracker />
      <Outlet />
    </div>
  );
};

export default MainLayout;
