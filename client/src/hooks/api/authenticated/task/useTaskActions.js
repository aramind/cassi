import { getConfirmText } from "../../../../utils/dialogUtils";
import useConfirmActionDialog from "../../../useConfirmActionDialog";
import useApiGet from "../../useApiGet";
import useApiSendAsync from "../../useApiSendAsync";
import useTaskReq from "./useTaskReq";
import { prepRemarks } from "../../../../utils/taskUtils";

const useTaskActions = ({ handleCloseDialog }) => {
  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  const { addTask, getTasks, updateTask } = useTaskReq({
    isPublic: false,
    showAck: false,
  });

  const { send: sendAdd, isLoadingInAdding } = useApiSendAsync(addTask, [
    "tasks",
  ]);

  const { send: sendUpdate, isLoadingInUpdate } = useApiSendAsync(updateTask, [
    "tasks",
  ]);
  const add = (taskData) => {
    handleConfirm("Add Task", getConfirmText("add", "task"), async () => {
      try {
        const res = await sendAdd(
          {
            data: {
              task: { ...taskData, remarks: prepRemarks(taskData?.remarks) },
            },
          },
          { showFeedbackMsg: true }
        );

        if (res?.success) {
          handleCloseDialog();
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  const update = ({ id, updates }) => {
    handleConfirm("Update", getConfirmText("update", "task"), async () => {
      try {
        const res = await sendUpdate(
          { id, updates },
          { showFeedbackMsg: true }
        );

        if (res?.success) {
          handleCloseDialog();
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  //   fetch tasks
  const {
    data: tasksData,
    isLoading: isLoadingInFetchingTasks,
    isError: isErrorInFetchingTasks,
  } = useApiGet(["tasks"], () =>
    getTasks(
      "?fields=_id,title,description,type,status,isCompleted,priority,dueDate,attachments,remarks,isRecurring,recurrenceRule,comments,createdAt,updatedAt"
    )
  );

  const isLoading = isLoadingInFetchingTasks || isLoadingInAdding;
  const isError = isErrorInFetchingTasks;

  const confirmHandlers = {
    add,
    update,
  };
  return {
    tasks: tasksData?.data,
    confirmHandlers,
    isLoading,
    isError,
    renderConfirmActionDialog,
  };
};

export default useTaskActions;
