import { Stack, Typography } from "@mui/material";
import React from "react";
import Tracker from "./Tracker";

const Trackers = ({ trackers }) => {
  if (trackers?.length < 1) {
    return <Typography>No trackers created yet</Typography>;
  }

  return (
    // <Paper sx={{ width: "100%", overflow: "hidden" }}>
    <Stack width={1} spacing={2}>
      {trackers?.map((tracker, index) => (
        <Tracker key={index} tracker={tracker} />
      ))}
    </Stack>
    // </Paper>
  );
};

export default Trackers;
