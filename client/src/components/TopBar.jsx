import React from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const IconButtonWrapper = ({ onClick, children }) => {
  return (
    <IconButton size="small" onClick={onClick}>
      {children}
    </IconButton>
  );
};
const TopBar = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  return (
    <Stack
      width={1}
      // className="outlined"
      direction="row"
      justifyContent="flex-end"
      spacing={1}
    >
      <IconButtonWrapper>
        <SettingsOutlinedIcon onClick={() => navigate("/future-feature")} />
      </IconButtonWrapper>

      <IconButtonWrapper
        onClick={() => {
          setAuth({});
          localStorage.setItem("persist", false);
          navigate("/signin");
        }}
      >
        <LogoutOutlinedIcon />
      </IconButtonWrapper>
    </Stack>
  );
};

export default TopBar;
