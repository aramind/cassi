import React from "react";
import { useNavigate } from "react-router-dom";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";

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
  const navigate = useNavigate();
  return (
    <SpeedDial
      ariaLabel="SpeedDial openIcon example"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      icon={<SpeedDialIcon icon={<MenuRoundedIcon />} />}
    >
      {links.map((link) => (
        <SpeedDialAction
          key={link.name}
          icon={link.icon}
          tooltipTitle={link.name}
          onClick={() => navigate(link.link)}
        />
      ))}
    </SpeedDial>
  );
};

export default NavDial;
