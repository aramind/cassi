import { Box, Typography } from "@mui/material";
import React from "react";

const AnnouncementCard = ({ announcement }) => {
  return (
    <Box
      width="40vw"
      height="40vw"
      maxWidth="400px"
      maxHeight="400px"
      className="outlined"
    >
      <Typography>{announcement?.title}</Typography>
    </Box>
  );
};

export default AnnouncementCard;
