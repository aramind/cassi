import { Link, Stack, Typography } from "@mui/material";
import React from "react";

const RMSolutions = () => {
  return (
    <Stack justifyContent="center" width={1} mb={1}>
      <Typography
        textAlign="center"
        variant="body2"
        sx={{ fontStyle: "italic", letterSpacing: "1px" }}
      >
        Powered by{" "}
        <Link
          href="https://www.linkedin.com/in/robin-mon-miranda/"
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none", fontWeight: "bold" }}
        >
          RMSolutions&trade;
        </Link>
        &nbsp;&copy;{new Date().getFullYear()}
      </Typography>
    </Stack>
  );
};

export default RMSolutions;
