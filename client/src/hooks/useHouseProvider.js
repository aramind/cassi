import { useContext } from "react";
import { HouseContext } from "../context/HouseProvider";

const useHouseProvider = () => {
  const { occupantOptions } = useContext(HouseContext);
  return { occupantOptions };
};

export default useHouseProvider;
