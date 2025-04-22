import React, { useEffect, useState } from "react";
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
      () => {
        sendUpdateTracker({
          trackerId: trackerId,
          data: { status: "active" },
        });
      }
    );
  };

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
        {activeTrackers && <TrackersContainer trackers={activeTrackers} />}
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
        submitHandler={handleConfirmAddTracker}
      />
      {renderConfirmActionDialog()}
    </BodyContainer>
  );
};

export default TrackersPage;
