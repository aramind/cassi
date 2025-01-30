import React, { useState } from "react";
const RenderSelectUsers = ({ occupantOptions, selectedOccupant }) => {
  const [selected, setSelected] = useState(selectedOccupant || "");

  const handleSelectChange = (e) => {
    const selectedOccupant = occupantOptions.find(
      (occupant) => occupant.name === e.target.value
    );
    setSelected(selectedOccupant?.name);
  };

  return (
    <select
      style={{
        minWidth: "80px",
        padding: "4px",
        borderRadius: "6px",
      }}
      aria-label="occupant-selector"
      value={selected}
      onChange={handleSelectChange}
    >
      <option value="">-- Unassigned --</option>
      {occupantOptions.map((occupant) => (
        <option
          key={occupant.id}
          style={{
            backgroundColor: "white",
          }}
          value={occupant.id}
        >
          {occupant.name}
        </option>
      ))}
    </select>
  );
};

export default RenderSelectUsers;
