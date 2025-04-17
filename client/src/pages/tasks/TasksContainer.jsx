import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

import TaskDetails from "./TaskDetails";
import { formatDate } from "../../utils/formatDate";

const TasksContainer = ({ tasks, handleUpdateTask }) => {
  const [doneTasks, setDoneTasks] = useState(
    Object.fromEntries(tasks.map((t) => [t._id, t.isCompleted]))
  );

  console.log(tasks);
  const handleCheckChange = (taskId, taskDetails) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    // console.log(`TASK ID: ${taskId}: status: ${e.target.checked}`);
    setDoneTasks((prev) => ({ ...prev, [taskId]: e.target.checked }));
    handleUpdateTask({
      id: taskId,
      updates: { isCompleted: e.target.checked },
    });
  };

  // console.log(doneTasks);
  if (!tasks) return null;
  return (
    <Stack width={1} px={2} my={2}>
      {tasks?.map((t, i) => (
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreRoundedIcon />}
            aria-controls={`panel${i}-content`}
            id={`panel${i}-header`}
          >
            <Stack
              spacing={1}
              direction="row"
              flexWrap="nowrap"
              justifyContent="flex-start"
              width={1}
              alignItems="center"
              //   py={1}
            >
              {/* TODO: TO SET UP */}
              <Stack>
                <Checkbox
                  checked={!!doneTasks[t._id]} // default to false
                  onChange={handleCheckChange(t._id, { ...t })}
                  onClick={(e) => e.stopPropagation()}
                  icon={<TripOriginIcon fontSize="small" color="primary" />}
                  checkedIcon={
                    <CheckCircleRoundedIcon fontSize="small" color="error" />
                  }
                />
              </Stack>
              <Stack height={1} width={1} justifyContent="center">
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    color={t?.isCompleted ? "error" : "primary.dark"}
                    sx={{
                      textDecoration: t?.isCompleted ? "line-through" : "none",
                    }}
                  >
                    {t?.title?.toUpperCase()}
                  </Typography>

                  {t?.priority && (
                    <Chip
                      variant="outlined"
                      color="warning"
                      //   sx={{ bgcolor: importanceColor[announcement?.importance] }}
                      label={t?.priority?.toUpperCase()}
                      size="small"
                    />
                  )}
                  {t?.status && (
                    <Chip
                      variant="outlined"
                      color="info"
                      //   sx={{ bgcolor: importanceColor[announcement?.importance] }}
                      label={t?.type?.toUpperCase()}
                      size="small"
                    />
                  )}
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <EventRoundedIcon fontSize="0.8rem" color="info" />
                  <Typography variant="narrowSmallText">
                    {formatDate(t?.dueDate)}
                  </Typography>
                  {t?.isRecurring && (
                    <Stack
                      direction="row"
                      spacing={0.5}
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <RepeatRoundedIcon color="info" fontSize="0.8rem" />
                      <Typography variant="narrowSmallText">
                        {t?.recurrenceRule}
                      </Typography>
                    </Stack>
                  )}
                  <Box flex={1}></Box>
                  <ButtonGroup sx={{ pr: "0.3rem" }}>
                    <IconButton size="small">
                      <ModeEditOutlineRoundedIcon fontSize="0.8rem" />
                    </IconButton>
                    <IconButton size="small">
                      <DeleteOutlineRoundedIcon fontSize="0.8rem" />
                    </IconButton>
                  </ButtonGroup>
                </Stack>
              </Stack>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <TaskDetails task={t} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
};

export default TasksContainer;
