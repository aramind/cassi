import { useMutation, useQueryClient } from "react-query";
import useMinorAlert from "../useMinorAlert";

const useApiSendAsync = (fn, invalidateKey, options) => {
  const queryClient = useQueryClient();
  const { showAlert } = useMinorAlert();

  const mutation = useMutation({ mutationFn: fn, retry: 0, ...options });

  const send = async (variables, { showFeedbackMsg = false } = {}) => {
    try {
      const res = await mutation.mutateAsync(variables);

      if (invalidateKey) {
        invalidateKey.forEach((key) => queryClient.invalidateQueries(key));
      }

      if (showFeedbackMsg) {
        if (res?.success) {
          showAlert(res?.message || "Operation successful.", "success");
        } else {
          showAlert(res?.message || "Something went wrong.", "error");
        }
      }

      return res;
    } catch (error) {
      if (showFeedbackMsg) {
        showAlert(`Request failed: ${error?.message}`, "error");
      }
      throw error;
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
