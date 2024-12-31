import useRequest from "../useRequest";
import urls from "../../../constants/urls";

const useHouseReq = ({ isPublic, showAck }) => {
  const request = useRequest({ isPublic, showAck });

  const req = {
    getHouseProfile: async (houseId) =>
      request({
        url: `${urls?.HOUSE}/profile/${houseId}`,
        method: "GET",
      }),
  };

  return req;
};

export default useHouseReq;
