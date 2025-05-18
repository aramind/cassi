import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import NewReleasesRoundedIcon from "@mui/icons-material/NewReleasesRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { formatDate } from "../../utils/formatDate";
import { ExpandLessIcon, ExpandMoreIcon } from "../../utils/muiIcons";

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

const OccupantCard = ({
  occupant,
  index,
  onUpdate,
  handleOpenDialog,
  confirmHandlers,
}) => {
  const [showEContact, setShowEContact] = useState(false);
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

        <IconButton
          onClick={() => handleOpenDialog("update", occupant)}
          size="small"
        >
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
          value={occupant.occupant?.contactNumbers.join("/")}
        />

        <OccupantDetail
          label="preferences"
          value={occupant.occupant?.preferences.join("/")}
        />
        <OccupantDetail
          label="move in date"
          value={formatDate(occupant.moveInDate)}
        />
        <Stack
          width={1}
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          <Typography>EMERGENCY CONTACT:</Typography>
          <IconButton
            aria-label="expand"
            onClick={() => setShowEContact((pv) => !pv)}
          >
            {showEContact ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Stack>

        {showEContact && (
          <Stack spacing={1} pl={2}>
            <OccupantDetail
              label="name"
              value={occupant.occupant?.emergencyContact?.name}
            />
            <OccupantDetail
              label="address"
              value={occupant.occupant?.emergencyContact?.address}
            />
            <OccupantDetail
              label="relation to occupant"
              value={occupant.occupant?.emergencyContact?.relationToOccupant}
            />
            <OccupantDetail
              label="email"
              value={occupant.occupant?.emergencyContact?.email}
            />
            <OccupantDetail
              label="mobile #"
              value={occupant.occupant?.emergencyContact?.mobileNumber}
            />
            <OccupantDetail
              label="phone #"
              value={occupant.occupant?.emergencyContact?.phoneNumber}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default OccupantCard;
