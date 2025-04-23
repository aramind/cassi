import React, { useCallback, useEffect, useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import PageHeader from "../../components/PageHeader";
import { Stack, Typography } from "@mui/material";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";
import useApiGet from "../../hooks/api/useApiGet";
import useAuth from "../../hooks/useAuth";
import useTrackerReq from "../../hooks/api/authenticated/useTrackerReq";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import TrackerDialog from "./TrackerDialog";
import DeletedTrackers from "./DeletedTrackers";
import useUpdateTracker from "../../hooks/api/authenticated/tracker/useUpdateTracker";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import FullScreenDialog from "../../components/FullScreenDialog";
import TrackersContainer from "./TrackersContainer";
import useDialogManager from "../../hooks/useDialogManager";
import { getConfirmText } from "../../utils/dialogUtils";
import { convertToISOFormat } from "../../utils/date";

const TrackersPage = () => {
  // states
  const [openDeletedTrackers, setOpenDeletedTrackers] = useState(false);
  // hooks
  const { auth } = useAuth();
  const { dialogState, handleOpenDialog, handleCloseDialog } =
    useDialogManager();

  const { sendUpdateTracker, isLoadingInUpdatingTracker } = useUpdateTracker();
  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  const { getTrackers, addTracker } = useTrackerReq({
    isPublic: false,
    showAck: false,
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

  const handleConfirmAddTracker = (formData) => {
    handleConfirm("Add tracker", getConfirmText("add", "tracker"), async () => {
      await addTracker({ data: { tracker: formData } });
      handleCloseDialog();
    });
  };

  const handleConfirmRestore = (trackerId, trackerTitle) => {
    handleConfirm(
      "Confirm Restore",
      <>
        <Typography>Are you sure you want to restore this tracker?</Typography>
        <br />
        <Typography width={1} variant="h4" textAlign="center">
          {trackerTitle}
        </Typography>
      </>,
      async () => {
        await sendUpdateTracker(
          {
            trackerId: trackerId,
            data: { status: "active" },
          },
          {
            showSuccess: "Tracker restored.",
            showError: true,
          }
        );
      }
    );
  };

  // handlers for entries

  const handleAddingEntry = (tracker) => async (data) => {
    const newEntry = {
      ...data,
      date: convertToISOFormat(data?.date),
      comments: data?.comments?.split("/"),
    };
    const updatedEntries = [newEntry, ...(tracker?.entries || [])];

    await sendUpdateTracker(
      {
        trackerId: tracker?._id,
        data: { entries: updatedEntries },
      },
      {
        showSuccess: "Entry added successfully!",
        showError: true,
      }
    );
  };

  const handleUpdatingEntry = (tracker) => async (data) => {
    const formattedData = {
      ...data,
      date: convertToISOFormat(data?.date),
      comments: data?.comments?.split("/"),
    };

    const updatedEntries = tracker?.entries?.map((entry) =>
      entry?._id === formattedData?._id ? { ...entry, ...formattedData } : entry
    );

    await sendUpdateTracker(
      {
        trackerId: tracker?._id,
        data: { entries: updatedEntries },
      },
      {
        showSuccess: "Entry updated successfully!",
        showError: true,
      }
    );
  };

  const handleConfirmDeleteEntry = (tracker) =>
    handleConfirm(
      "Confirm Delete",
      <Typography>Are you sure you want to restore this tracker?</Typography>,
      async (entryId) => {
        const updatedEntries = tracker?.entries?.filter(
          (entry) => entry._id !== entryId
        );

        await sendUpdateTracker(
          {
            trackerId: tracker?._id,
            data: { entries: updatedEntries },
          },
          {
            showSuccess: "Entry deleted successfully!",
            showError: true,
          }
        );
      }
    );

  const handleUpdatingTrackerInfo = (id, updates) => {
    handleConfirm(
      "Confirm Update",
      <Typography>Continue update?</Typography>,
      async () => {
        try {
          await sendUpdateTracker(
            {
              trackerId: id,
              data: updates,
            },
            {
              showSuccess: "Tracker updated successfully!",
              showError: true,
            }
          );
          handleCloseDialog();
        } catch (error) {
          console.log(error);
        }
      }
    );
  };

  const handleDeletingTrackerInfo = (tracker, updates) =>
    handleConfirm(
      "Confirm Delete",
      <Typography>Continue delete?</Typography>,
      async () => {
        try {
          await sendUpdateTracker(
            {
              trackerId: tracker?._id,
              data: updates,
            },
            {
              showSuccess: "Tracker deleted successfully!",
              showError: true,
            }
          );
          handleCloseDialog();
        } catch (error) {
          console.log(error);
        }
      }
    );

  // calculated values before rendering
  const activeTrackers = trackersData?.data?.filter(
    (tracker) => tracker?.status?.toLowerCase() === "active"
  );

  const deletedTrackers = trackersData?.data?.filter(
    (tracker) => tracker?.status?.toLowerCase() === "deleted"
  );

  if (isLoadingInGetReq) {
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
        <br />
        <MyButton
          type="accent"
          text="add tracker"
          variant="contained"
          onClickHandler={() => handleOpenDialog("add", null)}
        />
        <br />
        {activeTrackers && (
          <TrackersContainer
            trackers={activeTrackers}
            handleUpdatingTrackerInfo={handleUpdatingTrackerInfo}
            handleDeletingTrackerInfo={handleDeletingTrackerInfo}
            handleOpenDialog={handleOpenDialog}
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
            ? handleConfirmAddTracker
            : handleUpdatingTrackerInfo
        }
      />
      {renderConfirmActionDialog()}
    </BodyContainer>
  );
};

export default TrackersPage;
