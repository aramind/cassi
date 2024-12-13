import urls from "../../../constants/urls";
import useRequest from "../useRequest";

const useRootReq = ({ isPublic, showAck }) => {
  const request = useRequest({ isPublic, showAck });

  const req = {
    login: async ({ data }) => {
      return request({
        url: `${urls?.ROOT}/auth/login`,
        method: "POST",
        data,
      });
    },
    signup: async ({ data }) => {
      return request({
        url: `${urls?.ROOT}/auth/signup`,
        method: "POST",
        data,
      });
    },
  };

  return req;
};

export default useRootReq;
