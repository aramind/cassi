import { axiosBase } from "../../api/axios";
import useAxiosPrivate from "../useAxiosPrivate";

const useRequest = ({ isPublic }) => {
  const publicClient = axiosBase;
  const privateClient = useAxiosPrivate();

  const request = async (options) => {
    const client = isPublic ? publicClient : privateClient;

    try {
      const res = await client(options);
      return res?.data;
    } catch (error) {
      throw error?.response?.data || error;
    }
  };

  return request;
};

export default useRequest;
