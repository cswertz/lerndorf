import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import PropTypes from 'prop-types';

const styles = () => ({
  listing: {
    marginTop: '20px',
  },
});

const Roles = ({ available, classes, remove, owned, add }) => {
  const ownedItems = owned.map((role) => (
    <ListItem key={role.id}>
      <ListItemText primary={`${role.name}`} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Show">
          <ClearIcon onClick={(e) => remove(e, role.id)} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  const availableItems = available.map((role) => (
    <ListItem key={role.id}>
      <ListItemText primary={`${role.name}`} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Show">
          <AddIcon onClick={(e) => add(e, role.id)} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <Grid container spacing={16} className={classes.listing}>
      <Grid item xs={6}>
        <Typography variant="headline" gutterBottom>
          Assigned Roles
        </Typography>
        <List dense>{ownedItems}</List>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="headline" gutterBottom>
          Available Roles
        </Typography>
        <List dense>{availableItems}</List>
      </Grid>
    </Grid>
  );
};

Roles.propTypes = {
  available: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  owned: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classes: PropTypes.shape({}).isRequired,
  remove: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
};

export default withStyles(styles)(Roles);
