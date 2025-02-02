import useApiSend from "../../useApiSend";
import useTrackerReq from "../useTrackerReq";

const useUpdateTracker = () => {
  const { updateTracker } = useTrackerReq({ isPublic: false, showAck: true });

  const { mutate: sendUpdateTracker, isLoading: isLoadingInUpdatingTracker } =
    useApiSend(updateTracker, ["trackers"]);

  return { sendUpdateTracker, isLoadingInUpdatingTracker };
};

export default useUpdateTracker;
