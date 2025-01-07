import { axiosBase } from "../../api/axios";
import useAxiosPrivate from "../useAxiosPrivate";

const useRequest = ({ isPublic, showAck }) => {
  const publicClient = axiosBase;
  const privateClient = useAxiosPrivate();

  console.log("IN USE USEREQUEST ");
  const request = async (options) => {
    const onSuccess = async (res) => {
      // TODO: implement showing acknowledgement if ack comp is done
      if (showAck) {
        console.log("request successful");
      }
      console.log("ON SUCCESS", res);
      return res?.data;
    };

    const onError = async (err) => {
      // TODO: implement showing acknowledgement if ack comp is done
      if (showAck) {
        console.log("Error occurred");
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
        console.log("IN PUBLIC REQ CLIENT");
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
