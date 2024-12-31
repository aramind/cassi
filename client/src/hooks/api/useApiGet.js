import { useQuery } from "react-query";
const useApiGet = (key, fn, options) => {
  console.log("CALLING USEAPIGET");
  return useQuery({
    queryKey: key,
    queryFn: fn,
    ...options,
  });
};

export default useApiGet;
