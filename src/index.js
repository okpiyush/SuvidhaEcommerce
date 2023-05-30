import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { LoginContextProvider } from "./Contexts/LoginContext";
ReactDOM.render(
   <LoginContextProvider>
    <App />
  </LoginContextProvider>,
  document.getElementById('root')
);