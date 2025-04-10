import React from "react";
import { Outlet } from "react-router-dom";
import RouteTracker from "../components/RouteTracker";
import NavDial from "../components/speed-dial/NavDial";
const MainLayout = () => {
  return (
    <div>
      <RouteTracker />
      <Outlet />
      <NavDial />
    </div>
  );
};

export default MainLayout;
