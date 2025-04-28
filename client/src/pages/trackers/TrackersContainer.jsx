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

const TrackersContainer = ({
  trackers,
  handleUpdatingTrackerInfo,
  handleDeletingTrackerInfo,
  handleOpenDialog,
  handleAddingEntry,
  handleUpdatingEntry,
  handleConfirmDeleteEntry,
  handleOpenEntryDialog,
}) => {
  if (!trackers || !Array.isArray(trackers)) {
    return <Typography>No tracker(s) to be displayed.</Typography>;
  }

  return (
    <Box width={1} my={2}>
      {trackers.map((tracker, i) => (
        <Accordion key={tracker?._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${i}-content`}
            id={`panel${i}-header`}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <TrackerActionsGroup
                tracker={tracker}
                updateHandler={() => handleOpenDialog("update", tracker)}
                deleteHandler={() =>
                  handleDeletingTrackerInfo(tracker, { status: "deleted" })
                }
              />
              <Stack width={1} alignItems="flex-start">
                <Typography
                  variant="h5"
                  width={1}
                  textAlign="left"
                  color="primary.dark"
                >
                  {tracker?.title}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="normal"
                  textAlign="left"
                  width={1}
                >
                  {tracker?.description}
                </Typography>
              </Stack>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack justifyContent="center" alignItems="center" spacing={2}>
              <TrackerEntries
                tracker={tracker}
                // submitHandler={updatingEntryHandler}
                // deleteEntryHandler={deleteEntryHandler}
              />
              <MyButton
                type="primary"
                text="add entry"
                variant="contained"
                onClickHandler={() =>
                  handleOpenEntryDialog("add", { tracker, entry: null })
                }
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default TrackersContainer;
