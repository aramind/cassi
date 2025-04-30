import useApiSendAsync from "../../useApiSendAsync";
import useTrackerReq from "../useTrackerReq";

const useUpdateTracker = () => {
  const { updateTracker } = useTrackerReq({ isPublic: false, showAck: true });

  const { send: sendUpdateTracker, isLoading: isLoadingInUpdatingTracker } =
    useApiSendAsync(updateTracker, ["trackers"]);

  return { sendUpdateTracker, isLoadingInUpdatingTracker };
};

export default useUpdateTracker;
