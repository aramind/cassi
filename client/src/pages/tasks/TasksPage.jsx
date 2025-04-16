import React from "react";
import BodyContainer from "../../containers/BodyContainer";
import { Stack } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import Today from "../../components/Today";
import MyButton from "../../components/buttons/MyButton";

const TasksPage = () => {
  const addTaskHandler = () => {
    alert("Adding a task...");
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
    </BodyContainer>
  );
};

export default TasksPage;
