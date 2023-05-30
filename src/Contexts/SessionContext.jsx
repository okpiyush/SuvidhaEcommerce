import React, { createContext, useState,useEffect } from 'react';

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
    const [SessionData, setSessionData] = useState(null);
    //calls only once when the component mounts, if it is abailable in localstorage 
    useEffect(() => {
        const localData = localStorage.getItem('suvikey');
        if (localData !== undefined && localData !== null) {
          const parsedData = JSON.parse(localData);
          setSessionData(parsedData);
          addSession({ userData: parsedData });
        }
      }, []);
      
    const getSessionData=()=>{
        return SessionData;
    }

    //adds the user to the localstorage
    const addSession=(data)=>{
        console.log(data);
      localStorage.setItem('suvikey',JSON.stringify(data.userData));
      setSessionData(`User: ${data}`);
    }
    //removes the user from the localstorage
    const deleteSession=()=>{
      localStorage.removeItem('suvikey');
      setSessionData(``);
    }
  return (
    <SessionContext.Provider value={{ SessionData, getSessionData,addSession, deleteSession }}>
      {children}
    </SessionContext.Provider>
  );
};