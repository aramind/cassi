import React, { useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Stack, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";
import AnnouncementDialog from "./AnnouncementDialog";

const AnnouncementsPage = () => {
  const [openAnnouncementDialog, setOpenAnnouncementDialog] = useState(false);

  const addAnnouncementHandler = () => {
    setOpenAnnouncementDialog(true);
  };

  const handleSaveAsDraft = () => {
    alert("saving as draft...");
  };
  return (
    <BodyContainer justifyContent="flex-start">
      <Stack mt={2} alignItems="center" width={1} pb={4}>
        <PageHeader text="announcements " />
        <Today />
        <br />
        <MyButton
          type="accent"
          text="add"
          variant="contained"
          onClickHandler={addAnnouncementHandler}
        />
        <br />
        {/* to be replaced */}
        <Typography>Announcements here...</Typography>
        <br />
        <MyButton
          type="accent"
          text="add"
          variant="contained"
          onClickHandler={addAnnouncementHandler}
        />
        <br />
      </Stack>
      <AnnouncementDialog
        open={openAnnouncementDialog}
        setOpen={setOpenAnnouncementDialog}
        action="add"
        handleSaveAsDraft={handleSaveAsDraft}
        submitHandler={addAnnouncementHandler}
      />
    </BodyContainer>
  );
};

export default AnnouncementsPage;
