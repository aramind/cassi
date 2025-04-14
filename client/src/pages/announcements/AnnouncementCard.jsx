import { Chip, Stack, Typography } from "@mui/material";
import React from "react";
import useHouseProvider from "../../hooks/useHouseProvider";
import { create } from "@mui/material/styles/createTransitions";

const AnnouncementCard = ({ announcement }) => {
  const { listOfHouseOccupants } = useHouseProvider();

  const createdByInName = listOfHouseOccupants.find(
    (ho) => ho.id === announcement?.createdBy
  )?.name;

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
      <Typography variant="body1">{createdByInName}</Typography>
      <Typography variant="body1">{announcement?.createdAt}</Typography>
    </Stack>
  );
};

export default AnnouncementCard;
