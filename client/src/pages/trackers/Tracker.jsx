import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import TrackersTables from "./TrackersTables";
import TrackerEntries from "./TrackerEntries";

// const tracker = mockDB?.trackers?.[0];
const Tracker = ({ tracker }) => {
  // console.log(tracker);
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
        {/* <TrackersTables tracker={tracker} /> */}
        <TrackerEntries tracker={tracker} />
      </Box>
    </Stack>
  );
};

export default Tracker;
