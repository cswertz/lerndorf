import { withStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import UsersEdit from '../users/AdminEdit';
import Register from '../users/Register';
import UserEdit from '../users/Edit';
import Login from '../users/Login';
import Users from '../users/List';

import RolesShow from '../users/roles/Show';
import RolesEdit from '../users/roles/Edit';
import RolesAdd from '../users/roles/Add';
import Roles from '../users/roles/List';

import Appbar from '../Appbar';

const styles = () => ({
  container: {
    maxWidth: 960,
    margin: 'auto',
    marginTop: '10px',
  },
});

const Router = ({
  capabilities,
  classes,
  actions,
  roles,
  users,
  user,
}) => (
  <React.Fragment>
    <Route
      exact
      path="/users"
      render={() => (
        <div className="UsersListWrapper">
          <Appbar
            logout={actions.userLogout}
            active="users"
            title="Users"
            user={user}
          />
          <div className={classes.container}>
            <Users
              itemFetch={actions.usersItemFetch}
              itemsDelete={actions.usersDelete}
              itemsFetch={actions.usersFetch}
              items={users}
            />
          </div>
        </div>
      )}
    />

    <Route
      exact
      path="/users/register"
      render={() => (
        <div className="RegisterWrapper">
          <Appbar
            logout={actions.userLogout}
            active="register"
            title="Register"
            user={user}
          />
          <div className={classes.container}>
            <Register
              handleSubmit={actions.userRegister}

              errors={user.errors}
            />
          </div>
        </div>
      )}
    />

    <Route
      exact
      path="/users/login"
      render={() => (
        <div className="LoginWrapper">
          <Appbar
            title="Login"
            active="login"
            user={user}
            logout={actions.userLogout}
          />
          <div className={classes.container}>
            <Login
              errors={user.errors}
              handleSubmit={actions.userLogin}
            />
          </div>
        </div>
      )}
    />

    <Route
      exact
      path="/users/user/edit"
      render={() => (
        <div className="UserEditWrapper">
          <Appbar
            title="Edit your data"
            active="user"
            user={user}
            logout={actions.userLogout}
          />
          <div className={classes.container}>
            <UserEdit
              errors={user.errors}
              handleSubmit={actions.userEdit}
              user={user.user}
            />
          </div>
        </div>
      )}
    />

    <Route
      exact
      path="/users/edit/:id"
      render={() => (
        <div className="UserEditWrapper">
          <Appbar
            title="Edit User"
            active="user"
            user={user}
            logout={actions.userLogout}
          />
          <div className={classes.container}>
            <UsersEdit
              itemFetch={actions.usersItemFetch}
              handleSubmit={actions.usersEdit}
              errors={user.errors}
              items={users}
            />
          </div>
        </div>
      )}
    />

    <Route
      exact
      path="/users/roles"
      render={() => (
        <div className="UserRoleWrapper">
          <Appbar
            title="User Roles"
            active="user"
            user={user}
            logout={actions.userLogout}
          />
          <div className={classes.container}>
            <Roles
              itemsDelete={actions.rolesDelete}
              itemsFetch={actions.rolesFetch}
              items={roles}
            />
          </div>
        </div>
      )}
    />

    <Route
      exact
      path="/users/roles/add"
      render={() => (
        <div className="RolesWrapper">
          <Appbar
            title="Add Role"
            active="user"
            user={user}
            logout={actions.userLogout}
          />
          <div className={classes.container}>
            <RolesAdd
              handleSubmit={actions.rolesAdd}
              errors={roles.errors}
            />
          </div>
        </div>
      )}
    />

    <Route
      exact
      path="/users/roles/edit/:id"
      render={() => (
        <div className="RolesWrapper">
          <Appbar
            title="Edit Role"
            active="user"
            user={user}
            logout={actions.userLogout}
          />
          <div className={classes.container}>
            <RolesEdit
              removeCapability={actions.removeCapability}
              addCapability={actions.addCapability}
              capabilitiesFetch={actions.capabilitiesFetch}
              itemFetch={actions.rolesItemFetch}
              handleSubmit={actions.rolesEdit}
              capabilities={capabilities}
              errors={roles.errors}
              items={roles}
            />
          </div>
        </div>
      )}
    />

    <Route
      exact
      path="/users/roles/show/:id"
      render={() => (
        <div className="RolesWrapper">
          <Appbar
            title="Roles"
            active="user"
            user={user}
            logout={actions.userLogout}
          />
          <div className={classes.container}>
            <RolesShow
              itemFetch={actions.rolesItemFetch}
              items={roles}
            />
          </div>
        </div>
      )}
    />
  </React.Fragment>
);

Router.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  capabilities: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    usersItemFetch: PropTypes.func.isRequired,
    usersFetch: PropTypes.func.isRequired,
    removeCapability: PropTypes.func.isRequired,
    addCapability: PropTypes.func.isRequired,
    capabilitiesFetch: PropTypes.func.isRequired,
    rolesItemFetch: PropTypes.func.isRequired,
    rolesDelete: PropTypes.func.isRequired,
    rolesFetch: PropTypes.func.isRequired,
    rolesEdit: PropTypes.func.isRequired,
    rolesAdd: PropTypes.func.isRequired,
    userRegister: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
    userLogin: PropTypes.func.isRequired,
    userEdit: PropTypes.func.isRequired,
  }).isRequired,
  roles: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    errors: PropTypes.shape().isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  users: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    errors: PropTypes.shape().isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      registration: PropTypes.shape({}).isRequired,
      login: PropTypes.shape({}).isRequired,
      edit: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
};

export default withStyles(styles)(Router);
