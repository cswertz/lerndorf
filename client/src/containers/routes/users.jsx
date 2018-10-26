import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Wrapper from '../../components/routes/wrapper';

import UsersEdit from '../users/AdminEdit';
import Register from '../users/Register';
import UserEdit from '../users/Edit';
import Login from '../users/Login';
import Users from '../users/List';

import RolesShow from '../users/roles/Show';
import RolesEdit from '../users/roles/Edit';
import RolesAdd from '../users/roles/Add';
import Roles from '../users/roles/List';

const UsersRouter = ({
  capabilities,
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
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="UsersListWrapper"
          logout={actions.userLogout}
          active="users"
          title="Users"
          user={user}
          element={(
            <Users
              itemFetch={actions.usersItemFetch}
              itemsDelete={actions.usersDelete}
              itemsFetch={actions.usersFetch}
              items={users}
            />
          )}
        />
      )}
    />

    <Route
      exact
      path="/users/register"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="RegisterWrapper"
          logout={actions.userLogout}
          active="register"
          title="Register"
          user={user}
          element={(
            <Register
              handleSubmit={actions.userRegister}
              errors={user.errors}
            />
          )}
        />
      )}
    />

    <Route
      exact
      path="/users/login"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="LoginWrapper"
          logout={actions.userLogout}
          active="login"
          title="Login"
          user={user}
          element={(
            <Login
              errors={user.errors}
              handleSubmit={actions.userLogin}
            />
          )}
        />
      )}
    />

    <Route
      exact
      path="/users/user/edit"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="UserEditWrapper"
          logout={actions.userLogout}
          title="Edit your data"
          active="user"
          user={user}
          element={(
            <UserEdit
              errors={user.errors}
              handleSubmit={actions.userEdit}
              user={user.user}
            />
          )}
        />
      )}
    />

    <Route
      exact
      path="/users/edit/:id"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="UserEditWrapper"
          logout={actions.userLogout}
          title="Edit User"
          active="user"
          user={user}
          element={(
            <UsersEdit
              itemFetch={actions.usersItemFetch}
              handleSubmit={actions.usersEdit}
              rolesFetch={actions.rolesFetch}
              remove={actions.removeRole}
              add={actions.addRole}
              errors={user.errors}
              items={users}
              roles={roles}
            />
          )}
        />
      )}
    />

    <Route
      exact
      path="/users/roles"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="UserRoleWrapper"
          logout={actions.userLogout}
          title="User Roles"
          active="user"
          user={user}
          element={(
            <Roles
              itemsDelete={actions.rolesDelete}
              itemsFetch={actions.rolesFetch}
              items={roles}
            />
          )}
        />
      )}
    />

    <Route
      exact
      path="/users/roles/add"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="RolesWrapper"
          logout={actions.userLogout}
          title="Add Role"
          active="user"
          user={user}
          element={(
            <RolesAdd
              handleSubmit={actions.rolesAdd}
              errors={roles.errors}
            />
          )}
        />
      )}
    />

    <Route
      exact
      path="/users/roles/edit/:id"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="RolesWrapper"
          logout={actions.userLogout}
          title="Edit Role"
          active="user"
          user={user}
          element={(
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
          )}
        />
      )}
    />

    <Route
      exact
      path="/users/roles/show/:id"
      render={() => (
        <Wrapper
          fetchRoles={actions.userFetchRoles}
          className="RolesWrapper"
          logout={actions.userLogout}
          title="Roles"
          active="user"
          user={user}
          element={(
            <RolesShow
              itemFetch={actions.rolesItemFetch}
              items={roles}
            />
          )}
        />
      )}
    />
  </React.Fragment>
);

UsersRouter.propTypes = {
  capabilities: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    userFetchRoles: PropTypes.func.isRequired,
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

export default UsersRouter;
