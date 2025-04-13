import { useContext } from "react";
import { HouseContext } from "../context/HouseProvider";

const useHouseProvider = () => {
  const { occupantOptions, activeOccupantOptions } = useContext(HouseContext);
  return { occupantOptions, activeOccupantOptions };
};

export default useHouseProvider;
