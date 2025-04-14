import urls from "../../../../constants/urls";
import useRequest from "../../useRequest";

const url = urls?.ANNOUNCEMENTS;

const useAnnouncementReq = ({ isPublic, showAck }) => {
  const request = useRequest({ isPublic, showAck });
  const req = {
    getAnnouncements: async (queryParams) =>
      request({
        url: `${url}${queryParams || ""}`,
        method: "GET",
      }),
    addAnnouncement: async ({ data }) =>
      request({
        url,
        method: "POST",
        data,
      }),
    updateAnnouncement: async ({ id, data }) =>
      request({
        url: `${url}/${id}`,
        method: "PATCH",
        data,
      }),
  };
  return req;
};

export default useAnnouncementReq;
