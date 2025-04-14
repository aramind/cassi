import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Fab, Stack, Tooltip, Zoom } from "@mui/material";

// announcements, trackers, tasks, profile, dues, files,

const links = [
  { name: "dashboard", icon: <DashboardRoundedIcon />, link: "/dashboard" },
  {
    name: "announcements",
    icon: <CampaignRoundedIcon />,
    link: "/announcements",
  },
  { name: "trackers", icon: <AssignmentRoundedIcon />, link: "/trackers" },
  { name: "tasks", icon: <ChecklistRoundedIcon />, link: "/tasks" },
  { name: "profile", icon: <AccountBoxRoundedIcon />, link: "/profile" },
  { name: "dues", icon: <CalendarMonthRoundedIcon />, link: "/dues" },
  { name: "files", icon: <InsertDriveFileRoundedIcon />, link: "/files" },
];

const NavDial = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Stack
      justifyContent="flex-end"
      sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1300 }}
    >
      {/* Action Grid */}
      {open && (
        <Zoom in={open}>
          <Box
            sx={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "repeat(3, 56px)",
              gap: 1,
              justifyContent: "end",
              mb: 1,
              borderRadius: 6,
              p: 2,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: (theme) => theme.palette.primary.light,
                opacity: 0.3, // Opacity only for background
                borderRadius: 6,
                zIndex: -1, // Ensure it's behind the content
              }}
            />
            {links.map((link) => (
              <Tooltip key={link.name} title={link.name} placement="top">
                <Fab
                  size="small"
                  onClick={() => {
                    // setOpen(false);
                    navigate(link.link);
                  }}
                  sx={{
                    bgcolor: (theme) => theme.palette.accent.light,
                    opacity: 0.8,
                  }}
                >
                  {link.icon}
                </Fab>
              </Tooltip>
            ))}
          </Box>
        </Zoom>
      )}

      {/* Main FAB */}
      <Stack justifyContent="flex-end" direction="row">
        <Fab color="primary" onClick={() => setOpen(!open)}>
          {open ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
        </Fab>
      </Stack>
    </Stack>
  );
};

export default NavDial;
