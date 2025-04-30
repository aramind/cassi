import { useCallback, useEffect, useState } from "react";
import {
  getAppStateValue,
  updateAppState,
} from "../utils/localStorageAppState";

const useAppState = (path, defaultValue) => {
  const [value, setValue] = useState(() => {
    const stored = getAppStateValue(path);
    return stored !== undefined ? stored : defaultValue;
  });

  useEffect(() => {
    const stored = getAppStateValue(path);
    if (stored === undefined) {
      updateAppState(path, defaultValue);
    }
  }, [defaultValue, path]);

  const setAndStore = useCallback(
    (newValue) => {
      setValue(newValue);
      updateAppState(path, newValue);
    },
    [path]
  );

  return [value, setAndStore];
};

export default useAppState;
