import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import RelationForm from './RelationForm';
import TitleForm from './TitleForm';
import TagEditForm from './TagEditForm';
import TagAddForm from './TagAddForm';

const styles = () => ({});

const EditTagsList = (props) => {
  const { tags, deleteTag } = props;
  console.log(tags);
  if (tags.length > 0) {
    const items = tags.map((item) => {
      const { id, tag } = item;

      const initialValue = {
        tag,
      };

      return (
        <TagEditForm
          initialValues={initialValue}
          deleteTag={deleteTag}
          form={`tag-edit-${id}`}
          key={id}
          id={id}
        />
      );
    });

    return <div className="tags">{items}</div>;
  }

  return null;
};

const LearningUnitsEdit = ({
  fetchSuggestions,
  initialValues,
  editTitle,
  addRelation,
  suggestions,
  taxonomies,
  setTarget,
  deleteTag,
  addTag,
  tags,
}) => (
  <>
    <TitleForm
      initialValues={initialValues}
      handleSubmit={editTitle}
    />
    <EditTagsList
      tags={tags}
      deleteTag={deleteTag}
    />
    <TagAddForm
      handleSubmit={addTag}
    />
    <RelationForm
      fetchSuggestions={fetchSuggestions}
      handleSubmit={addRelation}
      suggestions={suggestions}
      taxonomies={taxonomies}
      setTarget={setTarget}
    />
  </>
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
  tags: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deleteTag: PropTypes.func.isRequired,
};
export default withStyles(styles)(LearningUnitsEdit);
