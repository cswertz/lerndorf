import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Register from '../users/Register';
import UserEdit from '../users/Edit';
import Login from '../users/Login';

import RolesShow from '../users/roles/Show';
import RolesEdit from '../users/roles/Edit';
import RolesAdd from '../users/roles/Add';
import Roles from '../users/roles/List';

import Appbar from '../Appbar';

const Router = ({
  actions,
  roles,
  user,
}) => (
  <React.Fragment>
    <Route
      exact
      path="/users/register"
      render={() => (
        <div className="RegisterWrapper">
          <Appbar
            title="Register"
            active="register"
            user={user}
            logout={actions.userLogout}
          />
          <Register
            errors={user.errors}
            handleSubmit={actions.userRegister}
          />
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
          <Login
            errors={user.errors}
            handleSubmit={actions.userLogin}
          />
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
          <UserEdit
            errors={user.errors}
            handleSubmit={actions.userEdit}
            user={user.user}
          />
        </div>
      )}
    />

    <Route
      exact
      path="/users/roles"
      render={() => (
        <div className="UserEditWrapper">
          <Appbar
            title="User Roles"
            active="user"
            user={user}
            logout={actions.userLogout}
          />
          <Roles
            itemsDelete={actions.rolesDelete}
            itemsFetch={actions.rolesFetch}
            items={roles}
          />
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
          <RolesAdd
            handleSubmit={actions.rolesAdd}
            errors={roles.errors}
          />
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
          <RolesEdit
            itemFetch={actions.rolesItemFetch}
            handleSubmit={actions.rolesEdit}
            errors={roles.errors}
            items={roles}
          />
        </div>
      )}
    />

    <Route
      exact
      path="/users/roles/show/:id"
      render={() => (
        <div className="RolesWrapper">
          <Appbar
            title="Role"
            active="user"
            user={user}
            logout={actions.userLogout}
          />
          <RolesShow
            itemFetch={actions.rolesItemFetch}
            items={roles}
          />
        </div>
      )}
    />
  </React.Fragment>
);

Router.propTypes = {
  roles: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    errors: PropTypes.shape().isRequired,
    id: PropTypes.shape({}).isRequired,
    fetching: PropTypes.bool.isRequired,
    fetched: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
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
  user: PropTypes.shape({
    loggedIn: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      registration: PropTypes.shape({}).isRequired,
      login: PropTypes.shape({}).isRequired,
      edit: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Router;
