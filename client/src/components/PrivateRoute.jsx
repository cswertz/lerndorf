import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, ...rest }) => {
  const { loggedIn } = useSelector((state) => state.user);

  return loggedIn ? <Route {...rest}>{children}</Route> : <Redirect to="/login" />;
};

export default PrivateRoute;
