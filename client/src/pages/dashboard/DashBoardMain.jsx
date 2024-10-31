import { Stack, Typography } from "@mui/material";
import React from "react";
import { getCurrentDay, getCurrentDate } from "../../utils/date";
import Board from "./Board";
import { useNavigate } from "react-router-dom";

const colors = ["primary", "accent", "secondary"];
const boards = [
  { text: "trackers" },
  { text: "tasks" },
  { text: "profile" },
  { text: "files" },
];
const DashBoardMain = () => {
  const navigate = useNavigate();
  return (
    <Stack>
      <Typography variant="h5">Hi! Happy {getCurrentDay}!</Typography>
      <Typography variant="h6">Today is {getCurrentDate}.</Typography>
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
              width="120px"
              bgcolor={colors[index % colors?.length]}
              onClickHandler={() => navigate(`/${board.text}`)}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

export default DashBoardMain;
