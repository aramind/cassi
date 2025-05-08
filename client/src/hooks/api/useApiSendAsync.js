import { useMutation, useQueryClient } from "react-query";
import useAlerts from "../useAlerts";

const useApiSendAsync = (fn, invalidateKey, options) => {
  const queryClient = useQueryClient();
  const { showAutoHideAlert, showAckAlert } = useAlerts();

  const mutation = useMutation({ mutationFn: fn, retry: 0, ...options });

  const send = async (
    variables,
    { showFeedbackMsg = true, message = null } = {}
  ) => {
    try {
      const res = await mutation.mutateAsync(variables);

      if (invalidateKey) {
        invalidateKey.forEach((key) => queryClient.invalidateQueries(key));
      }

      if (showFeedbackMsg) {
        if (res?.success) {
          showAutoHideAlert(
            message || res?.message || "Operation successful.",
            "success"
          );
        } else {
          showAckAlert(
            message || res?.message || "Something went wrong.",
            "error"
          );
        }
      }

      return res;
    } catch (error) {
      if (showFeedbackMsg) {
        console.error(error);
        showAckAlert(`Request failed: ${error?.message}`, "error");
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
