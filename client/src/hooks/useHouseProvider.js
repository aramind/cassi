import { useContext } from "react";
import { HouseContext } from "../context/HouseProvider";

const useHouseProvider = () => {
  const { listOfHouseOccupants, occupantOptions, activeOccupantOptions } =
    useContext(HouseContext);
  return { listOfHouseOccupants, occupantOptions, activeOccupantOptions };
};

export default useHouseProvider;
