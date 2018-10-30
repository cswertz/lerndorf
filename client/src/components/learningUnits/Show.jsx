import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    textAlign: 'left',
    marginTop: 10,
  },
};

const LearningUnitsShow = ({
  classes,
  item,
}) => {
  const knowledgeUnits = item.item.LearningUnit.KnowledgeUnits;
  console.log(knowledgeUnits);
  const renderedKnowledgeUnits = knowledgeUnits.map((unit) => {
    return (
      <div key={unit.id}>
        <div className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="headline">
              #{unit.id}
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
              Media Type: {unit.mt ? unit.mt.type : '---'}
            </Grid>
            <Grid item xs={4}>
              Knowledge Type: {unit.kt ? unit.kt.type : '---'}
            </Grid>
            <Grid item xs={4}>
              Object Type: {unit.ot ? unit.ot.type : '---'}
            </Grid>
          </Grid>
        </div>
        <div className={classes.root}>
          <Grid container direction="row">
            <Grid item xs={6}>
              EQF Level: {unit.el ? unit.el.type : '---'}
            </Grid>
            <Grid item xs={6}>
              Course Level: {unit.cl ? unit.cl.type : '---'}
            </Grid>
          </Grid>
        </div>
        <div className={classes.root}>
          <Grid container direction="row">
            <Grid item xs={6}>
              License: {unit.l ? unit.l.type : '---'}
            </Grid>
            <Grid item xs={6}>
              Minimum Screen Resolution: {unit.msr ? unit.msr.type : '---'}
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
      </div>
    );
  });

  return (
    <div>
      <Typography variant="headline">
        {'"'}{item.title}{'"'}
      </Typography>
      <Typography variant="caption">
        created by {item.username}
      </Typography>
      <Grid>
        <Button
          component={Link}
          to={`/knowledge-units/add/${item.item.LearningUnit.id}`}
          variant="contained"
        >
          Add new Knowledge Unit
        </Button>
      </Grid>
      {renderedKnowledgeUnits}
    </div>
  );
};

LearningUnitsShow.propTypes = {
  item: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(LearningUnitsShow);
