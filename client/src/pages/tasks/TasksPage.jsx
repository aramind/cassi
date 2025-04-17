import React, { useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Box, Stack, Typography } from "@mui/material";
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
  const [openDialog, setOpenDialog] = useState(false);

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

  const handleUpdateTask = ({ id, updates }) => {
    console.log("ID", id);
    console.log("UPDATES", updates);
    updateTask({ id, updates });
  };

  console.log(tasksData?.data);

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
          onClickHandler={addTaskHandler}
        />

        {tasksData?.data && (
          <TasksContainer
            tasks={tasksData?.data}
            handleUpdateTask={handleUpdateTask}
          />
        )}

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
