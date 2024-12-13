import React from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Stack } from "@mui/material";

const TopBar = () => {
  return (
    <Stack
      width={1}
      //   className="outlined"
      direction="row"
      justifyContent="flex-end"
      spacing={2}
      mb={1}
      pr={1}
    >
      <SettingsOutlinedIcon />
      <LogoutOutlinedIcon />
    </Stack>
  );
};

export default TopBar;
