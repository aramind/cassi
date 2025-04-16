import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SignalCellularAlt1BarRoundedIcon from "@mui/icons-material/SignalCellularAlt1BarRounded";
import SignalCellularAlt2BarRoundedIcon from "@mui/icons-material/SignalCellularAlt2BarRounded";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import TaskDetails from "./TaskDetails";

const PRIORITY_ICONS = {
  //   low: <SignalCellularAlt1BarRoundedIcon />,
  //   medium: <SignalCellularAlt2BarRoundedIcon />,
  //   high: <SignalCellularAltRoundedIcon />,
};
const TasksContainer = ({ tasks }) => {
  console.log(tasks);

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
              //   py={1}
            >
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
