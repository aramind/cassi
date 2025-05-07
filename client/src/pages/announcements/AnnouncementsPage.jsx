import React, { useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Stack } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";
import AnnouncementDialog from "./AnnouncementDialog";
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
    announcementsData,
    handleConfirmAddAnnouncement,
    handleConfirmPublish,
    handleConfirmUpdate,
    handleConfirmRestore,
    handleConfirmSaveAsDraft,
    renderConfirmActionDialog,
    handleConfirmSoftDelete,
    handleConfirmHardDelete,
    isLoading,
    isError,
  } = useAnnouncementActions({
    handleCloseDialog,
  });

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
                deleteHandler={handleConfirmSoftDelete}
                handleOpenDialog={handleOpenDialog}
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
            : handleConfirmUpdate
        }
        saveAsDraftHandler={handleConfirmSaveAsDraft}
        publishHandler={handleConfirmPublish}
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
                  updateHandler={handleConfirmUpdate}
                  deleteHandler={handleConfirmSoftDelete}
                  handleOpenDialog={handleOpenDialog}
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
                  permanentDelHandler={handleConfirmHardDelete}
                  handleOpenDialog={handleOpenDialog}
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
