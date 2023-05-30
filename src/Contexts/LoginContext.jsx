import React, { createContext, useEffect, useState,useMemo } from 'react';
export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(null);
  useEffect(()=>{
  const sessionData = localStorage.getItem("suvikey");
  if (sessionData !== null ||sessionData!==undefined &&loginData === null) {
    handleLogin(JSON.parse(sessionData));
  }
  },[]);
  const handleLogin = (userData) => {
    setLoginData(userData);
    localStorage.setItem("suvikey",JSON.stringify(userData));
    console.log(userData);
  };

  const handleLogout = () => {
    setLoginData(null);
    localStorage.removeItem("suvikey");
  
  };
  const loginContextValue = useMemo(
    () => ({
      loginData,
      handleLogin,
      handleLogout,
    }),
    [loginData]
  );
  return (
    <LoginContext.Provider value={loginContextValue}>
      {children}
    </LoginContext.Provider>
  );
};