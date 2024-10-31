import { Typography } from "@mui/material";
import React from "react";
import { getCurrentDate } from "../utils/date";

const Today = () => {
  return <Typography variant="h6">Today is {getCurrentDate}. 📅</Typography>;
};

export default Today;
