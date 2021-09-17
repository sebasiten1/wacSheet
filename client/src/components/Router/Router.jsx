import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Logout from '../../pages/Logout/Logout';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import GameRouter from '../../pages/Game/GameRouter';
import GameAll from '../../pages/Game/GameAll';
import NotFound from '../../pages/NotFound/NotFound';

function PublicRoute({ children, ...rest }) {
  return <Route {...rest}>{children}</Route>;
}

// Route cannot be accessed if logged in
function PublicOnlyRoute({ children, ...rest }) {
  const [cookies] = useCookies(['user']);

  return !cookies.user ? <Route {...rest}>{children}</Route> : <Redirect to="/" />;
}

function PrivateRoute({ children, ...rest }) {
  // const { checkSession } = useContext(ApiContext);
  const [cookies] = useCookies(['user']);

  const sessionCookieIsValid = () => {
    if (cookies.user) {
      // TODO check if cookies is valid
      return true;
    }
    return false;
  };

  return sessionCookieIsValid() ? <Route {...rest}>{children}</Route> : <Redirect to="/" />;
}

PublicRoute.propTypes = Route.propTypes;
PublicOnlyRoute.propTypes = Route.propTypes;
PrivateRoute.propTypes = Route.propTypes;

const Router = () => {
  return (
    <Switch>
      <PublicRoute exact path="/">
        <Home />
      </PublicRoute>
      <PublicOnlyRoute exact path="/login">
        <Login />
      </PublicOnlyRoute>
      <PublicOnlyRoute exact path="/register">
        <Register />
      </PublicOnlyRoute>
      <PrivateRoute exact path="/logout">
        <Logout />
      </PrivateRoute>
      <PublicOnlyRoute exact path="/forgot-password">
        <ForgotPassword />
      </PublicOnlyRoute>
      <PublicOnlyRoute exact path="/reset/:token">
        <ResetPassword />
      </PublicOnlyRoute>
      <PrivateRoute exact path="/game">
        <GameAll />
      </PrivateRoute>
      <PrivateRoute exact path="/game/:gameId">
        <GameRouter />
      </PrivateRoute>
      <PublicRoute>
        <NotFound />
      </PublicRoute>
    </Switch>
  );
};

export default Router;
