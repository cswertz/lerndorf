import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';

import PropTypes from 'prop-types';
import React from 'react';

const styles = () => ({});

const LanguageList = ({
  languages,
  classes,
}) => {
  let languageItems = null;
  if (languages.length > 0) {
    languageItems = languages.map(item => (
      <ListItem key={item.id}>
        <ListItemText
          primary={item.name}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  }

  return (
    <div>
      <Typography variant="title" className={classes.title}>
        Available languages
      </Typography>
      <List dense={false}>
        {languageItems}
      </List>
      <Link to="/languages/add">Add new Language</Link>
    </div>
  );
};

LanguageList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withStyles(styles)(LanguageList);
