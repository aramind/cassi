import { Stack } from "@mui/material";
import React from "react";

const AnnouncementsBox = ({ children }) => {
  return (
    <Stack
      width={1}
      direction="row"
      flexWrap="wrap"
      gap={2}
      justifyContent="center"
      alignItems="stretch"
      px={{ md: 4 }}
    >
      {children}
    </Stack>
  );
};

export default AnnouncementsBox;
