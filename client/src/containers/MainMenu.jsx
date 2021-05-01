import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { withRouter, Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Menu from '@material-ui/core/Menu';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { hasCapability } from '../utils/user';

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
  menuPaper: {
    boxShadow: 'none',
    background: '#AAB4C5',
  },
};

class MainMenu extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMenu = this.handleMenu.bind(this);

    this.state = {
      anchorEl: null,
      open: {
        administration: false,
      },
    };
  }

  componentDidMount() {
    const { fetchRoles, user } = this.props;

    if (!user.fetchingRoles && !user.fetchedRoles && user.user.username !== 'Guest') {
      fetchRoles(user.user.id);
    }
  }

  handleMenu(e) {
    this.setState({ anchorEl: e.currentTarget });
  }

  handleClose() {
    this.setState({
      anchorEl: null,
      open: {
        administration: false,
        authoring: false,
      },
    });
  }

  handleClick(item) {
    const { open } = this.state;
    open[item] = !open[item];

    this.setState({
      open,
    });
  }

  render() {
    const { classes, user } = this.props;
    const { anchorEl, open } = this.state;
    const opened = Boolean(anchorEl);

    return (
      <>
        <IconButton
          aria-owns={opened ? 'main-menu' : null}
          onClick={this.handleMenu}
          aria-haspopup="true"
          aria-label="Menu"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="main-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={opened}
          onClose={this.handleClose}
          classes={{ paper: classes.menuPaper }}
        >
          <ListItem button component={Link} to="/">
            Home
          </ListItem>
          <ListItem button component={Link} to="/learning-units">
            Learning Units
          </ListItem>
          {hasCapability(user.capabilities, [
            'edit_user',
            'edit_language',
            'edit_taxonomy',
            'edit_user',
          ]) && (
            <div>
              <ListItem onClick={() => this.handleClick('administration')} button>
                <ListItemText primary="Administration" />
                {open.administration ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open.administration}>
                <List component="div" disablePadding>
                  {hasCapability(user.capabilities, ['edit_language']) && (
                    <ListItem button className={classes.nested} component={Link} to="/languages">
                      <ListItemText inset primary="Manage Languages" />
                    </ListItem>
                  )}
                  {hasCapability(user.capabilities, ['edit_taxonomy']) && (
                    <ListItem button className={classes.nested} component={Link} to="/taxonomies">
                      <ListItemText inset primary="Manage Taxonomies" />
                    </ListItem>
                  )}
                  {hasCapability(user.capabilities, ['edit_role']) && (
                    <ListItem button className={classes.nested} component={Link} to="/users/roles">
                      <ListItemText inset primary="Manage Roles" />
                    </ListItem>
                  )}
                  {hasCapability(user.capabilities, ['edit_user']) && (
                    <ListItem button className={classes.nested} component={Link} to="/users">
                      <ListItemText inset primary="Manage Users" />
                    </ListItem>
                  )}
                  {hasCapability(user.capabilities, ['view_user_logs']) && (
                    <ListItem button className={classes.nested} component={Link} to="/logs">
                      <ListItemText inset primary="Logs" />
                    </ListItem>
                  )}
                </List>
              </Collapse>
            </div>
          )}
          {hasCapability(user.capabilities, ['add_learning_unit']) && (
            <div>
              <ListItem onClick={() => this.handleClick('authoring')} button>
                <ListItemText primary="Authoring" />
                {open.authoring ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open.authoring}>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    className={classes.nested}
                    component={Link}
                    to="/learning-units/add"
                  >
                    <ListItemText inset primary="Add Learning Unit" />
                  </ListItem>
                </List>
              </Collapse>
            </div>
          )}
        </Menu>
      </>
    );
  }
}

MainMenu.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  fetchRoles: PropTypes.func.isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const MainMenuWithRouter = withRouter(MainMenu);

export default withStyles(styles)(MainMenuWithRouter);
