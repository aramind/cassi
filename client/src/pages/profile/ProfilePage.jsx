import React from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Stack } from "@mui/material";
import PageHeader from "../../components/PageHeader";

import useAuth from "../../hooks/useAuth";

const ProfilePage = () => {
  const { auth } = useAuth();

  console.log("AUTH", auth);
  return (
    <BodyContainer justifyContent="flex-start" withTopBar={true}>
      <Stack mt={2} alignItems="center" width={1}>
        <PageHeader text="profile" />
        <br />
      </Stack>
    </BodyContainer>
  );
};

export default ProfilePage;
