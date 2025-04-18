import React, { useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Stack, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";
import TaskDialog from "./TaskDialog";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import useTaskReq from "../../hooks/api/authenticated/task/useTaskReq";
import useApiGet from "../../hooks/api/useApiGet";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import TasksContainer from "./TasksContainer";

const TasksPage = () => {
  const [dialogState, setDialogState] = useState({
    open: false,
    action: "add",
    task: null,
  });

  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  const { addTask, getTasks, updateTask } = useTaskReq({
    isPublic: false,
    showAck: false,
  });

  const {
    data: tasksData,
    isLoading: isLoadingInFetchingTasks,
    isError: isErrorInFetchingTasks,
  } = useApiGet(["tasks"], () =>
    getTasks(
      "?fields=_id,title,description,type,status,isCompleted,priority,dueDate,attachments,remarks,isRecurring,recurrenceRule,comments,createdAt,updatedAt"
    )
  );

  // handlers

  const handleOpenDialog = (action, task = null) => {
    setDialogState({ open: true, action, task });
  };

  const handleCloseDialog = () => {
    setDialogState({ open: false, action: null, task: null });
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
    handleCloseDialog();
  };

  const handleUpdateTask = ({ id, updates, needsToConfirm = false }) => {
    if (needsToConfirm) {
      handleConfirm("Update Task", <Typography>Continue?</Typography>, () =>
        updateTask({ id, updates })
      );
    } else {
      updateTask({ id, updates });
    }
    handleCloseDialog();
  };

  // props
  const dialogProps = {
    ...dialogState,
    handleCloseDialog: handleCloseDialog,
    submitHandler:
      dialogState?.action === "add" ? handleConfirmAdd : handleUpdateTask,
  };

  if (isLoadingInFetchingTasks) return <LoadingPage />;
  if (isErrorInFetchingTasks) return <ErrorPage />;
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
          onClickHandler={() => handleOpenDialog("add")}
        />
        {tasksData?.data && (
          <TasksContainer
            tasks={tasksData?.data}
            handleUpdateTask={handleUpdateTask}
            handleOpenDialog={handleOpenDialog}
          />
        )}

        <br />
        <MyButton
          type="accent"
          text="add"
          variant="contained"
          onClickHandler={() => handleOpenDialog("add")}
        />
      </Stack>
      <TaskDialog {...dialogProps} />
      {renderConfirmActionDialog()}
    </BodyContainer>
  );
};

export default TasksPage;
