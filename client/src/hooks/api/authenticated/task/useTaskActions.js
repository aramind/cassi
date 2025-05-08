import { getConfirmText } from "../../../../utils/dialogUtils";
import useConfirmActionDialog from "../../../useConfirmActionDialog";
import useApiGet from "../../useApiGet";
import useApiSendAsync from "../../useApiSendAsync";
import useTaskReq from "./useTaskReq";
import { prepRemarks } from "../../../../utils/taskUtils";

const useTaskActions = ({ handleCloseDialog }) => {
  const { handleOpen: handleConfirm, renderConfirmActionDialog } =
    useConfirmActionDialog();

  const { addTask, getTasks, updateTask, softDelete } = useTaskReq({
    isPublic: false,
    showAck: false,
  });

  const { send: sendAdd, isLoadingInAdding } = useApiSendAsync(addTask, [
    "tasks",
  ]);

  const { send: sendUpdate, isLoadingInUpdate } = useApiSendAsync(updateTask, [
    "tasks",
  ]);

  const { send: sendSoftDelete, isLoadingInSoftDelete } = useApiSendAsync(
    softDelete,
    ["tasks"]
  );

  //   util function
  const closeDialog = (willClose) => {
    if (willClose) handleCloseDialog();
  };
  //actions
  const add = (taskData) => {
    handleConfirm("Add Task", getConfirmText("add", "task"), async () => {
      try {
        const res = await sendAdd({
          data: {
            task: { ...taskData, remarks: prepRemarks(taskData?.remarks) },
          },
        });

        closeDialog(res?.success);
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
        closeDialog(res?.success);
      } catch (error) {
        console.error(error);
      }
    });
  };

  const softDel = (id) => {
    handleConfirm(
      "Delete",
      "Are you sure you want to delete this task?",
      async () => {
        try {
          const res = await sendSoftDelete(id);

          if (res?.success) {
            handleCloseDialog();
          }
        } catch (error) {}
      }
    );
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

  const isLoading =
    isLoadingInFetchingTasks ||
    isLoadingInAdding ||
    isLoadingInUpdate ||
    isLoadingInSoftDelete;
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
