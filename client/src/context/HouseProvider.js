import React, { createContext, useMemo } from "react";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import useAuth from "../hooks/useAuth";

export const HouseContext = createContext();

const HouseProvider = ({ children }) => {
  const { auth } = useAuth();

  const occupantOptions = useMemo(
    () =>
      auth?.houseInfo?.houseOccupants?.map((ho) => {
        return {
          id: ho._id,
          name: ho?.occupant?.name?.nickName || ho?.occupant?.name.firstName,
        };
      }),
    [auth?.houseInfo?.houseOccupants]
  );

  const isLoading = false;
  const hasError = false;
  const getErrorMessage = () => {
    return "An error occurred! Please try again doing the previous action.";
  };
  return (
    <HouseContext.Provider value={{ occupantOptions }}>
      {isLoading ? (
        <LoadingPage />
      ) : hasError ? (
        <ErrorPage message={getErrorMessage()} />
      ) : (
        children
      )}
    </HouseContext.Provider>
  );
};

export default HouseProvider;
