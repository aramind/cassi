import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
// import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
// import { formatDate } from "../../utils/formatDate";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
const TextWithIcon = ({
  icon = <DisabledByDefaultOutlinedIcon fontSize="small" />,
  text = "",
}) => (
  <Stack
    direction="row"
    spacing={0.5}
    justifyContent="flex-start"
    alignItems="center"
    // className="outlined"
  >
    {icon}
    <Typography>{text}</Typography>
  </Stack>
);
const TaskDetails = ({ task }) => {
  return (
    <>
      {" "}
      <Divider sx={{ mb: 1, borderBottomWidth: 2 }} />
      <Stack spacing={1} width={1} pl={1} mt={1} py={1}>
        {/* description */}
        <TextWithIcon
          icon={<DraftsOutlinedIcon fontSize="small" />}
          text={task?.description}
        />
        {/* date created */}
        {/* <TextWithIcon
          icon={<EventAvailableOutlinedIcon fontSize="small" />}
          text={formatDate(task?.createdAt)}
        /> */}

        {/* attachments */}
        <TextWithIcon
          icon={<AttachmentOutlinedIcon fontSize="small" />}
          text={task?.attachments?.join(";")}
        />
        {/* remarks */}

        <TextWithIcon
          icon={<FeedbackOutlinedIcon fontSize="small" />}
          text={task?.remarks?.join(" ; ")}
        />
      </Stack>
    </>
  );
};

export default TaskDetails;
