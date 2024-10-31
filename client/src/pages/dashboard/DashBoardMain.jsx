import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { getCurrentDay, getCurrentDate } from "../../utils/date";
import Board from "./Board";
import { useNavigate } from "react-router-dom";
import BodyContainer from "../../containers/BodyContainer";

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

  return (
    <BodyContainer justifyContent="flex-start">
      <Stack width={1} height={1} pt={{ xs: "2rem" }} alignItems="center">
        <Stack direction="row">
          <Typography variant="h5" color="primary.dark">
            {getItem(greetings)}!
          </Typography>
          <Typography variant="h5">
            {getItem(waveEmojis)} Happy {getCurrentDay}!{getItem(randomEmojis)}
          </Typography>
        </Stack>
        <Typography variant="h6">Today is {getCurrentDate}.📅</Typography>
        <Box height="4rem" />
        <Typography variant="h6">What do you wan't us to check?🤔</Typography>
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
