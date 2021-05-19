import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';

import MainMenu from './MainMenu';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      flexGrow: 1,

      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    grow: {
      flexGrow: 1,
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      // flexGrow: 1,
    },
    drawer: {
      width: '100%',
      flexShrink: 0,
    },
    drawerPaper: {
      width: '100%',
    },
    // backdrop: {
    //   zIndex: theme.zIndex.drawer + 1,
    //   color: '#fff',
    // },
  }),
  // { name: 'HookGlobalStyles', index: 2 },
);

function MenuBar({ user, fetchRoles }) {
  const classes = useStyles();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setIsDrawerOpen((prevState) => !prevState);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.logo} edge="start" variant="h6" component={Link} to="/">
            <img src="/assets/images/logo.png" alt="Lerndorf Logo" />
          </Typography>

          <div className={classes.grow} />

          <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer()}>
            <MenuIcon />
          </IconButton>

          <Drawer
            className={classes.drawer}
            anchor="right"
            open={isDrawerOpen}
            onClose={toggleDrawer()}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <AppBar position="static" className={classes.appBar}>
              <Toolbar>
                <Typography edge="start" variant="h6" className={classes.logo}>
                  Lerndorf
                </Typography>

                <div className={classes.grow} />

                <IconButton
                  edge="end"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer()}
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <div
              className={classes.drawerContainer}
              onClick={toggleDrawer()}
              onKeyDown={toggleDrawer()}
              role="menu"
              tabIndex={0}
            >
              <Toolbar />
              <MainMenu fetchRoles={fetchRoles} user={user} />
            </div>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
}

MenuBar.propTypes = {
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MenuBar;
