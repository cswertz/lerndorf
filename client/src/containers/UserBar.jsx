import { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/MailOutline';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appbar: {
    boxShadow: 'none',
  },
  toolbar: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      minHeight: 128,
      alignItems: 'center',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(8),
    },
  },
  search: {
    position: 'relative',
    // borderRadius: 2,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.04),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.07),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    transition: 'background .2s ease',

    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    color: fade(theme.palette.common.black, 0.5),
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',

    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  section: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    border: `2px solid ${theme.palette.common.white}`,
    padding: '0 4px',
    right: 2,
    top: 3,
  },
}))(Badge);

function UserBar({ user, logout }) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleLogout = () => {
    logout(history);
    history.push('/');
  };

  const menuId = 'primary-search-account-menu';

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appbar} position="static" color="transparent">
        <Toolbar className={classes.toolbar}>
          <div className={classes.grow} />

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Suchen"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <div className={classes.section}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <StyledBadge badgeContent={4} color="secondary">
                <MailIcon />
              </StyledBadge>
            </IconButton>

            {/* <span className={classes.title}>Dashboard</span> */}

            {!user.loggedIn && (
              <IconButton
                edge="end"
                aria-label="login"
                onClick={() => history.push('/login')}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}

            {user.loggedIn && (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
                color="inherit"
              >
                {user.user.picture ? (
                  <Avatar src={`/uploads/${user.user.picture}`} alt={user.username} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => history.push('/users/user/edit')}>Profile</MenuItem>
        <MenuItem onClick={() => history.push('/users/user/languages')}>Languages</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

UserBar.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

export default UserBar;
