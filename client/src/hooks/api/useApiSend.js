import { useMutation, useQueryClient } from "react-query";

const useApiSend = (fn, invalidateKey, successFn, errorFn, options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: async (data) => {
      if (invalidateKey) {
        invalidateKey.forEach((key) => queryClient.invalidateQueries(key));
      }
      successFn && successFn(data);
    },
    onError: async (err) => {
      errorFn && errorFn(err);
    },
    retry: 0,
    ...options,
  });
};

export default useApiSend;
