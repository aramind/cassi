import axios from "axios";
import useAuth from "./useAuth";

const url = `${process.env.REACT_APP_API_URL}/v1/auth/refresh`;

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(url, { withCredentials: true });

    const userInfo = response?.data?.data;

    const newAccessToken = response?.data?.data?.token;

    setAuth((prev) => {
      return { ...prev, ...userInfo, token: newAccessToken };
    });

    return newAccessToken;
  };

  return refresh;
};

export default useRefreshToken;
