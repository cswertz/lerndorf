import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Sidebar from '@containers/Sidebar';
import AppBar from '@containers/AppBar';
import UserBar from '@containers/UserBar';

const useStyles = makeStyles((theme) => ({
  main: {
    marginLeft: 0,

    [theme.breakpoints.up('lg')]: {
      marginLeft: 280,
    },
  },
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(4),

    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
  },
}));

const Wrapper = ({ className, children }) => {
  const classes = useStyles();

  return (
    <div className={className}>
      <Sidebar />

      <main className={classes.main}>
        <AppBar />
        <UserBar />
        <div className={classes.container}>{children}</div>
      </main>
    </div>
  );
};

Wrapper.propTypes = {
  className: PropTypes.string,
};

Wrapper.defaultProps = {
  className: '',
};

export default Wrapper;
