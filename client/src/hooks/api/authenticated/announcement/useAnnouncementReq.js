import { useQueryClient } from "react-query";
import urls from "../../../../constants/urls";
import useRequest from "../../useRequest";

const url = urls?.ANNOUNCEMENTS;

const useAnnouncementReq = ({ isPublic, showAck }) => {
  const request = useRequest({ isPublic, showAck });
  const queryClient = useQueryClient();

  const req = {
    getAnnouncements: async (queryParams) =>
      request({
        url: `${url}${queryParams || ""}`,
        method: "GET",
      }),
    addAnnouncement: async ({ data }) => {
      const res = await request({
        url,
        method: "POST",
        data,
      });
      queryClient.invalidateQueries(["announcements"]);
      return res;
    },
    updateAnnouncement: async ({ id, data }) => {
      const res = await request({
        url: `${url}/${id}`,
        method: "PATCH",
        data: { data: { ...data } },
      });
      queryClient.invalidateQueries(["announcements"]);
      return res;
    },
  };
  return req;
};

export default useAnnouncementReq;
