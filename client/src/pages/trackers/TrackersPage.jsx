import React from "react";
import BodyContainer from "../../containers/BodyContainer";
import PageHeader from "../../components/PageHeader";
import { Stack } from "@mui/material";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";
import Tracker from "./Tracker";

const TrackersPage = () => {
  const addTracker = () => {
    alert("adding a tracker...");
  };
  return (
    <BodyContainer justifyContent="flex-start" withTopBar={true}>
      <Stack mt={2} alignItems="center" width={1}>
        <PageHeader text="trackers " />
        <Today />
        <br />
        <MyButton
          type="accent"
          text="add tracker"
          variant="contained"
          onClickHandler={addTracker}
        />
        <br />
        <Tracker />
        <MyButton
          type="accent"
          text="add tracker"
          variant="contained"
          onClickHandler={addTracker}
        />
      </Stack>
    </BodyContainer>
  );
};

export default TrackersPage;
