import React, { useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import PageHeader from "../../components/PageHeader";
import { Stack } from "@mui/material";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";
import useApiGet from "../../hooks/api/useApiGet";
import useAuth from "../../hooks/useAuth";
import useTrackerReq from "../../hooks/api/authenticated/useTrackerReq";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import TrackerDialog from "./TrackerDialog";
import DeletedTrackers from "./DeletedTrackers";
import FullScreenDialog from "../../components/FullScreenDialog";
import TrackersContainer from "./TrackersContainer";
import useDialogManager from "../../hooks/useDialogManager";
import useTrackerActions from "../../hooks/api/authenticated/tracker/useTrackerActions";
import EntryDialog from "./EntryDialog";

const TrackersPage = () => {
  // states
  const [openDeletedTrackers, setOpenDeletedTrackers] = useState(false);

  // hooks
  const { auth } = useAuth();
  const { dialogState, handleOpenDialog, handleCloseDialog } =
    useDialogManager();
  const {
    dialogState: entryDialogState,
    handleOpenDialog: handleOpenEntryDialog,
    handleCloseDialog: handleCloseEntryDialog,
  } = useDialogManager();
  const {
    handleConfirmAddTracker,
    handleAddingEntry,
    handleUpdatingEntry,
    handleConfirmDeleteEntry,
    handleConfirmRestore,
    handleUpdatingTrackerInfo,
    handleDeletingTrackerInfo,
    renderConfirmActionDialog,
    isLoadingInUpdatingTracker,
    isLoadingInAddingTracker,
  } = useTrackerActions({ handleCloseDialog });

  const { getTrackers } = useTrackerReq({
    isPublic: false,
    showAck: true,
  });

  const {
    data: trackersData,
    isLoading: isLoadingInGetReq,
    isError: isErrorInGetReq,
  } = useApiGet(
    ["trackers", auth?.houseInfo?._id],
    () => getTrackers(`house=${auth?.houseInfo?._id}`),
    { enabled: !!auth?.houseInfo?._id }
  );

  const handleAddTrackerSubmit = (formData) => {
    const res = handleConfirmAddTracker(formData);
    if (res?.success) {
      handleCloseDialog();
    }
  };

  const handleUpdateTrackerSubmit = (id, formData) => {
    const res = handleUpdatingTrackerInfo(id, formData);
    if (res?.success) {
      handleCloseDialog();
    }
  };

  // calculated values before rendering
  const activeTrackers = trackersData?.data?.filter(
    (tracker) => tracker?.status?.toLowerCase() === "active"
  );

  const deletedTrackers = trackersData?.data?.filter(
    (tracker) => tracker?.status?.toLowerCase() === "deleted"
  );

  if (
    isLoadingInGetReq ||
    isLoadingInUpdatingTracker ||
    isLoadingInAddingTracker
  ) {
    return <LoadingPage />;
  }

  if (isErrorInGetReq) {
    return <ErrorPage />;
  }

  // console.log(dialogState?.data);
  return (
    <BodyContainer justifyContent="flex-start">
      <Stack mt={2} alignItems="center" width={1} pb={4}>
        <PageHeader text="trackers " />
        <Today />
        {activeTrackers && (
          <TrackersContainer
            trackers={activeTrackers}
            handleUpdatingTrackerInfo={handleUpdatingTrackerInfo}
            handleDeletingTrackerInfo={handleDeletingTrackerInfo}
            handleAddingEntry={handleAddingEntry}
            handleUpdatingEntry={handleUpdatingEntry}
            handleConfirmDeleteEntry={handleConfirmDeleteEntry}
            handleOpenDialog={handleOpenDialog}
            handleOpenEntryDialog={handleOpenEntryDialog}
          />
        )}
        {/* {activeTrackers && <Trackers trackers={activeTrackers} />} */}
        <br />

        <MyButton
          type="accent"
          text="add tracker"
          variant="contained"
          onClickHandler={() => handleOpenDialog("add", null)}
        />
        <br />

        {deletedTrackers?.length > 0 && (
          <FullScreenDialog
            open={openDeletedTrackers}
            setOpen={setOpenDeletedTrackers}
            actionText="review deleted tracker(s)"
            title="Deleted Tracker(s)"
          >
            <DeletedTrackers
              trackers={deletedTrackers}
              restoreTrackerHandler={handleConfirmRestore}
            />
          </FullScreenDialog>
        )}
      </Stack>
      <TrackerDialog
        {...dialogState}
        handleCloseDialog={handleCloseDialog}
        submitHandler={
          dialogState?.action === "add"
            ? handleAddTrackerSubmit
            : handleUpdateTrackerSubmit
        }
      />
      <EntryDialog
        {...entryDialogState}
        submitHandler={
          entryDialogState?.action === "add"
            ? handleAddingEntry
            : handleUpdatingEntry
        }
        handleCloseEntryDialog={handleCloseEntryDialog}
      />
      {renderConfirmActionDialog()}
    </BodyContainer>
  );
};

export default TrackersPage;
