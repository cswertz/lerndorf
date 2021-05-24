import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

import { term } from '@utils/taxonomy';
import Single from '../knowledgeUnits/Single';

const styles = () => ({});

const LearningUnitsShow = ({
  handleKnowledgeUnitDelete,
  markReviewed,
  markLectored,
  item,
  user,
}) => {
  const knowledgeUnits = item.item.LearningUnit.KnowledgeUnits;
  const renderedKnowledgeUnits = knowledgeUnits.map((unit) => (
    <Single
      handleDelete={handleKnowledgeUnitDelete}
      markReviewed={markReviewed}
      markLectored={markLectored}
      key={unit.id}
      unit={unit}
      user={user}
      link
    />
  ));
  const { preferredLanguage } = user.user;
  const possibleLanguages = user.user.Languages.map((language) => language.id);

  const tags = item.item.LearningUnitTags.map((tag) => tag.tag).join(', ');
  const languageId = item.item.Language.id;
  const buildRelations = (relations) => {
    let elements = null;
    if (relations.length > 0) {
      elements = relations.map((relation) => {
        const taxonomyTerm = term(relation.Taxonomy, preferredLanguage);

        let userLanguages = [
          relation.target.Translations.find(
            (translation) => preferredLanguage === translation.LanguageId,
          ),
        ];
        userLanguages = [
          ...userLanguages,
          ...relation.target.Translations.filter((translation) =>
            possibleLanguages.includes(translation.LanguageId),
          ),
        ];

        let linkText = relation.target.Translations.filter(
          (translation) => translation.LanguageId === languageId,
        );

        if (userLanguages.length > 0) {
          linkText = userLanguages[0].title;

          return (
            <li>
              {taxonomyTerm}{' '}
              <a href={`/learning-units/show/${userLanguages[0].LanguageId}/${item.targetId}`}>
                {linkText}
              </a>
            </li>
          );
        }

        return null;
      });
    }

    return elements;
  };
  const relations = buildRelations(item.item.LearningUnit.learningUnitSource);

  return (
    <DocumentTitle title={`Lerndorf | ${item.title}`}>
      <div>
        <Typography variant="h5">
          {'"'}
          {item.title}
          {'"'}
          {user.user.id === item.item.User.id && (
            <IconButton
              aria-label="Edit"
              component={Link}
              to={`/learning-units/edit/${languageId}/${item.item.LearningUnit.id}`}
            >
              <EditIcon />
            </IconButton>
          )}
        </Typography>
        <Typography variant="caption">created by {item.username}</Typography>
        <Typography variant="caption">Tags: {tags}</Typography>
        <Grid>
          <ul>{relations}</ul>
        </Grid>
        <Grid>
          <Button
            color="primary"
            component={Link}
            to={`/knowledge-units/add/${item.item.LearningUnit.id}`}
            variant="contained"
          >
            Add new Knowledge Unit
          </Button>
        </Grid>
        {renderedKnowledgeUnits}
      </div>
    </DocumentTitle>
  );
};

LearningUnitsShow.propTypes = {
  handleKnowledgeUnitDelete: PropTypes.func.isRequired,
  markReviewed: PropTypes.func.isRequired,
  markLectored: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  item: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(LearningUnitsShow);
