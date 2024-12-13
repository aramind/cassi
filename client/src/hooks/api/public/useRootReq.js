import { constants as url } from "../../../constants/urls";
import useRequest from "../useRequest";

const useRootReq = ({ isPublic, showAck }) => {
  const request = useRequest({ isPublic, showAck });

  const req = {
    login: async ({ data }) => {
      return request({
        url: `${url}/login`,
        method: "POST",
        data,
      });
    },
  };

  return req;
};

export default useRootReq;
