import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { getCurrentDay } from "../../utils/date";
import Board from "./Board";
import { useNavigate } from "react-router-dom";
import BodyContainer from "../../containers/BodyContainer";
import Today from "../../components/Today";
import {
  AnnouncementIcon,
  DuesIcon,
  FileIcon,
  ProfileIcon,
  TaskIcon,
  TrackerIcon,
} from "../../utils/muiIcons";
import useIsDesktop from "../../hooks/useIsDesktop";

const randomEmojis = ["🪴", "🌻", "🌞", "🌈", "🌟 ", "🥳", "☕", "🐦"];
const waveEmojis = ["👋🏻", "👋🏼", "👋🏽", "👋🏾", "👋🏿"];
const greetings = [
  "Hi",
  "Hello",
  "Ola",
  "Hey",
  "Howdy",
  "Yo",
  "Hiya",
  "Bonjour",
  "Hola",
];
const colors = ["primary", "accent", "secondary"];
// const iconColors = ["error.main", "info.main", "warning.main"];
const boards = [
  {
    text: "announcements",
    icon: <AnnouncementIcon />,
  },
  { text: "trackers", icon: <TrackerIcon /> },
  { text: "tasks", icon: <TaskIcon /> },
  { text: "profile", icon: <ProfileIcon /> },
  { text: "dues", icon: <DuesIcon /> },
  { text: "files", icon: <FileIcon /> },
];

const getItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const DashBoardMain = () => {
  const navigate = useNavigate();

  const isDesktop = useIsDesktop();

  const greetingSize = isDesktop ? "h3" : "h5";
  const subtextSize = isDesktop ? "h4" : "h6";
  return (
    <BodyContainer justifyContent="flex-start" withTopBar={true}>
      <Stack
        width={1}
        height={1}
        pt={{ xs: "1rem" }}
        px={{ md: "2rem" }}
        alignItems="center"
        direction={{ xs: "column", md: "row" }}
      >
        <Stack alignItems="center" flex={1} spacing={{ md: 2 }}>
          <Stack direction="row">
            <Typography variant={greetingSize} color="primary.dark">
              {getItem(greetings)}!
            </Typography>
            <Typography variant={greetingSize}>
              {getItem(waveEmojis)} Happy {getCurrentDay}!
              {getItem(randomEmojis)}
            </Typography>
          </Stack>
          <Today />
          <Typography variant={subtextSize} textAlign="center">
            What do you wan't us to check?🤔
          </Typography>
        </Stack>
        <br />
        {/* <Box height="4rem" /> */}
        {/* <Button onClick={() => refresh()}>
          {" "}
          {`Refresh user ${auth?.houseInfo?.name}`}
        </Button> */}

        <br />
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={2}
          justifyContent="center"
          alignItems="center"
          flex={2}
        >
          {boards?.map((board, index) => {
            return (
              <Board
                key={index}
                text={board?.text}
                icon={board?.icon}
                width={{ xs: "40vw", md: "200px" }}
                bgcolor={colors[index % colors?.length]}
                // iconColor={iconColors[index % iconColors?.length]}
                onClickHandler={() => navigate(`/${board.text}`)}
              />
            );
          })}
        </Stack>
      </Stack>
    </BodyContainer>
  );
};

export default DashBoardMain;
