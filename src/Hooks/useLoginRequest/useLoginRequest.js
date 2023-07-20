import axios from 'axios';
import { useContext, useEffect } from 'react';
import { LoginContext } from '../../Contexts/LoginContext';

const useLoginRequest = (url, payload) => {
  const { handleLogin } = useContext(LoginContext);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.post(url, payload);
        handleLogin(response.data);
      } catch (error) {
        console.log(error);
        alert('Sign in failed');
      }
    };

    makeRequest();
  }, [url, payload, handleLogin]);

  return null;
};

export default useLoginRequest;
