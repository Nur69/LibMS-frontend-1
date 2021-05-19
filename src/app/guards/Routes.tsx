import { LoadingSpinner } from 'app/components/LoadingPage';
import { USER_ENDPOINTS } from 'app/configs/endpoints';
import { getToken } from 'app/services/auth/tokens.service';
import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import request from 'utils/request';

const getProfile = async () => {
  request.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
  const options: AxiosRequestConfig = {
    method: 'GET',
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
    if (getToken()) {
      isAuthenticated().then(bool =>
        setTimeout(() => setAuthenticated(bool), 200),
      );
    } else {
      setAuthenticated(false);
    }
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
    if (getToken()) {
      isAuthenticated().then(bool =>
        setTimeout(() => setAuthenticated(bool), 200),
      );
    } else {
      setAuthenticated(false);
    }
  }, []);
  return (
    <Route
      {...rest}
      render={props => {
        if (authenticated === null) return <LoadingSpinner />;
        return !authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/user" />
        );
      }}
    />
  );
};

export { AuthenticatedRoute, UnauthenticatedRoute };
