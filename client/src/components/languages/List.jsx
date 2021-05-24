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

const styles = () => ({});

const LanguageList = ({ languagesDelete, languages, classes, history }) => {
  let languageItems = null;
  if (languages.length > 0) {
    languageItems = languages.map((item) => (
      <ListItem key={item.id}>
        <ListItemText primary={`${item.name} (${item.code})`} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Edit">
            <EditIcon onClick={() => history.push(`/languages/edit/${item.id}`)} />
          </IconButton>
          <IconButton aria-label="Delete">
            <DeleteIcon onClick={() => languagesDelete(item.id)} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  }

  return (
    <div>
      <Typography variant="h1" className={classes.title}>
        Available languages
      </Typography>
      <List dense={false}>{languageItems}</List>
    </div>
  );
};

LanguageList.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  languagesDelete: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(LanguageList);
