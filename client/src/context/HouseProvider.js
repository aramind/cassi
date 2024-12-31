import React, { createContext, useEffect, useState } from "react";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import useAuth from "../hooks/useAuth";
import useApiGet from "../hooks/api/useApiGet";
import useHouseReq from "../hooks/api/authenticated/useHouseReq";

const defaultContextValue = {};
export const HouseContext = createContext(defaultContextValue);

const HouseProvider = ({ children }) => {
  const { auth } = useAuth();

  const { getHouseProfile } = useHouseReq({ isPublic: false, showAck: false });
  const [houseProfile, setHouseProfile] = useState([]);

  //   const {
  //     data: houseProfileData,
  //     isLoading: isLoadingInGettingHouseProfile,
  //     isError: isErrorInGettingHouseProfile,
  //     error: errorInGettingHouseProfile,
  //   } = useApiGet("house-profile", () => getHouseProfile(auth?._id), {
  //     refetchOnWindowFocus: true,
  //     retry: 3,
  //     enabled: !!auth?._id,
  //   });

  const { data, isError } = useApiGet("houseProfile", () =>
    getHouseProfile(auth?._id)
  );
  //   useEffect(() => {
  //     setHouseProfile(houseProfileData?.data);
  //   }, [houseProfileData?.data]);
  //   const isLoading = isLoadingInGettingHouseProfile;
  //   const hasError = isErrorInGettingHouseProfile;
  //   const getErrorMessage = () => {
  //     const error = errorInGettingHouseProfile;
  //     return (
  //       error?.message ||
  //       "An error occurred! Please try again doing the previous action."
  //     );
  //   };
  const isLoading = false;
  const hasError = false;
  const getErrorMessage = () => {
    return "An error occurred! Please try again doing the previous action.";
  };
  return (
    <HouseContext.Provider value={{}}>
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
