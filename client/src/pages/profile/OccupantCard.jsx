import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { formatDate } from "../../utils/formatDate";

const Value = ({ transform, children }) => (
  <Typography fontWeight="bold" textTransform={transform}>
    {children}
  </Typography>
);
const OccupantDetail = ({ label, value }) => (
  <Stack direction="row" spacing={1}>
    <Typography>{label.toUpperCase()}</Typography>
    <Typography>:</Typography>
    <Value>{value}</Value>
  </Stack>
);

const OccupantCard = ({ occupant, index, onUpdate }) => {
  return (
    <Stack
      key={index}
      // direction="row"
      spacing={1}
      width={1}
      px={1}
      mb={2}
      justifyContent="flex-start"
    >
      <Stack direction="row" pr={1} alignItems="center" spacing={0.5}>
        <Typography variant="h5">{index + 1}.</Typography>
        <Typography
          flex={1}
          variant="h6"
          color={occupant?.status === "active" ? "primary.dark" : "error"}
        >
          {occupant.occupant?.name?.lastName.toUpperCase()},{" "}
          {occupant.occupant?.name?.firstName.toUpperCase()}
        </Typography>

        <Tooltip title={occupant?.status} placement="top-start">
          {occupant?.status === "active" ? (
            <VerifiedRoundedIcon color="primary" sx={{ fontSize: "1.2rem" }} />
          ) : (
            <NewReleasesRoundedIcon color="error" sx={{ fontSize: "1.2rem" }} />
          )}
        </Tooltip>

        <IconButton onClick={() => onUpdate(occupant?._id)} size="small">
          <EditRoundedIcon sx={{ fontSize: "1.2rem" }} />
        </IconButton>
        <IconButton>
          <DeleteRoundedIcon sx={{ fontSize: "1.2rem" }} />
        </IconButton>
      </Stack>
      <Stack spacing={1} pl={2}>
        <OccupantDetail
          label="nick name"
          value={occupant.occupant?.name?.nickName}
        />
        <OccupantDetail label="gender" value={occupant.occupant?.gender} />
        <OccupantDetail
          label="birthday"
          value={formatDate(occupant.occupant?.dateOfBirth)}
        />
        <OccupantDetail label="email" value={occupant.occupant?.email} />
        <OccupantDetail
          label="occupation"
          value={occupant.occupant?.occupation}
        />
        <OccupantDetail
          label="contact details"
          value={occupant.occupant?.contactNumbers.join(",")}
        />
        <OccupantDetail
          label="emergency contact"
          value={occupant.occupant?.emergencyContact?.name}
        />
        <OccupantDetail
          label="preferences"
          value={occupant.occupant?.preferences.join(",")}
        />
        <OccupantDetail
          label="move in date"
          value={formatDate(occupant.moveInDate)}
        />
      </Stack>
    </Stack>
  );
};

export default OccupantCard;
