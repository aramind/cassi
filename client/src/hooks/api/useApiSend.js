import { useMutation, useQueryClient } from "react-query";
import useMinorAlert from "../useMinorAlert";

const useApiSend = (fn, invalidateKey, successFn, errorFn, options) => {
  const queryClient = useQueryClient();
  const { showAlert } = useMinorAlert();

  return useMutation({
    mutationFn: fn,
    onSuccess: async (data) => {
      if (invalidateKey) {
        invalidateKey.forEach((key) => queryClient.invalidateQueries(key));
      }
      successFn && successFn(data);
      showAlert("Operation successful.", "success", 3000);
    },
    onError: async (err) => {
      errorFn && errorFn(err);
      showAlert(`Error in request : ${err?.message}`, "error", 3000);
    },
    retry: 0,
    ...options,
  });
};

export default useApiSend;
