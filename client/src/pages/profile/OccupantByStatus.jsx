import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import OccupantCard from "./OccupantCard";
import { amber, red } from "@mui/material/colors";

const COLORS = {
  active: "primary.light",
  suspended: amber[300],
  evicted: "secondary.light",
  banned: red[300],
};
const OccupantByStatus = ({ occupants, status, label, onUpdate }) => {
  const filtered = occupants?.filter((o) => o.status === status);
  if (filtered?.length === 0) return null;

  return (
    <Stack width={1} spacing={1} mb={1}>
      <Box flex={1} bgcolor={COLORS[status] || "secondary.light"}>
        <Typography variant="h6" flex={1} textAlign="center">
          {label.toUpperCase()}
        </Typography>
      </Box>

      {filtered?.map((occupant, index) => (
        <OccupantCard
          key={index}
          index={index}
          occupant={occupant}
          onUpdate={onUpdate}
        />
      ))}
      <Divider />
    </Stack>
  );
};

export default OccupantByStatus;
