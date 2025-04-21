import React, { useMemo, useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Today from "../../components/Today";
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
import { Filter, Plus, Sort, UnFilterIcon } from "../../utils/muiIcons";
import FilterOptionsMenu from "./FilterOptionsMenu";
import { OPTIONS_FOR_FILTERS } from "../../constants/tasks";

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

const isMatchToFilters = (task, filters) => {
  return (
    (filters?.type?.length === 0 || filters?.type?.includes(task?.type)) &&
    (filters?.priority?.length === 0 ||
      filters?.priority?.includes(task?.priority)) &&
    (filters?.isCompleted?.length === 0 ||
      filters?.isCompleted?.includes(task?.isCompleted)) &&
    (filters?.isRecurring?.length === 0 ||
      filters?.isRecurring?.includes(task?.isRecurring))
  );
};
const TasksPage = () => {
  // states
  const [sortMethod, setSortMethod] = useState("DATE-NEWEST");
  const [filters, setFilters] = useState({
    type: [],
    priority: [],
    isCompleted: [],
    isRecurring: [],
  });
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

  const hasActiveFilters = Object.values(filters).some(
    (arr) => Array.isArray(arr) && arr.length > 0
  );
  // filter handlers
  const handleResetFilters = () =>
    setFilters((pv) => ({
      type: [],
      priority: [],
      isCompleted: [],
      isRecurring: [],
    }));

  const handleSelectAllFilters = () => setFilters((pv) => OPTIONS_FOR_FILTERS);

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

  const filteredTasks = activeTasks.filter((task) =>
    isMatchToFilters(task, filters)
  );
  const sortedFilteredTasks = getSortedTasks(filteredTasks, sortMethod);

  const sortMenuItems = useMemo(
    () => [
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
    ],
    []
  );

  // console logs

  // start of return
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
          alignItems="center"
        >
          <Button
            variant="contained"
            endIcon={<Plus />}
            sx={{ boxShadow: "none" }}
            onClick={() => handleOpenDialog("add", null)}
          >
            add
          </Button>
          <Box flex={1} />
          <ButtonGroup variant="outlined">
            <OptionsMenu
              button={
                <Button endIcon={<Sort />} variant="outlined">
                  sort
                </Button>
              }
              menuItems={sortMenuItems}
              width={1}
            />
            <FilterOptionsMenu
              button={
                <Button
                  endIcon={hasActiveFilters ? <Filter /> : <UnFilterIcon />}
                  variant={hasActiveFilters ? "contained" : "outlined"}
                  onClick={hasActiveFilters ? handleResetFilters : undefined}
                >
                  {hasActiveFilters ? "reset" : "filter"}
                </Button>
              }
              filters={filters}
              setFilters={setFilters}
              // menuItems={sortMenuItems}
              width={1}
              // disabled={true}
              handleResetFilters={handleResetFilters}
              handleSelectAllFilters={handleSelectAllFilters}
            />
          </ButtonGroup>
        </Stack>
        {sortedFilteredTasks?.length > 0 && (
          <TasksContainer
            {...props?.taskContainer}
            tasks={sortedFilteredTasks}
          />
        )}
        <br />
      </Stack>

      {renderConfirmActionDialog()}
      <TaskDialog {...props.dialog} />
    </BodyContainer>
  );
};

export default TasksPage;
