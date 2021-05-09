import { selectIsAuthenticated } from 'app/pages/UserGreeting/slice/selectors';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export default function RouteUnauthenticated({
  component: Component,
  path,
  ...rest
}: RouteProps) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} component={Component} path={path} />;
}
