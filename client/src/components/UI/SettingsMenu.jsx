// not used at the moment

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  settings: {
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
  },
  settingsHeader: {
    color: theme.palette.grey[500],
    fontSize: '1.2rem',
  },
}));

const SettingsMenu = () => {
  const classes = useStyles();

  return (
    <List
      className={classes.settings}
      subheader={
        <ListSubheader className={classes.settingsHeader} color="primary">
          Settings
        </ListSubheader>
      }
      dense
    >
      <ListItem component={Link} to="/settings">
        <ListItemText primary="Settings" />
      </ListItem>
      <ListItem component={Link} to="/settings">
        <ListItemText primary="Other Settings" />
      </ListItem>
      <ListItem component={Link} to="/settings">
        <ListItemText primary="More Settings" />
      </ListItem>
    </List>
  );
};

export default SettingsMenu;
