import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import useHouseProvider from "../../hooks/useHouseProvider";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import { formatDate } from "../../utils/formatDate";
import { amber, green, red } from "@mui/material/colors";
import AnnounceActionsGroup from "./AnnounceActionsGroup";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeletedAnnounceActionsGroup from "./DeletedAnnounceActionsGroup";

const importanceColor = {
  low: green[100],
  medium: amber[100],
  high: red[100],
};

const statusIcon = {
  published: <CampaignOutlinedIcon color="info" />,
  draft: <HourglassTopOutlinedIcon color="warning" />,
  deleted: <DeleteOutlinedIcon color="error" />,
  archived: <ArchiveOutlinedIcon color="secondary" />,
};
const AnnouncementCard = ({
  announcement,
  // saveAsDraftHandler,
  publishHandler,
  updateHandler,
  deleteHandler,
  restoreHandler,
  permanentDelHandler,
}) => {
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
      p={1}
      borderRadius={2}
      sx={{
        aspectRatio: "1 / 1", // height = width
        position: "relative",
      }}
      boxShadow={3}
      bgcolor={importanceColor[announcement?.importance]}
    >
      <Stack
        direction="row"
        gap={1}
        justifyContent="flex-start"
        width={1}
        flexWrap="wrap"
        mb={0.5}
      >
        <Chip
          variant="outlined"
          color="info"
          label={announcement?.type}
          size="small"
        />
        <Chip
          variant="outlined"
          color="info"
          //   sx={{ bgcolor: importanceColor[announcement?.importance] }}
          label={announcement?.importance}
          size="small"
        />
      </Stack>

      <Typography variant="h6">{announcement?.title}</Typography>
      <Box flex={1} />

      <Divider />
      <Box mt="-4px" alignItems="flex-start">
        <Typography variant="narrowSmallText">
          {formatDate(announcement?.createdAt)}
        </Typography>
      </Box>
      <Typography variant="body1">{announcement?.content}</Typography>
      <Box flex={1} mb={1} />
      <Box mb={0.5}>
        <Chip
          icon={<FaceTwoToneIcon />}
          label={createdByInName}
          size="small"
          variant="outlined"
          sx={{
            justifyContent: "flex-start",
          }}
        />
      </Box>
      <Divider />
      <Stack width={1} direction="row" alignItems="center">
        {announcement?.status && statusIcon[announcement?.status]}
        <Box flex={1} />
        {announcement?.status === "deleted" ? (
          <DeletedAnnounceActionsGroup
            data={announcement}
            restoreHandler={restoreHandler}
            permanentDelHandler={permanentDelHandler}
          />
        ) : (
          <AnnounceActionsGroup
            data={announcement}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            publishHandler={publishHandler}
            // saveAsDraftHandler={saveAsDraftHandler}
          />
        )}
      </Stack>
      {/* <Box>
          <Chip color="primary" label={announcement?.status} size="small" />
        </Box> */}
    </Stack>
  );
};

export default AnnouncementCard;
