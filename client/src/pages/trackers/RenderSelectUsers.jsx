import React, { useState } from "react";
import ReusableSelect from "../../components/ReusableSelect";
import { mockDB } from "../../mockDB/mockDB";

const users = mockDB?.users;
const RenderSelectUsers = (row) => {
  const [user, setUser] = useState(row?.user || "");
  return (
    <ReusableSelect
      labelId="user-selector"
      id="user-selector"
      value={user}
      options={users}
    />
  );
};

export default RenderSelectUsers;
