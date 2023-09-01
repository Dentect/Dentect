import { useState } from 'react';

const useToken = () => {
  const getToken = () => {
    const userToken = JSON.parse(sessionStorage.getItem('token') || '{}');
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());
  const saveToken = (userToken: { token: any }) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;
