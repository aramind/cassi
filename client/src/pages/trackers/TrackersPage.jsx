import React from "react";
import BodyContainer from "../../containers/BodyContainer";
import PageHeader from "../../components/PageHeader";
import { Stack } from "@mui/material";
import Today from "../../components/Today";

const TrackersPage = () => {
  return (
    <BodyContainer justifyContent="flex-start">
      <Stack mt={2} alignItems="center">
        <PageHeader text="trackers " />
        <Today />
      </Stack>
    </BodyContainer>
  );
};

export default TrackersPage;
