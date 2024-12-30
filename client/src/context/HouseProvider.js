import React, { createContext, useState } from "react";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import useAuth from "../hooks/useAuth";
import useApiGet from "../hooks/api/useApiGet";

const defaultContextValue = {};
export const HouseContext = createContext(defaultContextValue);

const HouseProvider = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState(
    "An error occurred! Please try again doing the previous action."
  );

  const { auth } = useAuth();

  const {
    date: houseProfile,
    isLoading: isLoadingInGettingHouseProfile,
    isError: isErrorInGettingHouseProfile,
    error: errorInGettingHouseProfile,
  } = useApiGet("house-profile", () => getHouseProfile(), {
    refetchOnWindowFocus: true,
    retry: 3,
    enabled: !!auth?._id,
  });

  const isLoading = false;
  const hasError = false;
  return (
    <HouseContext.Provider value={{}}>
      {isLoading ? (
        <LoadingPage />
      ) : hasError ? (
        <ErrorPage message={errorMsg} />
      ) : (
        children
      )}
    </HouseContext.Provider>
  );
};

export default HouseProvider;
