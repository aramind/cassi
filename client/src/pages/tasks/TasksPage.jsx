import React, { useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Stack, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";
import TaskDialog from "./TaskDialog";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import useTaskReq from "../../hooks/api/authenticated/task/useTaskReq";

const TasksPage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  const { addTask } = useTaskReq({ isPublic: false, showAck: false });

  const addTaskHandler = () => {
    setOpenDialog(true);
  };

  const handleConfirmAdd = (formData) => {
    handleConfirm("Add Task", <Typography>Add this task?</Typography>, () =>
      addTask({
        data: {
          task: {
            ...formData,
            remarks: formData?.remarks?.split("/")?.map((c) => c.trim()),
          },
        },
      })
    );
    setOpenDialog(false);
  };
  return (
    <BodyContainer justifyContent="flex-start">
      <Stack mt={2} alignItems="center" width={1} pb={2}>
        <PageHeader text="tasks" />
        <Today />
        <br />
        <MyButton
          type="accent"
          text="add"
          variant="contained"
          onClickHandler={addTaskHandler}
        />
        <br />
        <MyButton
          type="accent"
          text="add"
          variant="contained"
          onClickHandler={addTaskHandler}
        />
      </Stack>
      <TaskDialog
        open={openDialog}
        setOpen={setOpenDialog}
        action="add"
        submitHandler={handleConfirmAdd}
      />
      {renderConfirmActionDialog()}
    </BodyContainer>
  );
};

export default TasksPage;
