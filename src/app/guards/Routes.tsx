import { LoadingSpinner } from 'app/components/LoadingPage';
import { USER_ENDPOINTS } from 'app/configs/endpoints';
import { getToken } from 'app/services/auth/tokens.service';
import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { request } from 'utils/request';

const getProfile = async () => {
  const options: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getToken(),
    },
  };
  return request(USER_ENDPOINTS.profile, options);
};

const isAuthenticated = async () => {
  try {
    await getProfile();
    return true;
  } catch (error) {
    return false;
  }
};

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    isAuthenticated().then(bool =>
      setTimeout(() => setAuthenticated(bool), 500),
    );
  }, []);

  return (
    <Route
      {...rest}
      render={props => {
        if (authenticated === null) return <LoadingSpinner />;
        return authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

const UnauthenticatedRoute = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    isAuthenticated().then(bool =>
      setTimeout(() => setAuthenticated(bool), 500),
    );
  }, []);
  return (
    <Route
      {...rest}
      render={props => {
        if (authenticated === null) return <LoadingSpinner />;
        return !authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        );
      }}
    />
  );
};

export { AuthenticatedRoute, UnauthenticatedRoute };
