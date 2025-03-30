import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

  // Update local storage whenever `persist` changes
  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  console.log("PERSIST ON AUTHPROVIDER", persist);
  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
