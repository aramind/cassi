import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import OccupantCard from "./OccupantCard";
import { amber, red } from "@mui/material/colors";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

const COLORS = {
  active: "primary.light",
  suspended: amber[300],
  evicted: "secondary.light",
  banned: red[300],
};
const OccupantByStatus = ({
  open,
  setOpen,
  occupants,
  status,
  label,
  onUpdate,
}) => {
  const isStatusIncluded = open?.includes(status);
  const filtered = occupants?.filter((o) => o.status === status);
  if (filtered?.length === 0) return null;

  return (
    <Stack width={1} spacing={1} mb={1}>
      <Stack
        flex={1}
        bgcolor={COLORS[status] || "secondary.light"}
        direction="row"
        alignItems="center"
      >
        <Box width={1} flex={1}></Box>
        <Typography flex={8} variant="h6" textAlign="center">
          {label.toUpperCase()}
        </Typography>
        <Box width={1} flex={1}>
          <IconButton
            flex={1}
            onClick={
              isStatusIncluded
                ? () => setOpen((pv) => pv.filter((item) => item !== status))
                : () => setOpen((pv) => [...pv, status])
            }
          >
            {isStatusIncluded ? (
              <VisibilityOffRoundedIcon />
            ) : (
              <VisibilityRoundedIcon />
            )}
          </IconButton>
        </Box>
      </Stack>

      {isStatusIncluded &&
        filtered?.map((occupant, index) => (
          <OccupantCard
            key={index}
            index={index}
            occupant={occupant}
            onUpdate={onUpdate}
          />
        ))}
    </Stack>
  );
};

export default OccupantByStatus;
