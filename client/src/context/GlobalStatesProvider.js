import { createContext, useContext, useReducer } from "react";

const globalReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_MINOR_ALERT":
      return {
        ...state,
        alert: action.payload,
      };
    case "SHOW_ACK_NOTIFICATION":
      return {
        ...state,
        ackAlert: action.payload,
      };

    default:
      throw new Error("No matched action");
  }
};

const initialGlobalState = {
  alert: { open: false, severity: "info", message: "" },
  ackAlert: {
    open: false,
    severity: "info",
    message: "",
    autoHideDuration: 3000,
  },
};

const GlobalStateContext = createContext(initialGlobalState);

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};

const GlobalStatesContextProvider = ({ children }) => {
  const [globalState, dispatch] = useReducer(globalReducer, initialGlobalState);

  return (
    <GlobalStateContext.Provider value={{ globalState, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStatesContextProvider;
