import React from "react";
import { Outlet } from "react-router-dom";
import NavDial from "../components/speed-dial/NavDial";

const LayoutWithNavDial = () => {
  return (
    <div>
      <Outlet />
      <NavDial />
    </div>
  );
};

export default LayoutWithNavDial;
