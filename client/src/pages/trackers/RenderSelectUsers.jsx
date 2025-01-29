import React, { useState } from "react";
import { mockDB } from "../../mockDB/mockDB";
import { colors } from "../../constants/colors";
import useAuth from "../../hooks/useAuth";

const RenderSelectUsers = (row) => {
  const [occupant, setOccupant] = useState(row?.user || "");
  const { auth } = useAuth();

  console.log(auth);

  const occupantOptions = auth?.houseInfo?.houseOccupants?.map((ho) => {
    return {
      id: ho._id,
      name: ho?.occupant?.name?.nickName || ho?.occupant?.name.firstName,
    };
  });

  console.log(occupantOptions);

  const handleSelectChange = (e) => {
    const selectedOccupant = occupantOptions.find(
      (occupant) => occupant.name === e.target.value
    );
    setOccupant(selectedOccupant);
  };

  return (
    <select
      style={{
        minWidth: "80px",
        padding: "4px",
        borderRadius: "6px",
        // backgroundColor: getBgColor(occupant), // Apply color to the select element
      }}
      aria-label="occupant-selector"
      value={occupant?.name || ""}
      onChange={handleSelectChange}
    >
      {occupantOptions.map((occupant) => (
        <option
          key={occupant}
          style={{
            backgroundColor: "white",
          }}
        >
          {occupant.name}
        </option>
      ))}
    </select>
  );
};

export default RenderSelectUsers;
