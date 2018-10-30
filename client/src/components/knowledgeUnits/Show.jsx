import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = {};

const KnowledgeUnitsShow = ({
  item,
}) => {
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
          to={`/knowledge-units/${item.id}/add/text`}
          variant="contained"
        >
          Add Text
        </Button>
      </Grid>
    </div>
  );
};

KnowledgeUnitsShow.propTypes = {
  item: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(KnowledgeUnitsShow);
