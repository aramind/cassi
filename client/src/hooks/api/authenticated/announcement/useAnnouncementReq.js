import urls from "../../../../constants/urls";
import useRequest from "../../useRequest";

const url = urls?.ANNOUNCEMENTS;

const useAnnouncementReq = ({ isPublic, showAck }) => {
  const request = useRequest({ isPublic, showAck });
  const req = {
    addAnnouncement: async ({ data }) =>
      request({
        url,
        method: "POST",
        data,
      }),
  };
  return req;
};

export default useAnnouncementReq;
