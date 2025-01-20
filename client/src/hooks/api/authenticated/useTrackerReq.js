import useRequest from "../useRequest";
import urls from "../../../constants/urls";

const url = urls?.TRACKERS;

const useTrackerReq = ({ isPublic, showAck }) => {
  const request = useRequest({ isPublic, showAck });

  const req = {
    getTrackers: async (queryParams) =>
      request({
        url: `${url}?${queryParams}`,
        method: "GET",
      }),
    addTracker: async ({ data }) => {
      request({
        url: `${url}/add`,
        method: "POST",
        data,
      });
    },
  };

  return req;
};

export default useTrackerReq;
