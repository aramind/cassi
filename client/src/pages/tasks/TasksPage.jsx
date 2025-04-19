import React from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Stack, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import useTaskReq from "../../hooks/api/authenticated/task/useTaskReq";
import useApiGet from "../../hooks/api/useApiGet";
import LoadingPage from "../LoadingPage";
import ErrorPage from "../ErrorPage";
import TasksContainer from "./TasksContainer";
import useDialogManager from "../../hooks/useDialogManager";
import TaskDialog from "./TaskDialog";


const getConfirmText = (type) => {
  const messages = {
    add: "Add this task?",
    update: "Continue?",
    delete: "Delete this task?",
  };
  return <Typography>{messages[type]}</Typography>;
};

const prepRemarks = (remarks) => {
  if (typeof remarks === "string") {
    return remarks.split("/")?.map((c) => c.trim())
  }
  if (Array.isArray(remarks)) {
    return remarks;
  }
  return [];
}
const TasksPage = () => {
  const {dialogState, handleOpenDialog, handleCloseDialog} = useDialogManager();

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

  const handleAddTask = (formData) => {
    handleConfirm("Add Task", getConfirmText("add"), () =>
      addTask({
        data: {
          task: {
            ...formData,
            remarks: prepRemarks(formData?.remarks),
          },
        },
      })
    );
    handleCloseDialog();
  };

  const handleUpdateTask = ({ id, updates, needsToConfirm = false }) => {
    if (needsToConfirm) {
      handleConfirm("Update Task", getConfirmText("update"), () =>
        updateTask({ id, updates })
      );
    } else {
      updateTask({ id, updates });
    }
    handleCloseDialog();
  };

  // props
  const props = {
    myButton: {
      type: "accent",
      text: "add",
      variant: "contained",
      onClickHandler: () => handleOpenDialog("add", null),
    },
    taskContainer: {
      tasks: tasksData?.data,
      handleUpdateTask,
      handleOpenDialog,
    },
    dialog: {
      ...dialogState,
      handleCloseDialog: handleCloseDialog,
      submitHandler:
        dialogState?.action === "add" ? handleAddTask : handleUpdateTask,
    },
  };

  console.log(tasksData?.data)

  const activeTasks = Array.isArray(tasksData?.data) ? tasksData?.data?.filter(t => t.status === "active") : []
  const deletedTasks = Array.isArray(tasksData?.data) ? tasksData?.data?.filter(t => t.status === "deleted") : []
  if (isLoadingInFetchingTasks) return <LoadingPage />;
  if (isErrorInFetchingTasks) return <ErrorPage />;
  return (
    <BodyContainer justifyContent="flex-start">
      <Stack mt={2} alignItems="center" width={1} pb={2}>
        <PageHeader text="tasks" />
        <Today />
        <br />
        <MyButton {...props?.myButton} />
        {activeTasks?.length > 0 && <TasksContainer {...props?.taskContainer} />}
        <br />
        <MyButton {...props?.myButton} />
        <br />
        {deletedTasks?.length > 0 && 
        <>
        <Typography>DELETED</Typography>
        <TasksContainer {...props?.taskContainer} />
        </>}
        <br />
      </Stack>
      
      {renderConfirmActionDialog()}
      <TaskDialog {...props.dialog} />
    </BodyContainer>
  );
};

export default TasksPage;
