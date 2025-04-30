import React from "react";
import useAppState from "../../hooks/useAppState";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMoreIcon } from "../../utils/muiIcons";
import TrackerActionsGroup from "./TrackerActionsGroup";
import TrackerEntries from "./TrackerEntries";
import MyButton from "../../components/buttons/MyButton";

const TrackerAccordion = ({
  tracker,
  index,
  handleDeletingTrackerInfo,
  handleOpenDialog,
  handleConfirmDeleteEntry,
  handleOpenEntryDialog,
}) => {
  const [expanded, setExpanded] = useAppState(
    `accordion.trackers.${tracker._id}`,
    false
  );

  const handleChange = (_, isExpanded) => setExpanded(isExpanded);

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index}-content`}
        id={`panel${index}-header`}
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
            handleConfirmDeleteEntry={handleConfirmDeleteEntry}
            handleOpenEntryDialog={handleOpenEntryDialog}
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
  );
};

export default TrackerAccordion;
