import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

const TasksContainer = ({ tasks }) => {
  console.log(tasks);

  if (!tasks) return null;
  return (
    <Stack width={1} px={2} my={2}>
      {tasks?.map((t, i) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreRoundedIcon />}
            aria-controls={`panel${i}-content`}
            id={`panel${i}-header`}
          >
            <Typography variant="h6">{t?.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>{/* <TaskDetails /> */}</AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
};

export default TasksContainer;
