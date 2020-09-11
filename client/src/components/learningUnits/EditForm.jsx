import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import RelationForm from './RelationForm';
import TitleForm from './TitleForm';
import TagForm from './TagForm';

const styles = () => ({});

const LearningUnitsEdit = ({
  fetchSuggestions,
  initialValues,
  editTitle,
  addRelation,
  suggestions,
  taxonomies,
  setTarget,
  addTag,
}) => (
  <React.Fragment>
    <TitleForm
      initialValues={initialValues}
      handleSubmit={editTitle}
    />
    <TagForm
      handleSubmit={addTag}
    />
    <RelationForm
      fetchSuggestions={fetchSuggestions}
      handleSubmit={addRelation}
      suggestions={suggestions}
      taxonomies={taxonomies}
      setTarget={setTarget}
    />
  </React.Fragment>
);

LearningUnitsEdit.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  taxonomies: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  addRelation: PropTypes.func.isRequired,
  editTitle: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  setTarget: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
};
export default withStyles(styles)(LearningUnitsEdit);
