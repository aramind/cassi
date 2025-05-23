import { Typography } from "@mui/material";
import React from "react";
import { getCurrentDate } from "../utils/date";
import useIsDesktop from "../hooks/useIsDesktop";

const Today = () => {
  const isDesktop = useIsDesktop();
  const variant = isDesktop ? "h5" : "h6";
  return (
    <Typography variant={variant}>Today is {getCurrentDate}. 📅</Typography>
  );
};

export default Today;
