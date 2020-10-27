import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Single from './Single';

const styles = {};

const KnowledgeUnitsShow = ({
  markReviewed,
  markLectored,
  item,
  user,
}) => (
  <Single
    markReviewed={markReviewed}
    markLectored={markLectored}
    unit={item}
    user={user}
  />
);

KnowledgeUnitsShow.propTypes = {
  markReviewed: PropTypes.func.isRequired,
  markLectored: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  item: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(KnowledgeUnitsShow);
