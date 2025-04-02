import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";

const DeletedTrackers = ({ trackers, restoreTrackerHandler }) => {
  return (
    <Stack spacing={1} width={1}>
      <Typography textAlign="center">DELETED TRACKERS</Typography>
      {trackers?.map((tracker, index) => {
        return (
          <Stack
            width={1}
            justifyContent="space-between"
            className="outlined"
            direction="row"
            p={0.5}
          >
            <Stack>
              <Typography variant="h6">{tracker?.title}</Typography>
              <Typography color="secondary" ml={2}>
                {tracker?.description}
              </Typography>
            </Stack>
            <Box>
              <IconButton
                aria-label="restore"
                onClick={() => restoreTrackerHandler(tracker?._id)}
              >
                <RestoreOutlinedIcon />
              </IconButton>
            </Box>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default DeletedTrackers;
