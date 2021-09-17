import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Logout = () => {
  const [cookies, , removeCookies] = useCookies([]);

  useEffect(() => {
    if (cookies.user) {
      removeCookies('user', { sameSite: 'strict' });
    }
  }, []);

  return <Redirect to="/login" />;
};

export default Logout;
