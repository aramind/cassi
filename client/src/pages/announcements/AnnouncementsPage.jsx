import React, { useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Stack, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";
import AnnouncementDialog from "./AnnouncementDialog";
import useAnnouncementReq from "../../hooks/api/authenticated/announcement/useAnnouncementReq";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import AnnouncementCard from "./AnnouncementCard";
import AnnouncementsBox from "./AnnouncementsBox";
import FullScreenDialog from "../../components/FullScreenDialog";
import useAnnouncementActions from "../../hooks/api/authenticated/announcement/useAnnouncementActions";
import useDialogManager from "../../hooks/useDialogManager";

const AnnouncementsPage = () => {
  // hooks
  const { dialogState, handleOpenDialog, handleCloseDialog } =
    useDialogManager();

  const [openDraftedAnnouncements, setOpenDraftedAnnouncements] =
    useState(false);
  const [openDeletedAnnouncements, setOpenDeletedAnnouncements] =
    useState(false);

  const {
    updateAnnouncement,
    softDelete,
    restore,
    // publish,
  } = useAnnouncementReq({
    isPublic: false,
    showAck: false,
  });

  const {
    announcementsData,
    handleConfirmAddAnnouncement,
    handleConfirmPublish,
    handleConfirmUpdate,
    handleConfirmRestore,
    handleConfirmSaveAsDraft,
    renderConfirmActionDialog,
    isLoading,
    isError,
  } = useAnnouncementActions({
    handleCloseDialog,
  });

  const handleConfirm = () => {};

  const deleteAnnouncementHandler = (id) => {
    handleConfirm(
      "Delete Announcement",
      <Typography>Continue with the deletion?</Typography>,
      () => softDelete({ id })
    );
  };

  // const handleConfirmRestore = ({ id }) => {
  //   handleConfirm(
  //     "Restore",
  //     <Typography>Restore this deleted announcement?</Typography>,
  //     () => restore({ id })
  //   );
  // };

  // const handleConfirmSaveAsDraft = ({ id, data }) => {
  //   handleConfirm(
  //     "Save as Draft",
  //     <Typography>Save as draft?</Typography>,
  //     () => updateAnnouncement({ id, data })
  //   );
  // };

  // const handleConfirmPublish = ({ id, data }) => {
  //   handleConfirm(
  //     "Publish Announcement",
  //     <Typography>Continue?</Typography>,
  //     () => updateAnnouncement({ id, data })
  //   );
  // };

  // const updateAnnouncementHandler = ({ id, data }) => {
  //   handleConfirm(
  //     "Update Announcement",
  //     <Typography>Proceed updating?</Typography>,
  //     () => updateAnnouncement({ id, data })
  //   );
  // };

  const publishedAnnouncements = announcementsData?.data?.filter(
    (ann) => ann.status === "published"
  );
  const deletedAnnouncements = announcementsData?.data?.filter(
    (ann) => ann.status === "deleted"
  );
  const draftedAnnouncements = announcementsData?.data?.filter(
    (ann) => ann.status === "draft"
  );
  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;
  return (
    <BodyContainer justifyContent="flex-start">
      <Stack mt={2} alignItems="center" width={1} pb={2}>
        <PageHeader text="announcements " />
        <Today />
        <br />
        <MyButton
          type="accent"
          text="add"
          variant="contained"
          onClickHandler={() => handleOpenDialog("add", null)}
        />
        <br />
        {publishedAnnouncements && (
          <AnnouncementsBox>
            {publishedAnnouncements?.map((announcement, index) => (
              <AnnouncementCard
                key={index}
                announcement={announcement}
                updateHandler={handleConfirmUpdate}
                deleteHandler={deleteAnnouncementHandler}
                saveAsDraftHandler={handleConfirmSaveAsDraft}
              />
            ))}
          </AnnouncementsBox>
        )}

        <br />
        <MyButton
          type="accent"
          text="add"
          variant="contained"
          onClickHandler={() => handleOpenDialog("add", null)}
        />
        <br />
      </Stack>
      <AnnouncementDialog
        {...dialogState}
        handleCloseDialog={handleCloseDialog}
        submitHandler={
          dialogState?.action === "add"
            ? handleConfirmAddAnnouncement
            : () => alert("not adding...")
        }
      />
      {renderConfirmActionDialog()}
      <Stack direction="row" spacing={1} width={1} justifyContent="center">
        {draftedAnnouncements?.length > 0 && (
          <FullScreenDialog
            open={openDraftedAnnouncements}
            setOpen={setOpenDraftedAnnouncements}
            actionText="open draft(s)"
            title="Drafts"
          >
            <br />
            <AnnouncementsBox>
              {draftedAnnouncements?.map((announcement, index) => (
                <AnnouncementCard
                  key={index}
                  announcement={announcement}
                  publishHandler={handleConfirmPublish}
                  updateHandler={handleConfirmUpdate}
                  deleteHandler={deleteAnnouncementHandler}
                />
              ))}
            </AnnouncementsBox>
          </FullScreenDialog>
        )}
        {deletedAnnouncements?.length > 0 && (
          <FullScreenDialog
            open={openDeletedAnnouncements}
            setOpen={setOpenDeletedAnnouncements}
            actionText="review deleted"
            title="Deleted"
          >
            <br />
            <AnnouncementsBox>
              {deletedAnnouncements?.map((announcement, index) => (
                <AnnouncementCard
                  key={index}
                  announcement={announcement}
                  restoreHandler={handleConfirmRestore}
                  permanentDelHandler={handleConfirmRestore}
                />
              ))}
            </AnnouncementsBox>
          </FullScreenDialog>
        )}
      </Stack>
    </BodyContainer>
  );
};

export default AnnouncementsPage;
