import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';

import MainMenu from './MainMenu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appbar: {
    background: '#D6E2F9',
    color: '#000000',
    boxShadow: 'none',
  },
};

class MenuAppBar extends Component {
  constructor(props) {
    super(props);

    this.handleUserLanguages = this.handleUserLanguages.bind(this);
    this.handleUserEdit = this.handleUserEdit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMenu = this.handleMenu.bind(this);

    this.state = {
      anchorEl: null,
    };
  }

  handleMenu(e) {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  handleLogout() {
    const {
      history,
      logout,
    } = this.props;

    this.setState({ anchorEl: null });
    logout(history);
  }

  handleUserEdit() {
    const { history } = this.props;

    this.setState({ anchorEl: null });
    history.push('/users/user/edit');
  }

  handleUserLanguages() {
    const { history } = this.props;

    this.setState({ anchorEl: null });
    history.push('/users/user/languages');
  }

  render() {
    const {
      fetchRoles,
      classes,
      title,
      user,
    } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <MainMenu
              fetchRoles={fetchRoles}
              user={user}
            />
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {title}
            </Typography>
            {user.loggedIn && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  onClick={this.handleMenu}
                  aria-haspopup="true"
                  color="inherit"
                >
                  {user.user.picture ? (
                    <Avatar
                      src={`/uploads/${user.user.picture}`}
                      alt={user.username}
                    />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleUserEdit}>Profile</MenuItem>
                  <MenuItem onClick={this.handleUserLanguages}>Languages</MenuItem>
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  fetchRoles: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const MenuAppBarWithRouter = withRouter(MenuAppBar);

export default withStyles(styles)(MenuAppBarWithRouter);
