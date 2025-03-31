import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import Tracker from "./Tracker";

const Trackers = ({ trackers }) => {
  if (trackers?.length < 1) {
    return <Typography>No trackers created yet</Typography>;
  }

  return (
    // <Paper sx={{ width: "100%", overflow: "hidden" }}>
    <Box width={1} m={1} p={1}>
      {trackers?.map((tracker, index) => (
        <Paper
          sx={{ width: "100%", overflow: "hidden", py: "1rem", mb: "0.5rem" }}
        >
          <Tracker key={index} tracker={tracker} />
        </Paper>
      ))}
    </Box>
    // </Paper>
  );
};

export default Trackers;
