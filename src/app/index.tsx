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
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { AddBookPage } from './pages/AddBookPage/Loadable';
import { AuthPage } from './pages/AuthPage/Loadable';
import { BookDescPage } from './pages/BookDescPage';
import { BooksPage } from './pages/BooksPage/Loadable';
import { DashboardPage } from './pages/DashboardPage/Loadable';
import { HomePage } from './pages/HomePage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';
import { RegisterPage } from './pages/RegisterPage/Loadable';
import { UserGreeting } from './pages/UserGreeting/Loadable';

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
        <Route exact path="/auth" component={AuthPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/user" component={UserGreeting} />
        <Route exact path="/add-book" component={AddBookPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/books" component={BooksPage} />
        <Route exact path="/books/:id" component={BookDescPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}
