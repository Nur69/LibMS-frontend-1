/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { AuthenticatedRoute, UnauthenticatedRoute } from './guards/Routes';
import { AddBookPage } from './pages/AddBookPage/Loadable';
import { AuthPage } from './pages/AuthPage/Loadable';
import { DashboardPage } from './pages/DashboardPage';
import { HomePage } from './pages/HomePage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';
import { RegisterPage } from './pages/RegisterPage/Loadable';
import { ReservationsPage } from './pages/ReservationsPage';
import { UserProfilePage } from './pages/UserProfilePage/Loadable';

export function App() {
  const { i18n } = useTranslation();

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
      <Switch>
        <Route exact path="/" component={HomePage} />
        <UnauthenticatedRoute exact path="/auth" component={AuthPage} />
        <UnauthenticatedRoute exact path="/login" component={LoginPage} />
        <UnauthenticatedRoute exact path="/register" component={RegisterPage} />

        <AuthenticatedRoute exact path="/user" component={UserProfilePage} />
        <AuthenticatedRoute exact path="/add-book" component={AddBookPage} />
        <AuthenticatedRoute path="/dashboard" component={DashboardPage} />
        <AuthenticatedRoute
          exact
          path="/reservations"
          component={ReservationsPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle></GlobalStyle>
    </BrowserRouter>
  );
}

/* istanbul ignore next */
export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    width: 100%;
  }
`;
