import useRequest from "../useRequest";
import urls from "../../../constants/urls";
import { useQueryClient } from "react-query";

const url = urls?.TRACKERS;

const useTrackerReq = ({ isPublic, showAck }) => {
  const request = useRequest({ isPublic, showAck });
  const queryClient = useQueryClient();
  // keys must be array of key(s)
  const invalidateQueries = (keys) => {
    queryClient.invalidateQueries(keys);
  };

  const refreshTrackers = () => invalidateQueries(["trackers"]);

  const req = {
    getTrackers: async (queryParams) =>
      request({
        url: `${url}?${queryParams}`,
        method: "GET",
      }),
    addTracker: async ({ data }) => {
      const res = request({
        url: `${url}/add`,
        method: "POST",
        data,
      });
      refreshTrackers();
      return res;
    },
    updateTracker: async ({ trackerId, data }) => {
      const res = request({
        url: `${url}/${trackerId}`,
        method: "PATCH",
        data,
      });
      refreshTrackers();
      return res;
    },
    hardDeleteTracker: async (trackerId) => {
      const res = request({
        url: `${url}/${trackerId}`,
        method: "DELETE",
      });
      refreshTrackers();
      return res;
    },
  };

  return req;
};

export default useTrackerReq;
