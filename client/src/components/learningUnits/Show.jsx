import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Single from '../knowledgeUnits/Single';

const styles = () => ({});

const LearningUnitsShow = ({
  item,
}) => {
  const knowledgeUnits = item.item.LearningUnit.KnowledgeUnits;
  const renderedKnowledgeUnits = knowledgeUnits.map(unit => (
    <Single
      unit={unit}
      link
    />
  ));

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
