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
import { Add, FormatListBulleted } from '../../../node_modules/@material-ui/icons/index';
import { ListItemIcon } from '../../../node_modules/@material-ui/core/index';

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
          key={`${item.id}${language.id}`}
          component={Link}
          to={`/learning-units/show/${language.id}/${item.id}`}
          dense
          disableGutters
        >
          <ListItemText primary={`${language.LearningUnitLanguage.title} (${language.name})`} />
          <ListItemSecondaryAction>
            {user.user.id === item.User.id && (
              <IconButton
                aria-label="Add knowledge units"
                component={Link}
                to={`knowledge-units/add/${item.id}`}
              >
                <Add />
              </IconButton>
            )}
            {user.user.id === item.User.id && (
              <IconButton
                aria-label="List knowledge units"
                component={Link}
                to={`knowledge-units/list/${item.id}`}
              >
                <FormatListBulleted />
              </IconButton>
            )}
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
        <ListItem key={item.id} dense divider disableGutters>
          <ListItemText className={classes.languageList}>{languages}</ListItemText>
        </ListItem>
      );
    });
  }

  return (
    <div>
      <Typography variant="subtitle1" className={classes.subtitle}>
        Dashboard
      </Typography>
      <Typography variant="h1" className={classes.title}>
        Available Learning Units
      </Typography>

      <List dense>{learningUnitItems}</List>
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
