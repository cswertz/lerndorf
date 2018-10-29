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

const styles = () => ({
  languageList: {
    flex: 1,
  },
});

const LearningUnitsList = ({
  learningUnitsDelete,
  learningUnits,
  classes,
  history,
}) => {
  let learningUnitItems = null;
  if (learningUnits.length > 0) {
    learningUnitItems = learningUnits.map((item) => {
      const languages = item.Languages.map(language => (
        <ListItem
          key={`${item.id}${language.id}`}
        >
          <ListItemText
            primary={`${language.LearningUnitLanguage.title} (${language.name})`}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Edit">
              <EditIcon
                onClick={() => history.push(`/learningUnits/edit/${item.id}`)}
              />
            </IconButton>
            <IconButton aria-label="Delete">
              <DeleteIcon
                onClick={() => learningUnitsDelete(item.id)}
              />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ));
      return (
        <ListItem key={item.id}>
          <ListItemText
            primary={`#${item.id}`}
          />
          <List
            className={classes.languageList}
          >
            {languages}
          </List>
        </ListItem>
      );
    });
  }

  return (
    <div>
      <Typography variant="title" className={classes.title}>
        Available Learning Units
      </Typography>
      <List dense={false}>
        {learningUnitItems}
      </List>
    </div>
  );
};

LearningUnitsList.propTypes = {
  learningUnits: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  learningUnitsDelete: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(LearningUnitsList);
