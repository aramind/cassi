import { useQueryClient } from "react-query";
import urls from "../../../../constants/urls";
import useRequest from "../../useRequest";

const url = urls?.ANNOUNCEMENTS;

const useAnnouncementReq = ({ isPublic, showAck }) => {
  const request = useRequest({ isPublic, showAck });
  const queryClient = useQueryClient();

  // keys must be array of keys
  const invalidateQueries = (keys) => {
    queryClient.invalidateQueries(keys);
  };
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
      invalidateQueries(["announcements"]);
      return res;
    },
    updateAnnouncement: async ({ id, data }) => {
      const res = await request({
        url: `${url}/${id}`,
        method: "PATCH",
        data: { data: { ...data } },
      });
      invalidateQueries(["announcements"]);
      return res;
    },
    softDelete: async ({ id }) => {
      const res = await request({
        url: `${url}/${id}/soft-delete`,
        method: "PATCH",
      });
      invalidateQueries(["announcements"]);
      return res;
    },
  };
  return req;
};

export default useAnnouncementReq;
