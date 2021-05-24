import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/MailOutline';

import { userLogout } from '@actions';
import Badge from '@components/UI/Badge';

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
  login: {
    color: theme.palette.grey[800],
    display: 'flex',
    verticalAlign: 'text-bottom',
    textAlign: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing(4),

    '& svg': {
      marginLeft: '0.2rem',
    },
  },
}));

function UserBar() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleLogout = () => {
    dispatch(userLogout(history));
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
            {!user.loggedIn && (
              <Link className={classes.login} to="/login">
                Login
                <PersonIcon />
              </Link>
            )}

            {user.loggedIn && (
              <>
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/messages"
                  aria-label="show 4 new mails"
                >
                  <Badge badgeContent={4}>
                    <MailIcon />
                  </Badge>
                </IconButton>

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
                  <MenuItem onClick={() => history.push('/users/user/languages')}>
                    Languages
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default UserBar;
