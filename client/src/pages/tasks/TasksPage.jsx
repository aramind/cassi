import React, { useMemo, useState } from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Box, Button, ButtonGroup, Stack } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Today from "../../components/Today";
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
import useTaskActions from "../../hooks/api/authenticated/task/useTaskActions";
import { getSortedTasks, isMatchToFilters } from "../../utils/taskUtils";
import NothingImage from "../../components/NothingImage";

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

  const {
    tasks,
    isLoading,
    isError,
    confirmHandlers,
    updateWithOutConfirm,
    renderConfirmActionDialog,
  } = useTaskActions({
    handleCloseDialog,
  });

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
      handleOpenDialog,
      confirmHandlers,
    },
    dialog: {
      ...dialogState,
      handleCloseDialog: handleCloseDialog,
      submitHandler:
        dialogState?.action === "add"
          ? confirmHandlers?.add
          : confirmHandlers?.update,
    },
  };

  const activeTasks = filterArrByStatus(tasks, "active");
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
  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  return (
    <BodyContainer justifyContent="flex-start">
      <Box
        // display={{ xs: "none", md: "flex" }}
        sx={{
          position: "fixed",
          top: "50%",
          left: "2rem",
          transform: "translateY(-50%)",
          height: "fit-content",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          width: "250px",
          p: 2,
          zIndex: 1,
        }}
      >
        <Today />
        <br />
        <Button
          variant="contained"
          // endIcon={<Plus />}
          sx={{ boxShadow: "none", fontSize: "2rem" }}
          onClick={() => handleOpenDialog("add", null)}
          fullWidth
        >
          ADD +
        </Button>
      </Box>
      <Box
        display={{ xs: "none", md: "block" }}
        sx={{
          position: "fixed",
          top: "50%",
          right: "2rem",
          transform: "translateY(-50%)",
          alignSelf: "flex-start",
          height: "fit-content",

          width: "250px",
          p: 2,
          zIndex: 1,
        }}
      >
        <Stack spacing={2}>
          <OptionsMenu
            button={
              <Button endIcon={<Sort />} variant="outlined" fullWidth>
                sort
              </Button>
            }
            menuItems={sortMenuItems}
            width={1}
          />
          <FilterOptionsMenu
            button={
              <Button
                fullWidth
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
        </Stack>
      </Box>
      <Stack mt={2} alignItems="center" width={{ xs: 1, md: "50%" }} pb={2}>
        <PageHeader text="tasks" />
        <Today />
        <br />
        <Stack
          direction="row"
          justifyContent="space-between"
          width={1}
          spacing={2}
          alignItems="center"
          display={{ md: "none" }}
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
        {sortedFilteredTasks?.length > 0 ? (
          <TasksContainer
            updateWithOutConfirm={updateWithOutConfirm}
            {...props?.taskContainer}
            tasks={sortedFilteredTasks}
          />
        ) : (
          <NothingImage />
        )}
        <br />
      </Stack>

      {renderConfirmActionDialog()}
      <TaskDialog {...props.dialog} />
    </BodyContainer>
  );
};

export default TasksPage;
