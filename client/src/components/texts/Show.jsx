import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Single from './Single';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
  },
});
const TextsShow = ({
  classes,
  item,
}) => (
  <div>
    <Single text={item} />
    {!item.nextId && (
      <Button
        className={classes.button}
        variant="contained"
        component={Link}
        to={`/texts/edit/${item.id}`}
      >
        Add new version
      </Button>
    )}
  </div>
);

TextsShow.propTypes = {
  item: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(TextsShow);
