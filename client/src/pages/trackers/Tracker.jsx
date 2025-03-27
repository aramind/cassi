import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import TrackerEntries from "./TrackerEntries";
import MyButton from "../../components/buttons/MyButton";
import EntryDialog from "./EntryDialog";
import useUpdateTracker from "../../hooks/api/authenticated/tracker/useUpdateTracker";

// const tracker = mockDB?.trackers?.[0];
const Tracker = ({ tracker }) => {
  const [openEntryDialog, setOpenEntryDialog] = useState(false);
  const { sendUpdateTracker, isLoadingInUpdatingTracker } = useUpdateTracker();
  // console.log(tracker);
  const addEntryHandler = () => {
    setOpenEntryDialog(true);
  };

  const submitHandler = async (data) => {
    sendUpdateTracker(data);
  };

  return (
    <Stack width={1} alignItems="center">
      <Typography></Typography>
      <Typography variant="h5" fontSize={{ xs: "1rem", md: "1.2rem" }}>
        {tracker?.title}
      </Typography>
      <Typography
        variant="h5"
        fontWeight="normal"
        fontSize={{ xs: "0.8rem", md: "1rem" }}
      >
        {tracker?.description}
      </Typography>
      <Box my={2} width={1}>
        {/* <TrackersTables tracker={tracker} /> */}
        <TrackerEntries tracker={tracker} />
      </Box>
      <br />
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
        submitHandler={submitHandler}
      />
    </Stack>
  );
};

export default Tracker;
