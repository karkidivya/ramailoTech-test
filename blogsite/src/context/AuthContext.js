// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);

  const login = (data) => {
    console.log("cjsdcj",data.token,"authcontext")
    setToken(data.token);
    setName(data.fullName)
    // You can also store the token in localStorage or sessionStorage for persistence
  };

  const logout = () => {
    setToken(null);
    // Clear token from localStorage or sessionStorage
  };

  const isAuthenticated = () => {

    return (!!token);
  };

  return (
    <AuthContext.Provider value={{ token,name, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
