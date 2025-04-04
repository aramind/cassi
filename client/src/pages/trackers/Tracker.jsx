import React, { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import TrackerEntries from "./TrackerEntries";
import MyButton from "../../components/buttons/MyButton";
import EntryDialog from "./EntryDialog";
import useUpdateTracker from "../../hooks/api/authenticated/tracker/useUpdateTracker";
import { convertToISOFormat } from "../../utils/date";
import TrackerActionsGroup from "./TrackerActionsGroup";

// const tracker = mockDB?.trackers?.[0];
const Tracker = ({ tracker }) => {
  const [openEntryDialog, setOpenEntryDialog] = useState(false);
  const { sendUpdateTracker, isLoadingInUpdatingTracker } = useUpdateTracker();
  // console.log(tracker);
  const addEntryHandler = () => {
    setOpenEntryDialog(true);
  };

  const addingEntryHandler = async (data) => {
    const formattedDate = convertToISOFormat(data?.date);
    const newEntry = { ...data, date: formattedDate };
    const updatedEntries = [newEntry, ...(tracker?.entries || [])];

    sendUpdateTracker({
      trackerId: tracker?._id,
      data: { entries: updatedEntries },
    });
    setOpenEntryDialog(false);
  };

  const updatingEntryHandler = async (data) => {
    const formattedData = {
      ...data,
      date: convertToISOFormat(data?.date),
      comments: data?.comments?.split(";"),
    };

    const updatedEntries = tracker?.entries?.map((entry) =>
      entry?._id === formattedData?._id ? { ...entry, ...formattedData } : entry
    );

    sendUpdateTracker({
      trackerId: tracker?._id,
      data: { entries: updatedEntries },
    });

    setOpenEntryDialog(false);
  };

  const deleteEntryHandler = async (entryId) => {
    const updatedEntries = tracker?.entries?.filter(
      (entry) => entry._id !== entryId
    );

    sendUpdateTracker({
      trackerId: tracker?._id,
      data: { entries: updatedEntries },
    });
  };

  const updateTrackerMetaInfoHandler = async (updates) => {
    sendUpdateTracker({
      trackerId: tracker?._id,
      data: updates,
    });

    setOpenEntryDialog(false);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Stack width={1} alignItems="center" px={1} py={2}>
        <Stack direction="row">
          <Stack>
            <Typography variant="h5" textAlign="center" width={1}>
              {tracker?.title}
            </Typography>
            <Typography
              variant="h4"
              fontWeight="normal"
              textAlign="center"
              width={1}
            >
              {tracker?.description}
            </Typography>
          </Stack>
          <TrackerActionsGroup
            tracker={tracker}
            updateHandler={updateTrackerMetaInfoHandler}
            deleteHandler={updateTrackerMetaInfoHandler}
            setOpenEntryDialog={setOpenEntryDialog}
          />
        </Stack>
        <Box my={2} width={1}>
          {/* <TrackersTables tracker={tracker} /> */}
          <TrackerEntries
            tracker={tracker}
            submitHandler={updatingEntryHandler}
            deleteEntryHandler={deleteEntryHandler}
          />
        </Box>
        <MyButton
          type="primary"
          text="add entry"
          variant="contained"
          onClickHandler={addEntryHandler}
        />
        <EntryDialog
          open={openEntryDialog}
          setOpen={setOpenEntryDialog}
          action="add"
          submitHandler={addingEntryHandler}
          tracker={tracker}
        />
      </Stack>
    </Paper>
  );
};

export default Tracker;
