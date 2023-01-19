import { useState } from 'react';
// import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';

import MainMenu from '@containers/MainMenu';
import TopicsMenu from '@components/UI/TopicsMenu';
import isDashboardNavCheck from '@utils/navigations';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      flexGrow: 1,

      [theme.breakpoints.up('lg')]: {
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

function MenuBar() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  // const user = useSelector((state) => state.user);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isDasboardPage = isDashboardNavCheck(location);

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
                <Typography
                  edge="start"
                  variant="h6"
                  className={classes.logo}
                  onClick={() => {
                    setIsDrawerOpen(false);
                    history.push('/');
                  }}
                >
                  <img src="/assets/images/logo.png" alt="Lerndorf Logo" />
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
              {!isDasboardPage && <TopicsMenu />}
              {isDasboardPage && <MainMenu />}
            </div>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuBar;
