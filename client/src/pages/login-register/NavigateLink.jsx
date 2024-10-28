import { Stack, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const NavigateLink = ({ to }) => {
  const text = {
    register: "Don't have an account?",
    login: "Do have an account?",
  };
  return (
    <Stack
      direction="row"
      width={1}
      spacing={1}
      justifyContent={{ xs: "space-between", md: "flex-start" }}
      alignItems="center"
      mt={1}
    >
      <Typography variant="smallText">{text[to]}</Typography>
      <NavLink to={`/${to}`} className="centered">
        <Typography
          variant="smallText"
          className="link"
          textTransform="capitalize"
        >
          {to}
        </Typography>
      </NavLink>
    </Stack>
  );
};

export default NavigateLink;
