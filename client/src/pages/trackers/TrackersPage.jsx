import React, { act, useEffect, useState } from "react";
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
import Trackers from "./Trackers";
import TrackerDialog from "./TrackerDialog";
import DeletedTrackers from "./DeletedTrackers";

const TrackersPage = () => {
  const { auth } = useAuth();
  const [activeTrackers, setActiveTrackers] = useState([]);
  const [deletedTrackers, setDeletedTrackers] = useState([]);
  const [openTrackerDialog, setOpenTrackerDialog] = useState(false);
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

  useEffect(() => {
    const activeTrackers = trackersData?.data?.filter(
      (tracker) => tracker?.status?.toLowerCase() === "active"
    );

    const deletedTrackers = trackersData?.data?.filter(
      (tracker) => tracker?.status?.toLowerCase() === "deleted"
    );

    setActiveTrackers((pv) => activeTrackers);
    setDeletedTrackers((pv) => deletedTrackers);
  }, [trackersData]);

  const addTrackerHandler = () => {
    setOpenTrackerDialog(true);
  };

  const submitAddHandler = (formData) => {
    addTracker({ data: { tracker: formData } });
  };

  const restoreTrackerHandler = (trackerId) => {
    console.log(
      trackersData?.data?.filter((tracker) => tracker?._id === trackerId)
    );
  };

  if (isLoadingInGetReq) {
    return <LoadingPage />;
  }

  if (isErrorInGetReq) {
    return <ErrorPage />;
  }

  return (
    <BodyContainer justifyContent="flex-start" withTopBar={true}>
      <Stack mt={2} alignItems="center" width={1} pb={4}>
        <PageHeader text="trackers " />
        <Today />
        <br />
        <MyButton
          type="accent"
          text="add tracker"
          variant="contained"
          onClickHandler={addTrackerHandler}
        />
        <br />
        {activeTrackers && <Trackers trackers={activeTrackers} />}
        <br />

        <MyButton
          type="accent"
          text="add tracker"
          variant="contained"
          onClickHandler={addTrackerHandler}
        />
      </Stack>

      {deletedTrackers && (
        <DeletedTrackers
          trackers={deletedTrackers}
          restoreTrackerHandler={restoreTrackerHandler}
        />
      )}
      <TrackerDialog
        open={openTrackerDialog}
        setOpen={setOpenTrackerDialog}
        action="add"
        submitHandler={submitAddHandler}
      />
    </BodyContainer>
  );
};

export default TrackersPage;
