import React, { useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Stack, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";
import TaskDialog from "./TaskDialog";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";

const TasksPage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();
  const addTaskHandler = () => {
    alert("Adding a task...");
    setOpenDialog(true);
  };

  const dummySubmittingTask = () => {
    alert("Submitting task...");
  };
  const handleConfirmAdd = () => {
    handleConfirm("Add Task", <Typography>Add this task?</Typography>, () =>
      dummySubmittingTask()
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
