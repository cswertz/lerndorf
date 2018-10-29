import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = {};

const LearningUnitsShow = ({
  item,
}) => {
  return (
    <div>
      <Typography variant="headline">
        {'"'}{item.title}{'"'}
      </Typography>
      <Typography variant="caption">
        created by {item.username}
      </Typography>
    </div>
  );
};

LearningUnitsShow.propTypes = {
  item: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(LearningUnitsShow);
