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

const Capabilities = ({ available, classes, remove, owned, add }) => {
  const ownedItems = owned.map((capability) => (
    <ListItem key={capability.id}>
      <ListItemText primary={`${capability.name}`} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Show">
          <ClearIcon onClick={(e) => remove(e, capability.id)} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  const availableItems = available.map((capability) => (
    <ListItem key={capability.id}>
      <ListItemText primary={`${capability.name}`} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Show">
          <AddIcon onClick={(e) => add(e, capability.id)} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <Grid container spacing={16} className={classes.listing}>
      <Grid item xs={6}>
        <Typography variant="h2" gutterBottom>
          Assigned Capabilities
        </Typography>
        <List dense>{ownedItems}</List>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h2" gutterBottom>
          Available Capabilities
        </Typography>
        <List dense>{availableItems}</List>
      </Grid>
    </Grid>
  );
};

Capabilities.propTypes = {
  available: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  owned: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  classes: PropTypes.shape({}).isRequired,
  remove: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
};

export default withStyles(styles)(Capabilities);
