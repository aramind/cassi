import urls from "../../../../constants/urls";
import useRequest from "../../useRequest";

const url = urls?.HOUSEOCCUPANT;

const useHouseOccupantReq = ({ isPublic, showAck }) => {
  const request = useRequest({ isPublic, showAck });

  const req = {
    addNewHouseOccupant: async ({ occupant }) =>
      request({
        url: `${url}/add`,
        method: "POST",
        data: occupant,
      }),
    getHouseOccupant: async (houseOccupantId) =>
      request({
        url: `${url}/${houseOccupantId}`,
        method: "GET",
      }),
    updateHouseOccupant: async ({ houseOccupantId, data }) =>
      request({
        url: `${url}/update/${houseOccupantId}`,
        method: "PATCH",
        data,
      }),

    deleteHouseOccupant: async (id) => {
      request({
        url: `${url}/${id}`,
        method: "DELETE",
      });
    },
  };

  return req;
};

export default useHouseOccupantReq;
