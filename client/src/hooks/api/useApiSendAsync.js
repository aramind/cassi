import { useMutation, useQueryClient } from "react-query";
import useMinorAlert from "../useMinorAlert";

const useApiSendAsync = (fn, invalidateKey, options) => {
  const queryClient = useQueryClient();
  const { showAlert } = useMinorAlert();

  const mutation = useMutation({ mutationFn: fn, retry: 0, ...options });

  const send = async (
    variables,
    { showFeedbackMsg = false, message = null } = {}
  ) => {
    try {
      const res = await mutation.mutateAsync(variables);

      if (invalidateKey) {
        invalidateKey.forEach((key) => queryClient.invalidateQueries(key));
      }

      if (showFeedbackMsg) {
        if (res?.success) {
          showAlert(
            message || res?.message || "Operation successful.",
            "success"
          );
        } else {
          showAlert(
            message || res?.message || "Something went wrong.",
            "error"
          );
        }
      }

      return res;
    } catch (error) {
      if (showFeedbackMsg) {
        console.log(error);
        showAlert(`Request failed: ${error?.message}`, "error");
      }
      // throw error;
    }
  };

  return {
    send,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};

export default useApiSendAsync;
