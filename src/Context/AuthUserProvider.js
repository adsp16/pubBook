import React, { useState, useEffect } from "react";
import { app } from "../firebase/config";

export const AuthContext = React.createContext();

export const AuthUserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
