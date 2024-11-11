import React from "react";
import { mockDB } from "../../mockDB/mockDB";
import { Stack, Typography } from "@mui/material";

const tracker = mockDB?.trackers?.[0];
const Tracker = () => {
  return (
    <Stack className="outlined" width={1}>
      <Typography></Typography>
      <Typography variant="h5" fontSize={{ xs: "1rem", md: "1.2rem" }}>
        {tracker?.title}
      </Typography>
      <Typography
        variant="h5"
        fontWeight="normal"
        fontSize={{ xs: "0.8rem", md: "1rem" }}
      >
        {tracker?.description}
      </Typography>
    </Stack>
  );
};

export default Tracker;
