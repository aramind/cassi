import urls from "../../../constants/urls";
import useRequest from "../useRequest";

const useHouseOccupantReq = ({ isPublic, showAck }) => {
  const request = useRequest({ isPublic, showAck });

  const req = {
    addNewHouseOccupant: async ({ occupant }) =>
      request({
        url: `${urls?.HOUSEOCCUPANT}/add`,
        method: "POST",
        data: occupant,
      }),
  };

  return req;
};

export default useHouseOccupantReq;
