import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { getCurrentDay } from "../../utils/date";
import Board from "./Board";
import { useNavigate } from "react-router-dom";
import BodyContainer from "../../containers/BodyContainer";
import Today from "../../components/Today";
import AnimatedBorderTrail from "../../components/AnimatedBorderTrail";
import useRefreshToken from "../../hooks/useRefreshToken";

import useAuth from "../../hooks/useAuth";

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
const boards = [
  { text: "announcements" },
  { text: "trackers" },
  { text: "tasks" },
  { text: "profile" },
  { text: "dues" },
  { text: "files" },
];

const getItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const DashBoardMain = () => {
  const navigate = useNavigate();
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  return (
    <BodyContainer justifyContent="flex-start" withTopBar={true}>
      <Stack
        width={1}
        height={1}
        pt={{ xs: "2rem" }}
        alignItems="center"
        // className="outlined"
      >
        <Stack direction="row">
          <Typography variant="h5" color="primary.dark">
            {getItem(greetings)}!
          </Typography>
          <Typography variant="h5">
            {getItem(waveEmojis)} Happy {getCurrentDay}!{getItem(randomEmojis)}
          </Typography>
        </Stack>
        <Today />
        <Box height="4rem" />
        <Button onClick={() => refresh()}>
          {" "}
          {`Refresh user ${auth?.houseInfo?.name}`}
        </Button>
        <AnimatedBorderTrail duration="5s" trailColor="green" trailSize="lg">
          <Typography variant="h6" textAlign="center">
            What do you wan't us to check?🤔
          </Typography>
        </AnimatedBorderTrail>

        <br />
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={2}
          justifyContent="center"
          alignItems="center"
        >
          {boards?.map((board, index) => {
            return (
              <Board
                key={index}
                text={board.text}
                width={{ xs: "40vw", md: "200px" }}
                bgcolor={colors[index % colors?.length]}
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
