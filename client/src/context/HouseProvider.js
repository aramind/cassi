import React, { createContext, useEffect, useMemo, useState } from "react";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import useAuth from "../hooks/useAuth";
import useApiGet from "../hooks/api/useApiGet";
import useHouseReq from "../hooks/api/authenticated/useHouseReq";

export const HouseContext = createContext();

const HouseProvider = ({ children }) => {
  const { auth } = useAuth();
  const { getHouseProfile } = useHouseReq({ isPublic: false, showAck: false });
  const [activeOccupantOptions, setActiveOccupantOptions] = useState([]);

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

  const {
    data: houseProfile,
    isLoading: isLoadingInHouseProfile,
    isError: isErrorInHouseProfile,
  } = useApiGet("houseProfile", () => getHouseProfile(auth?.houseInfo?._id), {
    refetchOnWindowFocus: true,
    retry: 3,
    enabled: !!auth?.houseInfo?._id,
  });

  const isLoading = isLoadingInHouseProfile;
  const hasError = isErrorInHouseProfile;
  const getErrorMessage = () => {
    return "An error occurred! Please try again doing the previous action.";
  };

  useEffect(() => {
    const options = houseProfile?.data?.occupants
      ?.filter((ho) => ho?.status === "active")
      ?.map((ho) => {
        const label =
          ho.occupant?.name?.nickName || ho.occupant?.name?.firstName;
        return { label, value: ho?._id };
      });
    setActiveOccupantOptions((pv) => options);
  }, [houseProfile?.data?.occupants, setActiveOccupantOptions]);

  return (
    <HouseContext.Provider value={{ occupantOptions, activeOccupantOptions }}>
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
