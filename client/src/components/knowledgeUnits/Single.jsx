import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { hasCapability } from '@utils/user';
import { term } from '@utils/taxonomy';
import Single from '../texts/Single';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    textAlign: 'left',
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing() * 2,
    paddingBottom: theme.spacing() * 2,
    marginTop: theme.spacing(),
  },
  button: {
    marginTop: theme.spacing(),
  },
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
});

const KnowledgeUnitsShowPaper = ({
  handleDelete,
  markLectored,
  markReviewed,
  classes,
  link,
  user,
  unit,
}) => {
  let texts = '';
  if (unit.Texts) {
    texts = unit.Texts.map((text) => <Single key={text.id} text={text} link />);
  }
  const languageId = user.user.preferredLanguage || 1;

  return (
    <Paper key={unit.id} className={classes.paper}>
      <div className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h1">
            {link && <Link to={`/knowledge-units/show/${unit.id}`}>Knowledge Unit #{unit.id}</Link>}
            {!link && <span>Knowledge Unit #{unit.id}</span>}
          </Typography>
        </Grid>
      </div>
      <div className={classes.root}>
        <Grid container direction="row">
          <Grid item xs={6}>
            recommended Age: {unit.recommendedAge || '---'}
          </Grid>
          <Grid item xs={6}>
            Time:{unit.time || '---'}
          </Grid>
        </Grid>
      </div>
      <div className={classes.root}>
        <Grid container direction="row">
          <Grid item xs={6}>
            Objective: {unit.objective || '---'}
          </Grid>
          <Grid item xs={6}>
            Comment: {unit.comment || '---'}
          </Grid>
        </Grid>
      </div>
      <div className={classes.root}>
        <Grid container direction="row">
          <Grid item xs={4}>
            Media Type: {unit.mt ? term(unit.mt, languageId) : '---'}
          </Grid>
          <Grid item xs={4}>
            Knowledge Type: {unit.kt ? term(unit.kt, languageId) : '---'}
          </Grid>
          <Grid item xs={4}>
            Object Type: {unit.ot ? term(unit.ot, languageId) : '---'}
          </Grid>
        </Grid>
      </div>
      <div className={classes.root}>
        <Grid container direction="row">
          <Grid item xs={6}>
            EQF Level: {unit.el ? term(unit.el, languageId) : '---'}
          </Grid>
          <Grid item xs={6}>
            Course Level: {unit.cl ? term(unit.cl, languageId) : '---'}
          </Grid>
        </Grid>
      </div>
      <div className={classes.root}>
        <Grid container direction="row">
          <Grid item xs={6}>
            License: {unit.l ? term(unit.l, languageId) : '---'}
          </Grid>
          <Grid item xs={6}>
            Minimum Screen Resolution: {unit.msr ? term(unit.msr, languageId) : '---'}
          </Grid>
        </Grid>
      </div>
      <div className={classes.root}>
        <Grid container direction="row">
          <Grid item xs={4}>
            Suitable blind: {unit.suitableBlind ? 'yes' : 'no'}
          </Grid>
          <Grid item xs={4}>
            Suitable deaf: {unit.suitableDeaf ? 'yes' : 'no'}
          </Grid>
          <Grid item xs={4}>
            Suitable dumb: {unit.suitableDumb ? 'yes' : 'no'}
          </Grid>
        </Grid>
      </div>
      <div className={classes.root}>
        <Grid container direction="row">
          <Grid item xs={4}>
            Publish: {unit.publish ? 'yes' : 'no'}
          </Grid>
          <Grid item xs={4}>
            Review: {unit.review ? 'yes' : 'no'}
          </Grid>
          <Grid item xs={4}>
            Lectorate: {unit.lectorate ? 'yes' : 'no'}
          </Grid>
        </Grid>
      </div>
      <div className={classes.root}>
        <Grid container direction="row">
          <Grid item xs={4}>
            Visible Public: {unit.visiblePublic ? 'yes' : 'no'}
          </Grid>
          <Grid item xs={4}>
            Visible Lexicon: {unit.visibleLexicon ? 'yes' : 'no'}
          </Grid>
          <Grid item xs={4}>
            Visible Courses: {unit.visibleCourses ? 'yes' : 'no'}
          </Grid>
        </Grid>
      </div>
      <Grid container direction="row">
        <Grid item xs={6} className={classes.left}>
          {user.user.id === unit.author.id && (
            <>
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                component={Link}
                to={`/texts/add/knowledge-units/${unit.id}`}
              >
                Add Text
              </Button>
              &nbsp;
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
                component={Link}
                to={`/knowledge-units/edit/${unit.id}`}
              >
                Edit
              </Button>
            </>
          )}
          &nbsp;
          {hasCapability(user.capabilities, ['edit_any_knowledge_unit']) && (
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              disabled={unit.lectorate}
              onClick={() => handleDelete(unit.id)}
            >
              Delete Knowledge Unit
            </Button>
          )}
        </Grid>
        <Grid item xs={6} className={classes.right}>
          {hasCapability(user.capabilities, ['set_knowledge_unit_reviewed']) && (
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              disabled={unit.review}
              onClick={() => markReviewed(unit.id)}
            >
              Mark reviewed
            </Button>
          )}
          &nbsp;
          {hasCapability(user.capabilities, ['set_knowledge_unit_lectored']) && (
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              disabled={unit.lectorate}
              onClick={() => markLectored(unit.id)}
            >
              Mark lectored
            </Button>
          )}
        </Grid>
      </Grid>
      {texts}
    </Paper>
  );
};

KnowledgeUnitsShowPaper.defaultProps = {
  link: false,
};

KnowledgeUnitsShowPaper.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  markReviewed: PropTypes.func.isRequired,
  markLectored: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  unit: PropTypes.shape({}).isRequired,
  link: PropTypes.bool,
};

export default withStyles(styles)(KnowledgeUnitsShowPaper);
