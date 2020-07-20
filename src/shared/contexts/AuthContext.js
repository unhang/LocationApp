import React, { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: "",
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  return (
    <AuthContext.Provider value={props.value}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

