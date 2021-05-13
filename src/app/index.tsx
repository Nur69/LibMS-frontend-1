/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import PrivateRoute from './guards/PrivateRoute';
import PublicRoute from './guards/PublicRoute';
import { AddBookPage } from './pages/AddBookPage/Loadable';
import { AuthPage } from './pages/AuthPage/Loadable';
import { DashboardPage } from './pages/DashboardPage/Loadable';
import { HomePage } from './pages/HomePage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';
import { RegisterPage } from './pages/RegisterPage/Loadable';
import { UserGreeting } from './pages/UserGreeting/Loadable';
import { useUserProfileSlice } from './pages/UserGreeting/slice';

export function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useUserProfileSlice();
  const [isDone, setIsDone] = useState(false);

  function fetchData(dispatch) {
    return dispatch({
      type: actions.requestUserProfile.type,
      [WAIT_FOR_ACTION]: actions.fetchProfileSuccess.type,
      [ERROR_ACTION]: actions.fetchProfileFailed.type,
    });
  }

  useEffect(() => {
    fetchData(dispatch).then(result => {
      console.log('result', result);
      setIsDone(true);
    });
  }, [isDone]);

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - SMU Library"
        defaultTitle="SMU Library"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Web Platform for SMU Library" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        />
      </Helmet>
      {isDone && (
        <Switch>
          <PublicRoute exact path="/" component={HomePage} />
          <PublicRoute exact path="/auth" component={AuthPage} />
          <PublicRoute exact path="/login" component={LoginPage} />
          <PublicRoute exact path="/register" component={RegisterPage} />

          <PrivateRoute exact path="/user" component={UserGreeting} />
          <PrivateRoute exact path="/add-book" component={AddBookPage} />
          <PrivateRoute exact path="/dashboard" component={DashboardPage} />
          <Route component={NotFoundPage} />
        </Switch>
      )}
    </BrowserRouter>
  );
}
