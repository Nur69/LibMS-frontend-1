import { isAuthenticated } from 'app/services/auth/auth.service';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export default function RouteAuthenticated({
  component: Component,
  path,
  ...rest
}: RouteProps) {
  if (!isAuthenticated()) {
    return <Redirect to="/auth" />;
  }

  return <Route {...rest} component={Component} path={path} />;
}
