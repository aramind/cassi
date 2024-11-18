import React, { useState } from "react";
import { mockDB } from "../../mockDB/mockDB";
import { colors } from "../../constants/colors";

const occupants = mockDB?.users || [];
const backgroundColors = colors;

const getBgColor = (occupant) => {
  return backgroundColors[
    occupants.indexOf(occupant) % backgroundColors.length
  ];
};
const RenderSelectUsers = (row) => {
  const [occupant, setOccupant] = useState(row?.user || "");

  const handleSelectChange = (e) => {
    const selectedOccupant = occupants.find(
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
        backgroundColor: getBgColor(occupant), // Apply color to the select element
      }}
      aria-label="occupant-selector"
      value={occupant?.name || ""}
      onChange={handleSelectChange}
    >
      {occupants.map((occupant) => (
        <option
          key={occupant.id || occupant.name}
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
