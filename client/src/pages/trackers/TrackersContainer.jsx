import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { ExpandMoreIcon } from "../../utils/muiIcons";
import TrackerActionsGroup from "./TrackerActionsGroup";
import TrackerEntries from "./TrackerEntries";
import MyButton from "../../components/buttons/MyButton";
import useAppState from "../../hooks/useAppState";
import TrackerAccordion from "./TrackerAccordion";

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

  return (
    <Box width={1} my={2}>
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
