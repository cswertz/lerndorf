import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const styles = () => ({
  languageList: {
    flex: 1,
  },
});

const LearningUnitsList = ({ learningUnitsDelete, learningUnits, classes, user }) => {
  let learningUnitItems = null;
  if (learningUnits.length > 0) {
    learningUnitItems = learningUnits.map((item) => {
      const languages = item.Languages.map((language) => (
        <ListItem
          component={Link}
          key={`${item.id}${language.id}`}
          to={`learning-units/show/${language.id}/${item.id}`}
        >
          <ListItemText primary={`${language.LearningUnitLanguage.title} (${language.name})`} />
          <ListItemSecondaryAction>
            {user.user.id === item.User.id && (
              <IconButton
                aria-label="Edit"
                component={Link}
                to={`/learning-units/edit/${language.id}/${item.id}`}
              >
                <EditIcon />
              </IconButton>
            )}
            {user.user.id === item.User.id && (
              <IconButton aria-label="Delete">
                <DeleteIcon onClick={() => learningUnitsDelete(item.id)} />
              </IconButton>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      ));
      return (
        <ListItem key={item.id}>
          <ListItemText primary={`#${item.id}`} />
          <List className={classes.languageList}>{languages}</List>
        </ListItem>
      );
    });
  }

  return (
    <div>
      <Typography variant="title" className={classes.title}>
        Available Learning Units
      </Typography>
      <List dense={false}>{learningUnitItems}</List>
    </div>
  );
};

LearningUnitsList.propTypes = {
  user: PropTypes.shape({}).isRequired,
  learningUnits: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  learningUnitsDelete: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(LearningUnitsList);
