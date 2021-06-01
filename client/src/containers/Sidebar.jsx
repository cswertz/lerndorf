import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import MainMenu from '@containers/MainMenu';
import TopicsMenu from '@components/UI/TopicsMenu';
import Filter from '@components/UI/Filter';
import SettingsMenu from '@components/UI/SettingsMenu';

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
  bottom: {
    marginTop: theme.spacing(16),
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const paths = ['dashboard', 'tasks', 'messages', 'languages', 'taxonomies', 'users', 'logs'];
  const isDasboardPage = paths.some((pathName) => location.pathname.includes(pathName));

  return (
    <Drawer
      className={classes.drawer}
      anchor="left"
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
    >
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar} component={Link} to="/">
          <Typography className={classes.logo} edge="start" variant="h4">
            <img src="/assets/images/logo.png" alt="Lerndorf Logo" />
          </Typography>
        </Toolbar>
      </AppBar>

      {!isDasboardPage && <TopicsMenu />}
      {isDasboardPage && <MainMenu />}

      <div className={classes.bottom}>
        {!isDasboardPage && user.loggedIn && <Filter className={classes.filter} />}
        <SettingsMenu />
      </div>
    </Drawer>
  );
};

export default Sidebar;
