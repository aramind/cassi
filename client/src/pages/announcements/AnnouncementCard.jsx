import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";

const AnnouncementCard = ({ announcement }) => {
  console.log(announcement);
  return (
    <Stack
      width="40vw"
      //   minHeight="200px"
      height="auto"
      maxWidth="400px"
      className="outlined"
      p={1}
      borderRadius={2}
      sx={{
        aspectRatio: "1 / 1", // height = width
      }}
    >
      <Stack
        direction="row"
        gap={1}
        justifyContent="flex-start"
        width={1}
        flexWrap="wrap"
      >
        <Chip color="primary" label={announcement?.status} size="small" />
        <Chip color="info" label={announcement?.type} size="small" />
        <Chip
          sx={{ bgcolor: (theme) => theme.palette.accent.light }}
          label={announcement?.importance}
          size="small"
        />
      </Stack>
      <Typography variant="h6">{announcement?.title}</Typography>
      <Typography variant="body1">{announcement?.content}</Typography>
      <Typography variant="body1">{announcement?.createdBy}</Typography>
      <Typography variant="body1">{announcement?.createdAt}</Typography>
    </Stack>
  );
};

export default AnnouncementCard;
