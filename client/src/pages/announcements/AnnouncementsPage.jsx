import React, { useMemo } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Stack, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";
import AnnouncementDialog from "./AnnouncementDialog";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import useAnnouncementActions from "../../hooks/api/authenticated/announcement/useAnnouncementActions";
import useDialogManager from "../../hooks/useDialogManager";
import DraftsSection from "./DraftsSection";
import DeletedSection from "./DeletedSection";
import PublishedSection from "./PublishedSection";
import { filteredAnnouncementByStatus } from "../../utils/announcementUtils";
import NothingImage from "../../components/NothingImage";

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

  const { publishedAnnouncements, draftedAnnouncements, deletedAnnouncements } =
    useMemo(
      () => filteredAnnouncementByStatus(announcementsData?.data),
      [announcementsData?.data]
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
        {publishedAnnouncements?.length > 0 ? (
          <>
            <AddButton />
            <br />
            <PublishedSection
              announcements={publishedAnnouncements}
              {...props.sectionProps}
            />
          </>
        ) : (
          // <Typography variant="smallText" color="error" textAlign="center">
          //   No published announcements to be displayed.
          // </Typography>
          <NothingImage />
        )}

        <br />
        <AddButton />
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
