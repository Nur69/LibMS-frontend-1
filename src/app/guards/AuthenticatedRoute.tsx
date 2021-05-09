import { selectIsAuthenticated } from 'app/pages/UserGreeting/slice/selectors';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export default function RouteAuthenticated({
  component: Component,
  path,
  ...rest
}: RouteProps) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  if (!isAuthenticated) {
    // dispatch get user profile
    return <Redirect to="/auth" />;
  }

  return <Route {...rest} component={Component} path={path} />;
}
