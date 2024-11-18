import React from "react";
import { mockDB } from "../../mockDB/mockDB";
import { Box, Stack, Typography } from "@mui/material";
import TrackersTables from "./TrackersTables";

const tracker = mockDB?.trackers?.[0];
const Tracker = () => {
  return (
    <Stack width={1}>
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
      <Box my={2} width={1}>
        <TrackersTables />
      </Box>
    </Stack>
  );
};

export default Tracker;
