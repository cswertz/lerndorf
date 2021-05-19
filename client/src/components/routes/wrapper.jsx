import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Drawer from '@containers/Drawer';
import AppBar from '@containers/AppBar';
import UserBar from '@containers/UserBar';

const useStyles = makeStyles((theme) => ({
  main: {
    marginLeft: 0,

    [theme.breakpoints.up('sm')]: {
      marginLeft: 280,
    },
  },
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  },
}));

const Wrapper = ({ className, fetchRoles, element, logout, user }) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <Drawer user={user} fetchRoles={fetchRoles} />

      <main className={classes.main}>
        <AppBar user={user} fetchRoles={fetchRoles} />
        <UserBar user={user} logout={logout} />
        <div className={classes.container}>{element}</div>
      </main>
    </div>
  );
};

Wrapper.propTypes = {
  className: PropTypes.string,
  fetchRoles: PropTypes.func.isRequired,
  element: PropTypes.element.isRequired,
  user: PropTypes.shape({}).isRequired,
  logout: PropTypes.func.isRequired,
};

Wrapper.defaultProps = {
  className: '',
};

export default Wrapper;
