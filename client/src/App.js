import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider, useCookies } from 'react-cookie';

import ApiContextProvider from './context/ApiContextProvider';
import Theme from './theme/Theme';
import NavTab from './components/NavTab/NavTab';
import Router from './components/Router/Router';

function App() {
  const [cookies] = useCookies(['user']);

  useEffect(() => {
    if (cookies.user) {
      console.log('user cookie est présent', cookies.user);
      // TODO check if cookie is valid
      // TODO if no -> delete cookie
    } else {
      console.log("user cookie n'est pas présent");
    }
  }, []);

  return (
    <Theme>
      <CssBaseline />
      <CookiesProvider>
        <BrowserRouter>
          <ApiContextProvider>
            <NavTab />
            <Router />
          </ApiContextProvider>
        </BrowserRouter>
      </CookiesProvider>
    </Theme>
  );
}

export default App;
