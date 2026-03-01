import React, { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(null);
  const [cart, setCart] = useState([]);

  const fetchCart = useCallback(async (token, userId) => {
    if (!token || !userId) return;
    try {
      const headers = { token: `Bearer ${token}` };
      const response = await axios.get(`${API_BASE_URL}/cart/find/${userId}`, { headers });
      setCart(response.data.products || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, []);

  useEffect(() => {
    const sessionData = localStorage.getItem("suvikey");
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      setLoginData(parsedData);
      fetchCart(parsedData.accessToken, parsedData._id);
    }
  }, [fetchCart]);

  const handleLogin = (userData) => {
    setLoginData(userData);
    localStorage.setItem("suvikey", JSON.stringify(userData));
    fetchCart(userData.accessToken, userData._id);
  };

  const handleLogout = () => {
    setLoginData(null);
    localStorage.removeItem("suvikey");
    setCart([]);
  };

  const loginContextValue = useMemo(
    () => ({
      loginData,
      handleLogin,
      handleLogout,
      cart,
      setCart,
      fetchCart: () => fetchCart(loginData?.accessToken, loginData?._id)
    }),
    [loginData, cart, fetchCart]
  );

  return (
    <LoginContext.Provider value={loginContextValue}>
      {children}
    </LoginContext.Provider>
  );
};