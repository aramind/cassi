import { axiosBase } from "../../../api/axios";
import useAxiosPrivate from "../../useAxiosPrivate";

const useRequest = ({ isPublic, showAck }) => {
  const publicClient = axiosBase;
  const privateClient = useAxiosPrivate();

  const request = async (options) => {
    const onSuccess = async (res) => {
      // TODO: implement showing acknowledgement if ack comp is done
      if (showAck) {
        alert("request successful");
      }
      return res?.data;
    };

    const onError = async (err) => {
      // TODO: implement showing acknowledgement if ack comp is done
      if (showAck) {
        alert("Error occurred");
      }
      return err?.response?.data;
    };

    if (isPublic) {
      try {
        const res = await publicClient(options);
        return onSuccess(res);
      } catch (error) {
        return onError(error);
      }
    } else {
      try {
        const res = await privateClient(options);
        return onSuccess(res);
      } catch (error) {
        return onError(error);
      }
    }
  };

  return request;
};

export default useRequest;
