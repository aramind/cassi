import useApiGet from "../../useApiGet";
import useTaskReq from "./useTaskReq";

const useTaskActions = () => {
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

  const isLoading = isLoadingInFetchingTasks;
  const isError = isErrorInFetchingTasks;

  return {
    tasksData,
    isLoading,
    isError,
  };
};

export default useTaskActions;
