import { Stack, Typography } from "@mui/material";
import React from "react";
import { getCurrentDay, getCurrentDate } from "../../utils/date";

const DashBoardMain = () => {
  return (
    <Stack>
      <Typography variant="mediumHeader" fontSize="1.8rem">
        Hi! Happy {getCurrentDay}!
      </Typography>
      <Typography variant="smallSubHeader" fontSize="1.2rem">
        Today is {getCurrentDate}.
      </Typography>
    </Stack>
  );
};

export default DashBoardMain;
