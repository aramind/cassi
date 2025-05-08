import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ButtonGroup,
  Checkbox,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  CheckIcon,
  DeleteIcon,
  DotIcon,
  EditIcon,
  EventIcon,
  ExpandMoreIcon,
  RepeatIcon,
} from "../../utils/muiIcons";
import TaskDetails from "./TaskDetails";
import { formatDate } from "../../utils/formatDate";

const TasksContainer = ({
  tasks,
  handleUpdateTask,
  handleOpenDialog,
  confirmHandlers,
}) => {
  const [doneTasks, setDoneTasks] = useState(
    Object.fromEntries(tasks.map((t) => [t._id, t.isCompleted]))
  );

  const handleCheckChange = (taskId) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDoneTasks((prev) => ({ ...prev, [taskId]: e.target.checked }));
    handleUpdateTask({
      id: taskId,
      updates: { isCompleted: e.target.checked },
    });
  };

  if (!tasks) return null;

  return (
    <Stack width={1} my={2}>
      {tasks?.map((t, i) => (
        <Accordion key={t?._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
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
                  onChange={handleCheckChange(t._id)}
                  onClick={(e) => e.stopPropagation()}
                  icon={<DotIcon fontSize="small" color="primary" />}
                  checkedIcon={<CheckIcon fontSize="small" color="error" />}
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
                  <EventIcon fontSize="0.8rem" color="info" />
                  <Typography variant="narrowSmallText">
                    {formatDate(t?.dueDate) || "At any time"}
                  </Typography>
                  {t?.isRecurring && (
                    <Stack
                      direction="row"
                      spacing={0.5}
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <RepeatIcon color="info" fontSize="0.8rem" />
                      <Typography variant="narrowSmallText">
                        {t?.recurrenceRule}
                      </Typography>
                    </Stack>
                  )}
                  <Box flex={1}></Box>
                  <ButtonGroup sx={{ pr: "0.3rem" }}>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDialog("update", t);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmHandlers?.softDel(t?._id);
                      }}
                    >
                      <DeleteIcon fontSize="0.8rem" />
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
