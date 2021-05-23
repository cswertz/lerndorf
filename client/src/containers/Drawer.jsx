// import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import CloseIcon from '@material-ui/icons/Close';

import MainMenu from '@containers/MainMenu';
import Badge from '@components/UI/Badge';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  drawer: {
    display: 'none',
    width: drawerWidth,
    flexShrink: 0,

    [theme.breakpoints.up('lg')]: {
      display: 'block',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    minHeight: 128,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(8),
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    border: `2px solid ${theme.palette.common.white}`,
    padding: '0 4px',
    right: -13,
    top: 15,
  },
}))(Badge);

const Sidebar = ({ user, fetchRoles }) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      anchor="left"
      variant="permanent"
      // onClose={toggleDrawer()}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.logo} edge="start" variant="h4" component={Link} to="/">
            <img src="/assets/images/logo.png" alt="Lerndorf Logo" />
          </Typography>

          <div className={classes.grow} />

          {/* <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer()}
          >
            <CloseIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>

      <div
        className={classes.drawerContainer}
        // onClick={toggleDrawer()}
        // onKeyDown={toggleDrawer()}
        role="menu"
        tabIndex={0}
      >
        <List>
          <ListItem button divider component={Link} to="/learning-units">
            <ListItemText primary="Meine Kurse" />
          </ListItem>
          <ListItem button divider component={Link} to="/learning-units" disabled>
            <ListItemText primary="Meine Aufgaben" />
          </ListItem>
          <ListItem button divider component={Link} to="/learning-units" disabled>
            <StyledBadge color="secondary" badgeContent={4}>
              <ListItemText primary="Meine Nachrichten" />
            </StyledBadge>
          </ListItem>
          <ListItem button divider component={Link} to="/learning-units" disabled>
            <ListItemText primary="Meine Inhalte" />
          </ListItem>
        </List>

        <MainMenu fetchRoles={fetchRoles} user={user} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Sidebar;
