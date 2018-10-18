import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

import Appbar from '../../containers/Appbar';

const styles = () => ({
  container: {
    maxWidth: 960,
    margin: 'auto',
    marginTop: '10px',
  },
});

const Wrapper = ({
  className,
  classes,
  element,
  logout,
  active,
  title,
  user,
}) => (
  <div className={className}>
    <Appbar
      logout={logout}
      active={active}
      title={title}
      user={user}
    />
    <div className={classes.container}>
      {element}
    </div>
  </div>
);

Wrapper.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  element: PropTypes.element.isRequired,
  user: PropTypes.shape({}).isRequired,
  active: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default withStyles(styles)(Wrapper);
