import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import useHouseProvider from "../../hooks/useHouseProvider";
import FaceTwoToneIcon from "@mui/icons-material/FaceTwoTone";
import { formatDate } from "../../utils/formatDate";
import { amber, green, red } from "@mui/material/colors";
import AnnounceActionsGroup from "./AnnounceActionsGroup";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import DeletedAnnounceActionsGroup from "./DeletedAnnounceActionsGroup";

const importanceColor = {
  low: green[100],
  medium: amber[100],
  high: red[100],
};

const getStatusIcon = (status) => {
  if (status === "published") return <CampaignOutlinedIcon color="info" />;
  return <Chip variant="contained" color="info" label={status} size="small" />;
};

const HeaderChip = ({ label }) => (
  <Chip variant="outlined" color="info" label={label} size="small" />
);
const AnnouncementCard = ({
  announcement,
  handleOpenDialog,
  ...confirmHandlers
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
        <HeaderChip label={announcement?.type} />
        <HeaderChip label={announcement?.importance} />
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
        {getStatusIcon(announcement?.status)}
        <Box flex={1} />
        {announcement?.status === "deleted" ? (
          <DeletedAnnounceActionsGroup
            data={announcement}
            {...confirmHandlers}
          />
        ) : (
          <AnnounceActionsGroup
            data={announcement}
            {...confirmHandlers}
            handleOpenDialog={handleOpenDialog}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default AnnouncementCard;
