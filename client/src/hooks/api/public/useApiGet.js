import { useQuery } from "react-query";
const useApiGet = (key, fn, options) => {
  useQuery({
    queryKey: key,
    queryFn: fn,
    ...options,
  });
};

export default useApiGet;
