import React, { useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Box, Button, Stack, Typography } from "@mui/material";
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
import { filterArrByStatus } from "../../utils/filterArrByStatus";
import OptionsMenu from "../../components/OptionsMenu";
import { Sort } from "../../utils/muiIcons";

const getConfirmText = (type) => {
  const messages = {
    add: "Add this task?",
    update: "Continue?",
    delete: "Delete this task?",
  };
  return <Typography>{messages[type]}</Typography>;
};

const PRIORITY_MAP = {
  low: 1,
  medium: 2,
  high: 3,
};

const prepRemarks = (remarks) => {
  if (typeof remarks === "string") {
    return remarks.split("/")?.map((c) => c.trim());
  }
  if (Array.isArray(remarks)) {
    return remarks;
  }
  return [];
};

const getSortedTasks = (tasks, method) => {
  if (!tasks || !Array.isArray(tasks)) return [];

  const sorted = [...tasks];

  switch (method) {
    case "DATE-NEWEST":
      return sorted.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
    case "DATE-OLDEST":
      return sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    case "PRIORITY-HIGHEST":
      return sorted.sort(
        (a, b) => PRIORITY_MAP[b.priority] - PRIORITY_MAP[a.priority]
      );
    case "PRIORITY-LOWEST":
      return sorted.sort(
        (a, b) => PRIORITY_MAP[a.priority] - PRIORITY_MAP[b.priority]
      );
    case "NAME-ASC":
      return sorted.sort((a, b) => a.title?.localeCompare(b.title));
    case "NAME-DES":
      return sorted.sort((a, b) => b.title?.localeCompare(a.title));
    default:
      return sorted;
  }
};
const TasksPage = () => {
  const [sortMethod, setSortMethod] = useState("DATE-NEWEST");

  // hooks
  const { dialogState, handleOpenDialog, handleCloseDialog } =
    useDialogManager();

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

  const handleUpdateTask = ({
    id,
    updates,
    needsToConfirm = false,
    actionToConfirm = "update",
  }) => {
    if (needsToConfirm) {
      handleConfirm("Update Task", getConfirmText(actionToConfirm), () =>
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

  const activeTasks = filterArrByStatus(tasksData?.data, "active");
  // const deletedTasks = filterArrByStatus(tasksData?.data, "deleted")
  // const cancelledTasks = filterArrByStatus(tasksData?.data, "cancelled")

  const sortedTasks = getSortedTasks(activeTasks, sortMethod);
  console.log(sortMethod);

  const sortMenuItems = [
    {
      label: "by date (newest first)",
      onClick: () => setSortMethod((pv) => "DATE-NEWEST"),
    },
    {
      label: "by date (oldest first)",
      onClick: () => setSortMethod((pv) => "DATE-OLDEST"),
    },
    {
      label: "by priority (highest first)",
      onClick: () => setSortMethod((pv) => "PRIORITY-HIGHEST"),
    },
    {
      label: "by priority (lowest first)",
      onClick: () => setSortMethod((pv) => "PRIORITY-LOWEST"),
    },
    {
      label: "by name (A to Z)",
      onClick: () => setSortMethod((pv) => "NAME-ASC"),
    },
    {
      label: "by name (Z to A)",
      onClick: () => setSortMethod((pv) => "NAME-DESC"),
    },
  ];

  if (isLoadingInFetchingTasks) return <LoadingPage />;
  if (isErrorInFetchingTasks) return <ErrorPage />;

  return (
    <BodyContainer justifyContent="flex-start">
      <Stack mt={2} alignItems="center" width={1} pb={2}>
        <PageHeader text="tasks" />
        <Today />
        <br />
        <Stack
          direction="row"
          justifyContent="space-between"
          width={1}
          spacing={2}
        >
          <MyButton {...props?.myButton} width={1} />
          <OptionsMenu
            text={
              <Stack direction="row" spacing={0.5}>
                <Box>sort</Box>
                <Sort />
              </Stack>
            }
            menuItems={sortMenuItems}
            width={1}
          />
          <Button>filter</Button>
        </Stack>
        {sortedTasks?.length > 0 && (
          <TasksContainer {...props?.taskContainer} tasks={sortedTasks} />
        )}
        <br />
        <MyButton {...props?.myButton} />
        {/* <br />
        {cancelledTasks?.length > 0 && 
        <>
        <Typography>CANCELLED</Typography>
        <TasksContainer {...props?.taskContainer} tasks={cancelledTasks} />
        </>}
        {deletedTasks?.length > 0 && 
        <>
        <Typography>DELETED</Typography>
        <TasksContainer {...props?.taskContainer} tasks={deletedTasks} />
        </>}
        <br /> */}
      </Stack>

      {renderConfirmActionDialog()}
      <TaskDialog {...props.dialog} />
    </BodyContainer>
  );
};

export default TasksPage;
