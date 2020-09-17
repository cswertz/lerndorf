import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import RelationForm from './RelationForm';
import TitleForm from './TitleForm';
import TagEditForm from './TagEditForm';
import TagAddForm from './TagAddForm';

const styles = () => ({});

const EditTagsList = (props) => {
  const { tags, deleteTag, updateTag } = props;
  if (tags.length > 0) {
    const items = tags.map((item) => {
      const { id, tag } = item;

      const initialValue = {
        tag,
      };

      return (
        <TagEditForm
          handleSubmit={updateTag}
          initialValues={initialValue}
          deleteTag={deleteTag}
          updateTag={updateTag}
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
  updateTag,
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
      updateTag={updateTag}
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
  tags: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  taxonomies: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  addRelation: PropTypes.func.isRequired,
  editTitle: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  setTarget: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  updateTag: PropTypes.func.isRequired,
};
export default withStyles(styles)(LearningUnitsEdit);
