import React from "react";
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
import useAnnouncementActions from "../../hooks/api/authenticated/announcement/useAnnouncementActions";
import useDialogManager from "../../hooks/useDialogManager";
import DraftsSection from "./DraftsSection";
import DeletedSection from "./DeletedSection";

const AnnouncementsPage = () => {
  // hooks
  const { dialogState, handleOpenDialog, handleCloseDialog } =
    useDialogManager();

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

  const confirmHandlers = {
    handleConfirmAddAnnouncement,
    handleConfirmPublish,
    handleConfirmUpdate,
    handleConfirmRestore,
    handleConfirmSaveAsDraft,
    handleConfirmSoftDelete,
    handleConfirmHardDelete,
  };

  const publishedAnnouncements = announcementsData?.data?.filter(
    (ann) => ann.status === "published"
  );
  const deletedAnnouncements = announcementsData?.data?.filter(
    (ann) => ann.status === "deleted"
  );
  const draftedAnnouncements = announcementsData?.data?.filter(
    (ann) => ann.status === "draft"
  );

  const AddButton = () => (
    <MyButton
      type="accent"
      text="add"
      variant="contained"
      onClickHandler={() => handleOpenDialog("add", null)}
    />
  );
  // preset props

  const props = {
    addBtn: {},
    sectionProps: {
      handleOpenDialog,
      ...confirmHandlers,
    },
  };
  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;
  return (
    <BodyContainer justifyContent="flex-start">
      <Stack mt={2} alignItems="center" width={1} pb={2}>
        <PageHeader text="announcements " />
        <Today />
        <br />
        <AddButton />
        <br />
        {publishedAnnouncements && (
          <AnnouncementsBox>
            {publishedAnnouncements?.map((announcement, index) => (
              <AnnouncementCard
                key={index}
                announcement={announcement}
                {...confirmHandlers}
                handleOpenDialog={handleOpenDialog}
              />
            ))}
          </AnnouncementsBox>
        )}

        <br />
        <AddButton />
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
        {...confirmHandlers}
      />
      {renderConfirmActionDialog()}
      <Stack direction="row" spacing={1} width={1} justifyContent="center">
        {draftedAnnouncements?.length > 0 && (
          <DraftsSection
            announcements={draftedAnnouncements}
            {...props.sectionProps}
          />
        )}
        {deletedAnnouncements?.length > 0 && (
          <DeletedSection
            announcements={deletedAnnouncements}
            {...props.sectionProps}
          />
        )}
      </Stack>
    </BodyContainer>
  );
};

export default AnnouncementsPage;
