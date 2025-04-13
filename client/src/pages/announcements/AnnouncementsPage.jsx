import React, { useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Stack, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";
import AnnouncementDialog from "./AnnouncementDialog";
import useAnnouncementReq from "../../hooks/api/authenticated/announcement/useAnnouncementReq";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";

const AnnouncementsPage = () => {
  const [openAnnouncementDialog, setOpenAnnouncementDialog] = useState(false);
  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();
  const { addAnnouncement } = useAnnouncementReq({
    isPublic: false,
    showAck: false,
  });

  const addAnnouncementHandler = () => {
    setOpenAnnouncementDialog(true);
  };

  const handleConfirmAddAnnouncement = (formData) => {
    handleConfirm(
      "Publish Announcement",
      <Stack spacing={2}>
        <Typography>Proceed publishing this announcement?</Typography>

        <Typography variant="h4">
          <strong>TITLE : </strong>
          {formData?.title}
        </Typography>
      </Stack>,
      async () => {
        await addAnnouncement({ data: { announcement: formData } });
        setOpenAnnouncementDialog(false);
      }
    );
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
        submitHandler={handleConfirmAddAnnouncement}
      />
      {renderConfirmActionDialog()}
    </BodyContainer>
  );
};

export default AnnouncementsPage;
