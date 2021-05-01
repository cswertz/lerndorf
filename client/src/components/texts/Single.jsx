import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
    textAlign: 'left',
  },
  button: {
    marginTop: theme.spacing(),
  },
  content: {
    '& figure': {
      margin: 0,
      '& img': {
        'max-width': '100%',
      },
    },
    '& figure.image-style-side': {
      float: 'right',
      'max-width': '50%',
    },
    '& figcaption': {
      'text-align': 'center',
      'padding-top': 5,
      'padding-bottom': 5,
    },
  },
  clearfix: {
    clear: 'both',
  },
});

const TextsShowPaper = ({ classes, link, text }) => (
  <Paper className={classes.paper}>
    <Typography variant="headline">
      {link && (
        <Link to={`/texts/show/${text.id}`}>
          #{text.id} {text.Language.name}
        </Link>
      )}
      {!link && (
        <span>
          #{text.id} {text.Language.name}
        </span>
      )}
    </Typography>
    <div
      className={`${classes.content} ck-content`}
      dangerouslySetInnerHTML={{
        __html: text.content,
      }}
    />
    <div className={classes.clearfix} />
    {text.prevId && (
      <Button variant="contained" component={Link} to={`/texts/show/${text.prevId}`}>
        show previous Version
      </Button>
    )}
    &nbsp;
    {text.nextId && (
      <Button variant="contained" component={Link} to={`/texts/show/${text.nextId}`}>
        show next Version
      </Button>
    )}
    &nbsp;
    {text.rootId && (
      <Button variant="contained" component={Link} to={`/texts/show/${text.rootId}`}>
        show root
      </Button>
    )}
    &nbsp;
    {text.currentId && text.currentId !== text.id && (
      <Button variant="contained" component={Link} to={`/texts/show/${text.currentId}`}>
        show current version
      </Button>
    )}
  </Paper>
);

TextsShowPaper.defaultProps = {
  link: false,
};

TextsShowPaper.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  text: PropTypes.shape({
    rootId: PropTypes.number,
    nextId: PropTypes.number,
    prevId: PropTypes.number,
    currentId: PropTypes.number,
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    Language: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  link: PropTypes.bool,
};

export default withStyles(styles)(TextsShowPaper);
