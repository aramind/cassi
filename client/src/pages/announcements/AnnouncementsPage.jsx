import React from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Stack, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";

const AnnouncementsPage = () => {
  const addAnnouncementHandler = () => {
    alert("Adding announcement..");
  };
  return (
    <BodyContainer justifyContent="flex-start">
      <Stack mt={2} alignItems="center" width={1} pb={4}>
        <PageHeader text="announcements " />
        <Today />
        <br />
        <MyButton
          type="accent"
          text="add"
          variant="contained"
          onClickHandler={addAnnouncementHandler}
        />
        <br />
        {/* to be replaced */}
        <Typography>Announcements here...</Typography>
        <br />
        <MyButton
          type="accent"
          text="add"
          variant="contained"
          onClickHandler={addAnnouncementHandler}
        />
        <br />
      </Stack>
    </BodyContainer>
  );
};

export default AnnouncementsPage;
