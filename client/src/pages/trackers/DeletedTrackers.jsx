import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { DeleteIcon, RestoreIcon } from "../../utils/muiIcons";

const DeletedTrackers = ({ trackers, restoreTrackerHandler }) => {
  return (
    <Stack width={1}>
      {trackers?.map((tracker, index) => {
        return (
          <Fragment key={tracker?._id}>
            <Stack
              width={1}
              justifyContent="space-between"
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
                  conButton
                  aria-label="delete-icon-button"
                  onClick={() => alert(`permanent deleting ${tracker?._id}`)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="restore"
                  onClick={() =>
                    restoreTrackerHandler(tracker?._id, tracker?.title)
                  }
                >
                  <RestoreIcon />
                </IconButton>
              </Box>
            </Stack>
            <Divider />
          </Fragment>
        );
      })}
    </Stack>
  );
};

export default DeletedTrackers;
