import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

import TrackerAccordion from "./TrackerAccordion";
import { updateAppState } from "../../utils/localStorageAppState";

const ExpandUnExpandBtn = ({ label, onClick }) => (
  <Button
    onClick={onClick}
    variant="outlined"
    size="small"
    sx={{ width: "120px" }}
  >
    {label}
  </Button>
);
const TrackersContainer = ({
  trackers,
  handleDeletingTrackerInfo,
  handleOpenDialog,
  handleConfirmDeleteEntry,
  handleOpenEntryDialog,
}) => {
  if (!trackers || !Array.isArray(trackers)) {
    return <Typography>No tracker(s) to be displayed.</Typography>;
  }

  const handleExpandAll = () => {
    trackers.forEach((tracker) => {
      updateAppState(`accordion.trackers.${tracker._id}`, true);
    });
    window.location.reload();
  };

  const handleCollapseAll = () => {
    trackers.forEach((tracker) => {
      updateAppState(`accordion.trackers.${tracker._id}`, false);
    });
    window.location.reload();
  };
  return (
    <Box width={1} my={2}>
      <Box
        mb={2}
        sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}
      >
        <Button
          color="accent"
          variant="contained"
          size="small"
          onClick={() => handleOpenDialog("add", null)}
        >
          Add +
        </Button>
        <Box flex={1} />
        <ExpandUnExpandBtn label="expand all" onClick={handleExpandAll} />
        <ExpandUnExpandBtn label="collapse all" onClick={handleCollapseAll} />
      </Box>

      {trackers.map((tracker, i) => (
        <TrackerAccordion
          key={tracker._id}
          tracker={tracker}
          index={i}
          handleDeletingTrackerInfo={handleDeletingTrackerInfo}
          handleOpenDialog={handleOpenDialog}
          handleConfirmDeleteEntry={handleConfirmDeleteEntry}
          handleOpenEntryDialog={handleOpenEntryDialog}
        />
      ))}
    </Box>
  );
};

export default TrackersContainer;
