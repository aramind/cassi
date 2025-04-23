import { useGlobalState } from "../context/GlobalStatesProvider";

const useMinorAlert = () => {
  const { dispatch } = useGlobalState();

  const showAlert = (message = "", severity = "info", duration = 3000) => {
    dispatch({
      type: "SHOW_MINOR_ALERT",
      payload: {
        open: true,
        message,
        severity,
        autoHideDuration: duration,
      },
    });
  };

  return showAlert;
};

export default useMinorAlert;
