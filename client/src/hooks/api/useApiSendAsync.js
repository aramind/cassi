import { useMutation, useQueryClient } from "react-query";

const useApiSendAsync = (fn, invalidateKey, options) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({ mutationFn: fn, retry: 0, ...options });

  const send = async (
    variables,
    { showSuccess = true, showError = true } = {}
  ) => {
    try {
      const res = await mutation.mutateAsync(variables);

      if (invalidateKey) {
        invalidateKey.forEach((key) => queryClient.invalidateQueries(key));
      }

      if (showSuccess) {
        alert(
          typeof showSuccess === "string" ? showSuccess : "Operation successful"
        );
      }

      return res;
    } catch (error) {
      if (showError) {
        alert(
          typeof showError === "string"
            ? showError
            : `Request failed: ${error?.message}`
        );
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
