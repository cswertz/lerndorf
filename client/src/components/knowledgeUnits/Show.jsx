import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Single from './Single';

const styles = {};

const KnowledgeUnitsShow = ({
  handleDelete,
  markReviewed,
  markLectored,
  item,
  user,
}) => (
  <Single
    handleDelete={handleDelete}
    markReviewed={markReviewed}
    markLectored={markLectored}
    unit={item}
    user={user}
  />
);

KnowledgeUnitsShow.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  markReviewed: PropTypes.func.isRequired,
  markLectored: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  item: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(KnowledgeUnitsShow);
