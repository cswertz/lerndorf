import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import RelationForm from './RelationForm';
import TagForm from './TagForm';

const styles = () => ({});

const LearningUnitsEdit = ({
  addRelation,
  taxonomies,
  addTag,
}) => (
  <React.Fragment>
    <TagForm
      handleSubmit={addTag}
    />
    <RelationForm
      handleSubmit={addRelation}
      taxonomies={taxonomies}
    />
  </React.Fragment>
);

LearningUnitsEdit.propTypes = {
  taxonomies: PropTypes.shape({}).isRequired,
  addRelation: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
};
export default withStyles(styles)(LearningUnitsEdit);
