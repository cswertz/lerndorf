import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Register from '../users/Register';
import UserEdit from '../users/Edit';
import Login from '../users/Login';

import Appbar from '../Appbar';

const Router = ({
  actions,
  user,
}) => (
  <div>
    <Route
      exact
      path="/register"
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
      path="/login"
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
      path="/user/edit"
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
  </div>
);

Router.propTypes = {
  actions: PropTypes.shape({
    languagesFetch: PropTypes.func.isRequired,
    languagesAdd: PropTypes.func.isRequired,
    userRegister: PropTypes.func.isRequired,
    userLogout: PropTypes.func.isRequired,
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
