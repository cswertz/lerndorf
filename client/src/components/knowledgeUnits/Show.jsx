import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Single from './Single';

const styles = {};

const KnowledgeUnitsShow = ({
  item,
  user,
}) => (
  <Single
    unit={item}
    user={user}
  />
);

KnowledgeUnitsShow.propTypes = {
  user: PropTypes.shape({}).isRequired,
  item: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(KnowledgeUnitsShow);
