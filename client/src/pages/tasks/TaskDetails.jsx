import { Stack, Typography } from "@mui/material";
import React from "react";

const TaskDetails = ({ task }) => {
  const { comments, remarks, _id, ...taskSimpleDetails } = task;

  return (
    <Stack spacing={1}>
      {taskSimpleDetails &&
        Object?.entries(taskSimpleDetails).map(([key, value]) => (
          <Typography key={key}>
            <strong>{key.toUpperCase()}</strong>: {String(value)}
          </Typography>
        ))}
    </Stack>
  );
};

export default TaskDetails;
