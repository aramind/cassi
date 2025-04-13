import React, { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const PersistLoginComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  // console.log("IN PERSIST COMPONENT");
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.token ? verifyRefreshToken() : setIsLoading(false);
  }, [auth, auth?.token, refresh]);
  return (
    <>{!persist ? <Outlet /> : isLoading ? <LoadingPage /> : <Outlet />}</>
  );
};

export default PersistLoginComponent;
