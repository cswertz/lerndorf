import PropTypes from 'prop-types';
import React from 'react';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

import { term } from '@utils/taxonomy';
import RelationForm from './RelationForm';
import TagEditForm from './TagEditForm';
import TagAddForm from './TagAddForm';
import TitleForm from './TitleForm';

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

const DeleteRelationForm = (props) => {
  const { handleDelete, languageId, relations } = props;

  const relationsElements = relations.map((relation) => {
    const taxonomyTerm = term(relation.Taxonomy, languageId);
    let linkText = relation.target.Translations.filter((item) => item.LanguageId === languageId);
    linkText = linkText[0].title;
    console.log(relation);
    return (
      <ListItem key={relation.id}>
        <ListItemText>
          {taxonomyTerm}&nbsp;
          <a href={`/learning-units/show/${languageId}/${relation.targetId}`}>{linkText}</a>
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <DeleteIcon onClick={() => handleDelete(relation.id)} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });

  return <List>{relationsElements}</List>;
};

const LearningUnitsEdit = ({
  fetchSuggestions,
  deleteRelation,
  initialValues,
  addRelation,
  suggestions,
  languageId,
  taxonomies,
  relations,
  editTitle,
  setTarget,
  deleteTag,
  updateTag,
  addTag,
  tags,
}) => (
  <>
    <TitleForm initialValues={initialValues} handleSubmit={editTitle} />
    <EditTagsList tags={tags} deleteTag={deleteTag} updateTag={updateTag} />
    <TagAddForm handleSubmit={addTag} />
    <RelationForm
      fetchSuggestions={fetchSuggestions}
      handleSubmit={addRelation}
      suggestions={suggestions}
      taxonomies={taxonomies}
      setTarget={setTarget}
    />
    <DeleteRelationForm
      handleDelete={deleteRelation}
      languageId={languageId}
      relations={relations}
    />
  </>
);

LearningUnitsEdit.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  relations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  initialValues: PropTypes.shape({}).isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  taxonomies: PropTypes.shape({}).isRequired,
  deleteRelation: PropTypes.func.isRequired,
  languageId: PropTypes.number.isRequired,
  classes: PropTypes.shape({}).isRequired,
  addRelation: PropTypes.func.isRequired,
  errors: PropTypes.shape({}).isRequired,
  editTitle: PropTypes.func.isRequired,
  setTarget: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  updateTag: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
};
export default withStyles(styles)(LearningUnitsEdit);
