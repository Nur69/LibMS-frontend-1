import { isAuthenticated } from 'app/services/auth/auth.service';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export default function RouteUnauthenticated({
  component: Component,
  path,
  ...rest
}: RouteProps) {
  if (isAuthenticated()) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} component={Component} path={path} />;
}
