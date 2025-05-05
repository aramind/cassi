import { useGlobalState } from "../context/GlobalStatesProvider";

const useAlerts = () => {
  const { dispatch } = useGlobalState();

  const showAutoHideAlert = (
    message = "",
    severity = "info",
    autoHideDuration = 3000
  ) => {
    dispatch({
      type: "SHOW_MINOR_ALERT",
      payload: {
        open: true,
        message,
        severity,
        autoHideDuration,
      },
    });
  };

  const showAckAlert = (
    message = "",
    severity = "info",
    autoHideDuration = 300000
  ) => {
    dispatch({
      type: "SHOW_MINOR_ALERT",
      payload: {
        open: true,
        message,
        severity,
        autoHideDuration,
      },
    });
  };
  return {
    showAutoHideAlert,
    showAckAlert,
  };
};

export default useAlerts;
