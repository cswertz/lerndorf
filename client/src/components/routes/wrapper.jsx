import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Appbar from '@containers/Appbar';

const styles = () => ({
  container: {
    maxWidth: 960,
    margin: 'auto',
    marginTop: '10px',
  },
});

const Wrapper = ({ fetchRoles, className, classes, element, logout, active, title, user }) => (
  <div className={className}>
    <Appbar fetchRoles={fetchRoles} logout={logout} active={active} title={title} user={user} />
    <div className={classes.container}>{element}</div>
  </div>
);

Wrapper.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  fetchRoles: PropTypes.func.isRequired,
  element: PropTypes.element.isRequired,
  user: PropTypes.shape({}).isRequired,
  active: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default withStyles(styles)(Wrapper);
