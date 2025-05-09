import urls from "../../../../constants/urls";
import useRequest from "../../useRequest";
// import { useQueryClient } from "react-query";

const url = urls?.TASKS;

const useTaskReq = ({ isPublic, showAck }) => {
  const request = useRequest({ isPublic, showAck });
  // const queryClient = useQueryClient();

  // keys must be array of key(s)
  // const invalidateQueries = (keys) => {
  //   queryClient.invalidateQueries(keys);
  // };

  const req = {
    addTask: async ({ data }) => {
      const res = await request({
        url,
        method: "POST",
        data,
      });
      // invalidateQueries(["tasks"]);
      return res;
    },
    getTasks: async (queryParams) =>
      request({
        url: `${url}${queryParams || ""}`,
        method: "GET",
      }),
    updateTask: async ({ id, updates }) => {
      const res = await request({
        url: `${url}/${id}`,
        method: "PATCH",
        data: { updates },
      });
      // invalidateQueries(["tasks"]);
      return res;
    },
    softDelete: async (id) => {
      return await request({
        url: `${url}/${id}/soft-delete`,
        method: "PATCH",
      });
    },
  };

  return req;
};

export default useTaskReq;
