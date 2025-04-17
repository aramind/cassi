import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";

import TaskDetails from "./TaskDetails";

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
              flexWrap="wrap"
              justifyContent="flex-start"
              //   className="outlined"
              width={1}
              alignItems="center"
              //   py={1}
            >
              {/* TODO: TO SET UP */}
              <Checkbox
                checked={!!doneTasks[t._id]} // default to false
                onChange={handleCheckChange(t._id, { ...t })}
                onClick={(e) => e.stopPropagation()}
                icon={<CircleOutlinedIcon />}
                checkedIcon={<CheckCircleRoundedIcon />}
              />
              <Typography variant="h6">{t?.title?.toUpperCase()}</Typography>
              {t?.status && (
                <Chip
                  variant="outlined"
                  color="info"
                  //   sx={{ bgcolor: importanceColor[announcement?.importance] }}
                  label={t?.status?.toUpperCase()}
                  size="small"
                />
              )}
              {t?.priority && (
                <Chip
                  variant="outlined"
                  color="error"
                  //   sx={{ bgcolor: importanceColor[announcement?.importance] }}
                  label={t?.priority?.toUpperCase()}
                  size="small"
                />
              )}
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
